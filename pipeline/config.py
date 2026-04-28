from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    project_root: Path = Path(__file__).resolve().parent.parent
    raw_csv_path: Path = field(default=None)
    output_geojson_path: Path = field(default=None)
    public_geojson_path: Path = field(default=None)
    nasa_power_endpoint: str = "https://power.larc.nasa.gov/api/temporal/climatology/point"
    panel_efficiency: float = 0.18
    performance_ratio: float = 0.78
    days_per_year: int = 365
    request_timeout_seconds: int = 20

    def __post_init__(self):
        object.__setattr__(self, "raw_csv_path", self.project_root / "data" / "pontos_brutos.csv")
        object.__setattr__(self, "output_geojson_path", self.project_root / "data" / "pontos.geojson")
        object.__setattr__(self, "public_geojson_path", self.project_root / "docs" / "data" / "pontos.geojson")


CATEGORY_UTILIZATION: dict[str, float] = {
    "shopping": 0.50,
    "escola": 0.60,
    "creche": 0.60,
    "hospital": 0.45,
    "universidade": 0.55,
    "concessionaria": 0.65,
    "distrito_industrial": 0.70,
    "estabelecimento": 0.60,
    "igreja": 0.55,
    "upa": 0.55,
    "spa": 0.55,
    "ponto_turistico": 0.30,
    "militar_exercito": 0.40,
    "militar_fab": 0.45,
    "militar_marinha": 0.40,
    "militar_pm": 0.50,
    "beco": 0.40,
    "bairro": 0.0,
    "avenida": 0.0,
    "parque": 0.0,
    "praca": 0.0,
    "estrada": 0.0,
    "rio_orla": 0.0,
}


ZONE_IRRADIANCE_FALLBACK_KWH_M2_DAY: dict[str, float] = {
    "Centro-Sul": 4.92,
    "Sul": 4.94,
    "Centro-Oeste": 4.93,
    "Oeste": 4.91,
    "Norte": 4.88,
    "Leste": 4.90,
}


SOLAR_RECOMMENDATION_PT: dict[str, str] = {
    "alta": "Alto potencial fotovoltaico — instalação prioritária recomendada.",
    "media": "Potencial fotovoltaico moderado — viabilidade caso a caso.",
    "baixa": "Potencial fotovoltaico limitado — cobertura insuficiente.",
    "nao_aplicavel": "Indicador térmico apenas (instalação solar não aplicável).",
}


SOLAR_RECOMMENDATION_EN: dict[str, str] = {
    "alta": "High photovoltaic potential — priority installation recommended.",
    "media": "Moderate photovoltaic potential — case-by-case feasibility.",
    "baixa": "Limited photovoltaic potential — insufficient coverage.",
    "nao_aplicavel": "Thermal indicator only (solar installation not applicable).",
}


settings = Settings()
