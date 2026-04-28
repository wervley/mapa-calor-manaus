from __future__ import annotations

import logging
from typing import Iterable

import requests

from pipeline.config import ZONE_IRRADIANCE_FALLBACK_KWH_M2_DAY, settings


logger = logging.getLogger(__name__)


_ZONE_REPRESENTATIVE_COORDINATES: dict[str, tuple[float, float]] = {
    "Centro-Sul": (-3.0980, -60.0140),
    "Sul": (-3.1340, -60.0250),
    "Centro-Oeste": (-3.0820, -60.0410),
    "Oeste": (-3.0950, -60.0850),
    "Norte": (-3.0260, -60.0090),
    "Leste": (-3.0510, -59.9400),
}


def fetch_annual_irradiance(latitude: float, longitude: float) -> float | None:
    params = {
        "parameters": "ALLSKY_SFC_SW_DWN",
        "community": "RE",
        "longitude": f"{longitude:.4f}",
        "latitude": f"{latitude:.4f}",
        "format": "JSON",
    }
    try:
        response = requests.get(
            settings.nasa_power_endpoint,
            params=params,
            timeout=settings.request_timeout_seconds,
        )
        response.raise_for_status()
        payload = response.json()
        monthly = payload["properties"]["parameter"]["ALLSKY_SFC_SW_DWN"]
        annual = monthly.get("ANN")
        if annual is None:
            return None
        return float(annual)
    except (requests.RequestException, KeyError, ValueError) as exc:
        logger.warning("NASA POWER request failed for (%s, %s): %s", latitude, longitude, exc)
        return None


def build_zone_irradiance_map(
    zones: Iterable[str], use_live_api: bool = True
) -> dict[str, float]:
    resolved: dict[str, float] = {}
    for zone in zones:
        if zone not in _ZONE_REPRESENTATIVE_COORDINATES:
            resolved[zone] = ZONE_IRRADIANCE_FALLBACK_KWH_M2_DAY.get(zone, 4.90)
            continue
        if use_live_api:
            lat, lon = _ZONE_REPRESENTATIVE_COORDINATES[zone]
            value = fetch_annual_irradiance(lat, lon)
            if value is not None:
                resolved[zone] = round(value, 3)
                continue
        resolved[zone] = ZONE_IRRADIANCE_FALLBACK_KWH_M2_DAY.get(zone, 4.90)
    return resolved
