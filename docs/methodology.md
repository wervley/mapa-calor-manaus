# Metodologia / Methodology

## Português

### 1. Coleta de dados térmicos

Os pontos do dataset foram compilados a partir de:

- Estudos da Fiocruz Amazônia (2023) sobre ilhas de calor de superfície na Zona Centro-Oeste
- Pesquisa da UFAM / Grupo Árvores do Asfalto (2023–2024) com medições de campo
- Estudo conjunto INPA / MapBiomas (2025) sobre temperatura de superfície em comparação com a Reserva Adolpho Ducke
- Pesquisa Unicamp (2022, replicada em 2024) sobre vulnerabilidade socioeconômica e calor
- Reportagens da imprensa local (Em Tempo, A Crítica, Portal Amazônia, BNC Amazonas)
- Comentários e relatos públicos de moradores em redes sociais e ouvidorias

A **anomalia térmica** registrada para cada ponto representa a diferença média (em °C) entre a temperatura de superfície local e a Reserva Adolpho Ducke, considerada referência climática para a região.

### 2. Geocodificação

As coordenadas (latitude e longitude) foram curadas manualmente. O Nominatim (OpenStreetMap) foi descartado como solução padrão por ser pouco confiável em becos e travessas de Manaus, onde o nome da via não consta nas bases globais. A curadoria manual garante precisão na ordem de ±50 metros para a maioria dos pontos.

### 3. Irradiância solar

A irradiância média anual de cada zona é obtida via **NASA POWER API** (parâmetro `ALLSKY_SFC_SW_DWN`, comunidade RE — Renewable Energy), no endpoint de climatologia. Como Manaus apresenta variação intra-urbana muito pequena de irradiância (na ordem de ±0,05 kWh/m²/dia), o pipeline coleta um valor representativo por zona administrativa e o aplica aos pontos contidos nela. Valores de fallback calibrados (modo offline) estão registrados em `pipeline/config.py`.

### 4. Potencial fotovoltaico

O potencial é calculado pela equação padrão da indústria solar fotovoltaica:

```
E_kWh_ano = G × A_util × η × PR × 365
```

| Símbolo | Descrição                              | Valor |
|---------|----------------------------------------|-------|
| G       | Irradiância média anual (kWh/m²/dia)   | NASA POWER (~4,9) |
| A_util  | Área útil (m²)                         | A_total × fator de utilização |
| η       | Eficiência do módulo                   | 0,18 (monocristalino) |
| PR      | Performance Ratio                      | 0,78 |

#### Fator de utilização por categoria

Reflete a fração da área total efetivamente disponível para módulos, descontando equipamentos de cobertura, restrições de patrimônio histórico, sombreamento estrutural e outras limitações.

| Categoria                | Fator |
|--------------------------|-------|
| Distrito Industrial      | 0,70  |
| Concessionária           | 0,65  |
| Escola, Creche, Estabelecimento | 0,60 |
| Universidade, Igreja, UPA, SPA | 0,55 |
| Shopping                 | 0,50  |
| Hospital, Beco, FAB, Exército | 0,40–0,45 |
| Ponto turístico (patrimônio) | 0,30 |

#### Capacidade instalável (kWp)

`kWp ≈ A_util × 0,18` (regra prática de ~5,5 m² por kWp de módulo padrão).

### 5. Classificação de potencial

| Classe         | Geração anual (kWh) |
|----------------|---------------------|
| Alta           | ≥ 80.000            |
| Média          | 15.000 – 80.000     |
| Baixa          | > 0 e < 15.000      |
| Não aplicável  | Sem cobertura instalável |

### 6. Limitações e ressalvas

- A anomalia térmica é uma **estimativa de superfície**, não temperatura ambiente medida em estação. A correlação é alta mas não substitui medição local de termômetro.
- A área de cobertura é uma **estimativa por categoria**, não medição cadastral. Para projeto executivo é necessário levantamento topográfico.
- A irradiância NASA POWER é uma **climatologia satelital** com resolução de 0,5°. Variações locais por sombreamento estrutural não são capturadas.
- O **Performance Ratio de 0,78** já considera perda térmica esperada em climas quentes (~10–15 % de queda de eficiência por temperatura do módulo). Em telhados muito mal ventilados, considere PR de 0,72.
- A tarifa de R$ 0,85/kWh utilizada na calculadora é uma referência média da Amazonas Energia em 2025; o valor real varia por classe de consumo.
- Este projeto é uma ferramenta de **prospecção**, não de engenharia executiva. Para dimensionamento de sistema fotovoltaico, consulte profissional habilitado pela CFT-AM ou CREA-AM.

---

## English

### 1. Thermal data collection

Points were compiled from:

- Fiocruz Amazônia studies (2023) on Center-West surface heat islands
- UFAM / Árvores do Asfalto research group (2023–2024) with field measurements
- Joint INPA / MapBiomas study (2025) on surface temperature relative to Adolpho Ducke Reserve
- Unicamp research (2022, replicated in 2024) on socio-economic vulnerability and heat
- Local press coverage (Em Tempo, A Crítica, Portal Amazônia, BNC Amazonas)
- Public comments and resident reports from social networks and city ombudsman channels

The **thermal anomaly** recorded for each point represents the mean difference (in °C) between local surface temperature and the Adolpho Ducke Reserve, used as the climatic baseline for the region.

### 2. Geocoding

Latitudes and longitudes were curated manually. Nominatim (OpenStreetMap) was discarded as the default solution because it is unreliable for Manaus alleys and crossings, whose names are not registered in global bases. Manual curation guarantees ±50 m accuracy for most points.

### 3. Solar irradiance

Annual mean irradiance for each zone is fetched from the **NASA POWER API** (`ALLSKY_SFC_SW_DWN` parameter, RE community — Renewable Energy), climatology endpoint. Since Manaus shows very small intra-urban variation of irradiance (~±0.05 kWh/m²/day), the pipeline samples one representative value per administrative zone. Calibrated fallback values (offline mode) live in `pipeline/config.py`.

### 4. Photovoltaic potential

Standard solar industry formula:

```
E_kWh_year = G × A_usable × η × PR × 365
```

| Symbol  | Description                        | Value |
|---------|------------------------------------|-------|
| G       | Annual mean irradiance (kWh/m²/day) | NASA POWER (~4.9) |
| A_usable | Usable area (m²)                  | A_total × utilization factor |
| η       | Module efficiency                  | 0.18 (monocrystalline) |
| PR      | Performance Ratio                  | 0.78 |

#### Utilization factor by category

Represents the fraction of total area actually available for modules, discounting rooftop equipment, heritage restrictions, structural shading, and other limitations.

| Category                 | Factor |
|--------------------------|--------|
| Industrial District      | 0.70   |
| Dealership               | 0.65   |
| School, Daycare, Business | 0.60  |
| University, Church, ER, Clinic | 0.55 |
| Mall                     | 0.50   |
| Hospital, Alley, Air Force, Army | 0.40–0.45 |
| Tourist site (heritage)  | 0.30   |

#### Installable capacity (kWp)

`kWp ≈ A_usable × 0.18` (~5.5 m² per kWp rule of thumb).

### 5. Potential classification

| Class           | Annual generation (kWh) |
|-----------------|-------------------------|
| High            | ≥ 80,000                |
| Medium          | 15,000 – 80,000         |
| Low             | > 0 and < 15,000        |
| Not applicable  | No installable surface  |

### 6. Limitations

- The thermal anomaly is a **surface estimate**, not station-grade ambient temperature.
- Roof area is a **per-category estimate**, not surveyed measurement. Site survey is required for engineering.
- NASA POWER irradiance is a **satellite climatology** at 0.5° resolution. Local structural shading is not captured.
- The **0.78 Performance Ratio** already accounts for thermal losses (~10–15 % efficiency drop). For poorly ventilated rooftops use PR ≈ 0.72.
- The R$ 0.85/kWh tariff in the calculator is a 2025 reference for Amazonas Energia; actual values vary per consumption class.
- This project is a **prospection tool**, not executive engineering. Consult a licensed engineer for any actual installation.
