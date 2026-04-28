const TRANSLATIONS = {
  pt: {
    title: 'Mapa de Calor Solar de Manaus',
    tagline: 'Ilhas de calor urbano e potencial fotovoltaico',
    overview: 'Panorama',
    stat_points: 'Pontos mapeados',
    stat_hottest: 'Bairro mais crítico',
    stat_solar: 'Potencial total (GWh/ano)',
    layers: 'Camadas',
    layer_heat: 'Calor',
    layer_solar: 'Solar',
    layer_both: 'Ambos',
    filters: 'Filtros',
    filter_zone: 'Zona',
    filter_category: 'Categoria',
    filter_search: 'Busca',
    all: 'Todas',
    search_placeholder: 'Buscar por nome...',
    calc_title: 'Estime seu telhado',
    calc_intro: 'Informe a área disponível e a zona para uma estimativa preliminar.',
    calc_area: 'Área disponível (m²)',
    calc_zone: 'Zona',
    calc_run: 'Calcular',
    calc_result_header: 'Resultado',
    calc_kwp: 'Capacidade instalável',
    calc_kwh: 'Geração anual estimada',
    calc_savings: 'Economia anual estimada',
    calc_disclaimer: 'Estimativa preliminar baseada em irradiância média da zona, eficiência 18% e PR 0,78. Para projeto executivo procure profissional habilitado.',
    legend: 'Legenda',
    lvl_5: 'Crítico (anomalia ≥ 5 °C)',
    lvl_4: 'Alto (≥ 4 °C)',
    lvl_3: 'Médio (≥ 3 °C)',
    lvl_2: 'Baixo (< 3 °C)',
    lvl_cool: 'Refúgio fresco',
    methodology: 'Metodologia',
    loading: 'Carregando dados...',
    popup_anomaly: 'Anomalia térmica',
    popup_irradiance: 'Irradiância média',
    popup_area: 'Área útil estimada',
    popup_kwh: 'Potencial fotovoltaico',
    popup_kwp: 'Capacidade instalável',
    popup_critic: 'Criticidade',
    cat_bairro: 'Bairro',
    cat_beco: 'Beco',
    cat_avenida: 'Avenida',
    cat_escola: 'Escola',
    cat_creche: 'Creche',
    cat_universidade: 'Universidade',
    cat_hospital: 'Hospital',
    cat_upa: 'UPA',
    cat_spa: 'SPA',
    cat_shopping: 'Shopping',
    cat_concessionaria: 'Concessionária',
    cat_ponto_turistico: 'Ponto turístico',
    cat_militar_exercito: 'Exército',
    cat_militar_fab: 'Força Aérea',
    cat_militar_marinha: 'Marinha',
    cat_militar_pm: 'Polícia Militar',
    cat_igreja: 'Igreja',
    cat_parque: 'Parque',
    cat_praca: 'Praça',
    cat_estabelecimento: 'Estabelecimento',
    cat_estrada: 'Estrada',
    cat_rio_orla: 'Rio / Orla',
    cat_distrito_industrial: 'Distrito Industrial',
  },
  en: {
    title: 'Manaus Solar Heat Map',
    tagline: 'Urban heat islands and photovoltaic potential',
    overview: 'Overview',
    stat_points: 'Mapped points',
    stat_hottest: 'Hottest neighborhood',
    stat_solar: 'Total potential (GWh/year)',
    layers: 'Layers',
    layer_heat: 'Heat',
    layer_solar: 'Solar',
    layer_both: 'Both',
    filters: 'Filters',
    filter_zone: 'Zone',
    filter_category: 'Category',
    filter_search: 'Search',
    all: 'All',
    search_placeholder: 'Search by name...',
    calc_title: 'Estimate your rooftop',
    calc_intro: 'Provide the available area and zone for a preliminary estimate.',
    calc_area: 'Available area (m²)',
    calc_zone: 'Zone',
    calc_run: 'Calculate',
    calc_result_header: 'Result',
    calc_kwp: 'Installable capacity',
    calc_kwh: 'Estimated annual generation',
    calc_savings: 'Estimated annual savings',
    calc_disclaimer: 'Preliminary estimate using mean zonal irradiance, 18% efficiency and 0.78 PR. For executive engineering, consult a licensed professional.',
    legend: 'Legend',
    lvl_5: 'Critical (anomaly ≥ 5 °C)',
    lvl_4: 'High (≥ 4 °C)',
    lvl_3: 'Medium (≥ 3 °C)',
    lvl_2: 'Low (< 3 °C)',
    lvl_cool: 'Cool refuge',
    methodology: 'Methodology',
    loading: 'Loading data...',
    popup_anomaly: 'Thermal anomaly',
    popup_irradiance: 'Mean irradiance',
    popup_area: 'Usable area',
    popup_kwh: 'Photovoltaic potential',
    popup_kwp: 'Installable capacity',
    popup_critic: 'Criticality',
    cat_bairro: 'Neighborhood',
    cat_beco: 'Alley',
    cat_avenida: 'Avenue',
    cat_escola: 'School',
    cat_creche: 'Daycare',
    cat_universidade: 'University',
    cat_hospital: 'Hospital',
    cat_upa: 'Emergency Care',
    cat_spa: 'Walk-in Clinic',
    cat_shopping: 'Mall',
    cat_concessionaria: 'Dealership',
    cat_ponto_turistico: 'Tourist site',
    cat_militar_exercito: 'Army',
    cat_militar_fab: 'Air Force',
    cat_militar_marinha: 'Navy',
    cat_militar_pm: 'Military Police',
    cat_igreja: 'Church',
    cat_parque: 'Park',
    cat_praca: 'Square',
    cat_estabelecimento: 'Business',
    cat_estrada: 'Highway',
    cat_rio_orla: 'River / Waterfront',
    cat_distrito_industrial: 'Industrial District',
  },
};

const ENERGY_TARIFF_BRL_PER_KWH = 0.85;
const STATE = {
  lang: 'pt',
  layer: 'heat',
  filterZone: 'all',
  filterCategory: 'all',
  filterSearch: '',
  features: [],
  markers: new Map(),
  layerGroup: null,
  map: null,
};

function t(key) {
  return TRANSLATIONS[STATE.lang][key] || TRANSLATIONS.pt[key] || key;
}

function applyTranslations() {
  document.documentElement.lang = STATE.lang === 'pt' ? 'pt-BR' : 'en';
  document.documentElement.dataset.lang = STATE.lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  const search = document.getElementById('filterSearch');
  if (search) search.placeholder = t('search_placeholder');
}

function colorForCriticality(level, anomaly) {
  if (anomaly < 0) return '#60d394';
  if (level >= 5) return '#ff3030';
  if (level >= 4) return '#ff6b35';
  if (level >= 3) return '#ffb302';
  return '#c2c08a';
}

function colorForSolar(level) {
  if (level === 'alta') return '#ffd166';
  if (level === 'media') return '#ff9a3c';
  if (level === 'baixa') return '#7d6b40';
  return '#3a3a4a';
}

function radiusFor(properties, layer) {
  if (layer === 'solar') {
    const kwh = properties.potencial_kwh_ano || 0;
    if (kwh >= 500_000) return 14;
    if (kwh >= 100_000) return 10;
    if (kwh >= 20_000) return 7;
    if (kwh > 0) return 5;
    return 4;
  }
  const c = properties.criticidade || 1;
  if (c >= 5) return 11;
  if (c >= 4) return 9;
  if (c >= 3) return 7;
  return 5;
}

function buildPopup(properties) {
  const obs = STATE.lang === 'pt' ? properties.obs_pt : properties.obs_en;
  const rec = STATE.lang === 'pt' ? properties.recomendacao_pt : properties.recomendacao_en;
  const isCool = properties.anomalia_c < 0;
  const tagClass = isCool ? 'cool' : 'hot';
  const recClass = isCool ? 'cool' : '';
  const sign = properties.anomalia_c >= 0 ? '+' : '';
  const categoryLabel = t('cat_' + properties.categoria) || properties.categoria;

  const rows = [
    `<div class="popup-row"><span>${t('popup_irradiance')}</span><strong>${properties.irradiancia_kwh_m2_dia.toFixed(2)} kWh/m²/dia</strong></div>`,
    `<div class="popup-row"><span>${t('popup_critic')}</span><strong>${properties.criticidade}/5</strong></div>`,
  ];

  if (properties.solar_aplicavel) {
    rows.push(`<div class="popup-row"><span>${t('popup_area')}</span><strong>${properties.area_util_m2.toLocaleString(STATE.lang === 'pt' ? 'pt-BR' : 'en-US')} m²</strong></div>`);
    rows.push(`<div class="popup-row"><span>${t('popup_kwp')}</span><strong>${properties.potencial_kwp.toFixed(1)} kWp</strong></div>`);
    rows.push(`<div class="popup-row"><span>${t('popup_kwh')}</span><strong>${(properties.potencial_kwh_ano / 1000).toLocaleString(STATE.lang === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: 1 })} MWh/ano</strong></div>`);
  }

  return `
    <div class="popup-content">
      <span class="anomaly-tag ${tagClass}">${sign}${properties.anomalia_c.toFixed(1)} °C</span>
      <h3>${properties.nome}</h3>
      <p class="popup-subtitle">${categoryLabel} · ${properties.bairro} · ${properties.zona}</p>
      ${rows.join('')}
      ${obs ? `<p class="popup-obs">"${obs}"</p>` : ''}
      ${rec ? `<div class="popup-rec ${recClass}">${rec}</div>` : ''}
    </div>
  `;
}

function shouldShow(feature) {
  const p = feature.properties;
  if (STATE.filterZone !== 'all' && p.zona !== STATE.filterZone) return false;
  if (STATE.filterCategory !== 'all' && p.categoria !== STATE.filterCategory) return false;
  if (STATE.filterSearch) {
    const q = STATE.filterSearch.toLowerCase();
    const hay = `${p.nome} ${p.bairro} ${p.categoria}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (STATE.layer === 'solar' && !p.solar_aplicavel) return false;
  return true;
}

function renderMarkers() {
  if (STATE.layerGroup) STATE.layerGroup.clearLayers();
  STATE.layerGroup = L.layerGroup().addTo(STATE.map);
  STATE.markers.clear();

  STATE.features.forEach((feature) => {
    if (!shouldShow(feature)) return;
    const [lon, lat] = feature.geometry.coordinates;
    const p = feature.properties;
    let fillColor;
    if (STATE.layer === 'solar') fillColor = colorForSolar(p.nivel_potencial);
    else if (STATE.layer === 'both') fillColor = p.solar_aplicavel ? colorForSolar(p.nivel_potencial) : colorForCriticality(p.criticidade, p.anomalia_c);
    else fillColor = colorForCriticality(p.criticidade, p.anomalia_c);

    const marker = L.circleMarker([lat, lon], {
      radius: radiusFor(p, STATE.layer),
      fillColor,
      color: '#0a0a14',
      weight: 1.5,
      fillOpacity: 0.85,
    });

    marker.bindPopup(buildPopup(p), { maxWidth: 320, autoPan: true });
    marker.addTo(STATE.layerGroup);
    STATE.markers.set(p.id, marker);
  });
}

function updateStats() {
  const visible = STATE.features.filter(shouldShow);
  const total = visible.length;
  const hottest = visible.reduce((acc, f) => (f.properties.anomalia_c > (acc?.properties?.anomalia_c ?? -99) ? f : acc), null);
  const totalSolarKwh = visible.reduce((sum, f) => sum + (f.properties.potencial_kwh_ano || 0), 0);

  document.getElementById('statPoints').textContent = total;
  document.getElementById('statHotZone').textContent = hottest ? hottest.properties.bairro : '—';
  document.getElementById('statSolar').textContent = (totalSolarKwh / 1_000_000).toFixed(2);
}

function populateFilters() {
  const zones = [...new Set(STATE.features.map((f) => f.properties.zona))].sort();
  const categories = [...new Set(STATE.features.map((f) => f.properties.categoria))].sort();

  const zoneSelect = document.getElementById('filterZone');
  const calcZoneSelect = document.getElementById('calcZone');
  zones.forEach((z) => {
    const opt1 = new Option(z, z);
    const opt2 = new Option(z, z);
    zoneSelect.appendChild(opt1);
    calcZoneSelect.appendChild(opt2);
  });
  calcZoneSelect.value = 'Centro-Sul';

  const catSelect = document.getElementById('filterCategory');
  categories.forEach((c) => {
    const label = t('cat_' + c) || c;
    const opt = new Option(label, c);
    catSelect.appendChild(opt);
  });
}

function rebuildCategoryLabels() {
  const select = document.getElementById('filterCategory');
  for (const option of select.options) {
    if (option.value === 'all') continue;
    option.textContent = t('cat_' + option.value) || option.value;
  }
}

function setupListeners() {
  document.querySelectorAll('input[name="layer"]').forEach((el) => {
    el.addEventListener('change', (e) => {
      STATE.layer = e.target.value;
      renderMarkers();
    });
  });

  document.getElementById('filterZone').addEventListener('change', (e) => {
    STATE.filterZone = e.target.value;
    renderMarkers();
    updateStats();
  });

  document.getElementById('filterCategory').addEventListener('change', (e) => {
    STATE.filterCategory = e.target.value;
    renderMarkers();
    updateStats();
  });

  document.getElementById('filterSearch').addEventListener('input', (e) => {
    STATE.filterSearch = e.target.value;
    renderMarkers();
    updateStats();
  });

  document.getElementById('calcRun').addEventListener('click', runCalculator);

  document.getElementById('langToggle').addEventListener('click', () => {
    STATE.lang = STATE.lang === 'pt' ? 'en' : 'pt';
    document.getElementById('langToggle').textContent = STATE.lang === 'pt' ? 'EN' : 'PT';
    applyTranslations();
    rebuildCategoryLabels();
    renderMarkers();
    updateStats();
  });

  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

function runCalculator() {
  const area = parseFloat(document.getElementById('calcArea').value);
  const zone = document.getElementById('calcZone').value;
  const sample = STATE.features.find((f) => f.properties.zona === zone);
  if (!sample || isNaN(area) || area <= 0) return;
  const irradiance = sample.properties.irradiancia_kwh_m2_dia;
  const usable = area * 0.6;
  const kwp = usable * 0.18;
  const kwhYear = irradiance * usable * 0.18 * 0.78 * 365;
  const savings = kwhYear * ENERGY_TARIFF_BRL_PER_KWH;
  const formatter = new Intl.NumberFormat(STATE.lang === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: 0 });
  const currency = new Intl.NumberFormat(STATE.lang === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: 'BRL' });

  const result = document.getElementById('calcResult');
  result.hidden = false;
  result.innerHTML = `
    <h3>${t('calc_result_header')}</h3>
    <div class="calc-row"><span>${t('calc_kwp')}</span><strong>${kwp.toFixed(1)} kWp</strong></div>
    <div class="calc-row"><span>${t('calc_kwh')}</span><strong>${formatter.format(kwhYear)} kWh/ano</strong></div>
    <div class="calc-row"><span>${t('calc_savings')}</span><strong>${currency.format(savings)}</strong></div>
    <p class="muted" style="margin-top:8px;font-size:11px;">${t('calc_disclaimer')}</p>
  `;
}

function initMap() {
  STATE.map = L.map('map', {
    center: [-3.085, -60.013],
    zoom: 12,
    zoomControl: true,
    attributionControl: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(STATE.map);
}

async function loadData() {
  const response = await fetch('data/pontos.geojson');
  if (!response.ok) throw new Error('Failed to load pontos.geojson');
  const data = await response.json();
  STATE.features = data.features;
}

async function bootstrap() {
  applyTranslations();
  initMap();
  try {
    await loadData();
    populateFilters();
    setupListeners();
    renderMarkers();
    updateStats();
    document.getElementById('loading').classList.add('hidden');
  } catch (err) {
    console.error(err);
    document.getElementById('loading').innerHTML = '<p style="color:#ff6b35;">Erro ao carregar dados / Failed to load data</p>';
  }
}

bootstrap();
