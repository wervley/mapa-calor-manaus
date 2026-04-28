from __future__ import annotations

from pipeline.config import (
    CATEGORY_UTILIZATION,
    SOLAR_RECOMMENDATION_EN,
    SOLAR_RECOMMENDATION_PT,
    settings,
)


def usable_area(category: str, raw_area_m2: float) -> float:
    factor = CATEGORY_UTILIZATION.get(category, 0.0)
    return max(raw_area_m2 * factor, 0.0)


def annual_generation_kwh(irradiance_kwh_m2_day: float, area_m2: float) -> float:
    return (
        irradiance_kwh_m2_day
        * area_m2
        * settings.panel_efficiency
        * settings.performance_ratio
        * settings.days_per_year
    )


def installable_capacity_kwp(area_m2: float) -> float:
    return area_m2 * 0.18


def classify_potential(annual_kwh: float, applicable: bool) -> str:
    if not applicable:
        return "nao_aplicavel"
    if annual_kwh >= 80_000:
        return "alta"
    if annual_kwh >= 15_000:
        return "media"
    if annual_kwh > 0:
        return "baixa"
    return "nao_aplicavel"


def recommendation_text(level: str) -> tuple[str, str]:
    return SOLAR_RECOMMENDATION_PT[level], SOLAR_RECOMMENDATION_EN[level]
