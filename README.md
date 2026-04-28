# Mapa de Calor Solar de Manaus

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.10%2B-blue)](https://www.python.org/)
[![Leaflet](https://img.shields.io/badge/leaflet-1.9.4-green)](https://leafletjs.com/)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub_Pages-181717)](https://pages.github.com/)

> Mapeamento interativo das ilhas de calor urbano de Manaus cruzado com indicador de potencial fotovoltaico.
> Interactive mapping of Manaus urban heat islands cross-referenced with photovoltaic potential.

---

## Português

### Sobre o projeto

Manaus é uma das capitais brasileiras com a maior intensificação de ilhas de calor urbano nos últimos dez anos. Este projeto mapeia mais de **250 pontos críticos** da cidade — bairros, becos, avenidas, escolas, hospitais, instalações militares, estradas e orla — combinando dados térmicos publicados por instituições como UFAM, INPA, Fiocruz Amazônia e MapBiomas com irradiância solar fornecida pela API NASA POWER.

Para cada ponto, o mapa exibe a anomalia térmica em relação à Reserva Adolpho Ducke (referência climática) e estima o potencial fotovoltaico instalável, transformando o problema social do calor em oportunidade de geração distribuída de energia limpa.

### O que você encontra no mapa

- 60 bairros das 6 zonas administrativas
- 20 becos com queixas térmicas registradas
- 21 avenidas com asfalto crítico
- Escolas e creches com medições de calor em sala de aula
- Hospitais, UPAs e SPAs
- Shoppings, concessionárias e Polo Industrial
- Pontos turísticos
- Instalações do Exército, FAB e Marinha
- Saídas de Manaus pela BR-174, BR-319, AM-010 e AM-070
- Igarapés e orla do rio Negro

### Como rodar localmente

```bash
git clone https://github.com/wervley/mapa-calor-solar-manaus.git
cd mapa-calor-solar-manaus

python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

python3 -m pipeline

python3 -m http.server 8000 --directory docs
```

Acesse `http://localhost:8000` no navegador.

### Modo offline

A NASA POWER API é gratuita mas requer rede aberta. Para rodar sem internet:

```bash
python3 -m pipeline --offline
```

O pipeline usará valores de irradiância média já calibrados para cada zona de Manaus.

### Estrutura do repositório

```
mapa-calor-solar-manaus/
├── pipeline/              Engine Python (config, solar, potential, exporter)
├── data/
│   ├── pontos_brutos.csv  Dataset curado manualmente (260 linhas)
│   └── pontos.geojson     Saída do pipeline
└── docs/                  Site estático servido pelo GitHub Pages
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── methodology.md
    └── data/pontos.geojson
```

### Tecnologia

- **Backend / pipeline**: Python 3.10+, pandas, requests, NASA POWER API
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Leaflet 1.9
- **Mapa base**: CartoDB Dark Matter (OpenStreetMap)
- **Hospedagem**: GitHub Pages

### Fórmula do potencial fotovoltaico

```
Geração anual (kWh) = Irradiância × Área útil × Eficiência × PR × 365
```

Onde:
- Irradiância: kWh/m²/dia (NASA POWER, média anual da zona)
- Área útil: área total × fator de utilização por categoria
- Eficiência: 18 % (módulo monocristalino padrão de mercado)
- PR (Performance Ratio): 0,78 (já contempla perdas térmicas em clima quente)

Veja a [metodologia completa](docs/methodology.md).

### Fontes

InfoAmazonia, Fiocruz Amazônia, FAPEAM, UFAM (Grupo Árvores do Asfalto), INPA, Portal Em Tempo, Portal Amazônia, BNC Amazonas, Climatempo, INMET, NASA POWER, MapBiomas, Câmara Municipal de Manaus.

### Licença

MIT — veja [LICENSE](LICENSE).

---

## English

### About the project

Manaus, capital of the state of Amazonas, is one of the Brazilian capitals with the steepest urban heat-island intensification over the last decade. This project maps more than **250 critical points** across the city — neighborhoods, alleys, avenues, schools, hospitals, military installations, highways and waterfront — by combining thermal data published by UFAM, INPA, Fiocruz Amazônia and MapBiomas with solar irradiance provided by the NASA POWER API.

For every point the map shows the thermal anomaly relative to the Adolpho Ducke Reserve (climatic baseline) and estimates the installable photovoltaic potential, turning a social heat problem into an opportunity for distributed clean energy generation.

### What's on the map

- 60 neighborhoods across 6 administrative zones
- 20 alleys with documented thermal complaints
- 21 avenues with critical asphalt temperatures
- Schools and daycares with classroom heat measurements
- Hospitals, emergency-care units and walk-in clinics
- Malls, dealerships and the Manaus Industrial Pole
- Tourist sites
- Brazilian Army, Air Force and Navy facilities
- Highway exits BR-174, BR-319, AM-010 and AM-070
- Creeks and the Rio Negro waterfront

### Run it locally

```bash
git clone https://github.com/wervley/mapa-calor-solar-manaus.git
cd mapa-calor-solar-manaus

python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

python3 -m pipeline

python3 -m http.server 8000 --directory docs
```

Then open `http://localhost:8000`.

### Offline mode

NASA POWER is free but requires open network access. For air-gapped runs:

```bash
python3 -m pipeline --offline
```

The pipeline will use pre-calibrated irradiance values for each Manaus zone.

### Photovoltaic potential formula

```
Annual generation (kWh) = Irradiance × Usable area × Efficiency × PR × 365
```

Where:
- Irradiance: kWh/m²/day (NASA POWER, annual zonal mean)
- Usable area: total area × category utilization factor
- Efficiency: 18 % (standard monocrystalline module)
- PR: 0.78 (already accounts for thermal losses in tropical climate)

See the [full methodology](docs/methodology.md).

### Tech stack

- **Backend / pipeline**: Python 3.10+, pandas, requests, NASA POWER API
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Leaflet 1.9
- **Base map**: CartoDB Dark Matter (OpenStreetMap)
- **Hosting**: GitHub Pages

### Sources

InfoAmazonia, Fiocruz Amazônia, FAPEAM, UFAM (Árvores do Asfalto research group), INPA, Em Tempo, Portal Amazônia, BNC Amazonas, Climatempo, INMET, NASA POWER, MapBiomas, Manaus City Council.

### License

MIT — see [LICENSE](LICENSE).
