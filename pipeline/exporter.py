from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

import pandas as pd

from pipeline.config import settings
from pipeline.potential import (
    annual_generation_kwh,
    classify_potential,
    installable_capacity_kwp,
    recommendation_text,
    usable_area,
)
from pipeline.solar import build_zone_irradiance_map


def load_dataset() -> pd.DataFrame:
    df = pd.read_csv(settings.raw_csv_path, dtype={"id": str})
    df["lat"] = df["lat"].astype(float)
    df["lon"] = df["lon"].astype(float)
    df["anomalia_c"] = df["anomalia_c"].astype(float)
    df["area_m2"] = df["area_m2"].astype(float)
    df["criticidade"] = df["criticidade"].astype(int)
    return df


def enrich_with_solar(df: pd.DataFrame, use_live_api: bool) -> pd.DataFrame:
    irradiance_by_zone = build_zone_irradiance_map(df["zona"].unique(), use_live_api=use_live_api)
    df = df.copy()
    df["irradiancia_kwh_m2_dia"] = df["zona"].map(irradiance_by_zone).round(3)

    usable_areas = [usable_area(cat, area) for cat, area in zip(df["categoria"], df["area_m2"])]
    df["area_util_m2"] = [round(value, 1) for value in usable_areas]

    annual_kwh = [
        round(annual_generation_kwh(irr, area), 0)
        for irr, area in zip(df["irradiancia_kwh_m2_dia"], df["area_util_m2"])
    ]
    df["potencial_kwh_ano"] = annual_kwh

    df["potencial_kwp"] = [round(installable_capacity_kwp(area), 2) for area in df["area_util_m2"]]
    df["solar_aplicavel"] = df["area_util_m2"] > 0

    levels = [
        classify_potential(kwh, applicable)
        for kwh, applicable in zip(df["potencial_kwh_ano"], df["solar_aplicavel"])
    ]
    df["nivel_potencial"] = levels

    pt_texts, en_texts = [], []
    for level in levels:
        pt, en = recommendation_text(level)
        pt_texts.append(pt)
        en_texts.append(en)
    df["recomendacao_pt"] = pt_texts
    df["recomendacao_en"] = en_texts

    return df


def to_geojson(df: pd.DataFrame) -> dict[str, Any]:
    features: list[dict[str, Any]] = []
    for record in df.to_dict(orient="records"):
        properties = {key: value for key, value in record.items() if key not in {"lat", "lon"}}
        for key, value in properties.items():
            if isinstance(value, float) and pd.isna(value):
                properties[key] = None
        properties["solar_aplicavel"] = bool(properties["solar_aplicavel"])
        features.append(
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [record["lon"], record["lat"]]},
                "properties": properties,
            }
        )
    return {
        "type": "FeatureCollection",
        "metadata": {
            "name": "Mapa de Calor Urbano e Potencial Solar de Manaus",
            "version": "1.0.0",
            "total_features": len(features),
            "panel_efficiency": settings.panel_efficiency,
            "performance_ratio": settings.performance_ratio,
        },
        "features": features,
    }


def write_geojson(payload: dict[str, Any], destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def publish_to_docs(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, destination)
