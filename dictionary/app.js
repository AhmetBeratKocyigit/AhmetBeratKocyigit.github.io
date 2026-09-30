const rememberedDataset = localStorage.getItem('dlt-dataset');
const state = {
  all: [],
  filtered: [],
  searchIndex: [],
  dataset: ['basic', 'detailed'].includes(rememberedDataset) ? rememberedDataset : '',
  searchMode: 'word',
  page: 1,
  pageSize: 24,
  sortAscending: true,
  activeLetter: '',
  favoritesOnly: false,
  favorites: new Set(JSON.parse(localStorage.getItem('dlt-favorites') || '[]'))
};

const $ = (selector) => document.querySelector(selector);
const searchInput = $('#searchInput');
const resultsGrid = $('#resultsGrid');
const pagination = $('#pagination');
const emptyState = $('#emptyState');
const welcomeState = $('#welcomeState');
const loadingState = $('#loadingState');
const filterDrawer = $('#filterDrawer');
const modalBackdrop = $('#modalBackdrop');
const modalContent = $('#modalContent');
const datasetBackdrop = $('#datasetBackdrop');
const datasetFiles = {
  basic: 'data/dlt_sozluk_temel.json',
  detailed: 'data/dlt_sozluk_detayli.json'
};
const datasetLabels = { basic: 'Temel', detailed: 'Detaylı' };

function normalize(value) {
  return String(value || '').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function tokenize(value) {
  return normalize(value).match(/[\p{L}\p{N}]+/gu) || [];
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]);
}

function pageNumber(value) {
  const match = String(value || '').match(/\d+/);
  return match ? Number(match[0]) : Infinity;
}

function buildSearchIndex() {
  state.searchIndex = state.all.map((entry) => ({
    entry,
    wordTokens: tokenize([entry.kelime, ...(entry.cekimler || [])].join(' ')),
    meaningTokens: tokenize(entry.anlam),
    contextTokens: tokenize([entry.ornek_metin, entry.notlar].join(' '))
  }));
}

function editDistanceWithin(left, right, limit) {
  if (Math.abs(left.length - right.length) > limit) return limit + 1;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    let rowMinimum = row;
    for (let column = 1; column <= right.length; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;
      current[column] = Math.min(current[column - 1] + 1, previous[column] + 1, previous[column - 1] + cost);
      rowMinimum = Math.min(rowMinimum, current[column]);
    }
    if (rowMinimum > limit) return limit + 1;
    previous = current;
  }
  return previous[right.length];
}

function tokenMatchScore(queryToken, candidates) {
  let directScore = 0;
  for (const candidate of candidates) {
    if (candidate === queryToken) return { directScore: 100, fuzzyScore: 0 };
    if (candidate.startsWith(queryToken)) directScore = Math.max(directScore, 80 - Math.min(candidate.length - queryToken.length, 10));
    if (queryToken.length >= 3 && candidate.includes(queryToken)) directScore = Math.max(directScore, 65);
  }
  if (directScore) return { directScore, fuzzyScore: 0 };

  let fuzzyScore = 0;
  const editLimit = queryToken.length >= 8 ? 2 : queryToken.length >= 4 ? 1 : 0;
  if (!editLimit) return { directScore: 0, fuzzyScore };
  for (const candidate of candidates) {
    if (Math.abs(candidate.length - queryToken.length) > editLimit) continue;
    const distance = editDistanceWithin(queryToken, candidate, editLimit);
    if (distance <= editLimit) fuzzyScore = Math.max(fuzzyScore, 50 - distance * 10);
  }
  return { directScore: 0, fuzzyScore };
}

function searchScore(tokenScores, fuzzyFallback) {
  if (!tokenScores.length) return 0;
  let total = 0;
  for (let index = 0; index < tokenScores.length; index += 1) {
    const score = tokenScores[index].directScore || (fuzzyFallback[index] ? tokenScores[index].fuzzyScore : 0);
    if (!score) return -1;
    total += score;
  }
  return total / tokenScores.length;
}

function scoreIndexedEntry(indexedEntry, queryTokens) {
  const candidateFields = state.searchMode === 'meaning'
    ? [{ tokens: indexedEntry.meaningTokens, weight: 1 }, { tokens: indexedEntry.contextTokens, weight: 0.75 }]
    : [{ tokens: indexedEntry.wordTokens, weight: 1 }];
  return queryTokens.map((queryToken) => candidateFields.reduce((best, field) => {
    const score = tokenMatchScore(queryToken, field.tokens);
    return {
      directScore: Math.max(best.directScore, score.directScore * field.weight),
      fuzzyScore: Math.max(best.fuzzyScore, score.fuzzyScore * field.weight)
    };
  }, { directScore: 0, fuzzyScore: 0 }));
}

function populateFilters() {
  const types = [...new Set(state.all.map((entry) => entry.kelime_turu).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'tr'));
  const dialects = [...new Set(state.all.map((entry) => entry.dil_veya_lehce).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'tr'));
  $('#typeFilter').innerHTML = '<option value="">Tümü</option>' + types.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
  $('#dialectFilter').innerHTML = '<option value="">Tümü</option>' + dialects.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
}

function buildLetterNav() {
  const letters = [...new Set(state.all.map((entry) => normalize((entry.kelime || '').trim()).charAt(0).toLocaleUpperCase('tr-TR')).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'tr'));
  $('#letterNav').innerHTML = letters.map((letter) => `<button type="button" data-letter="${escapeHtml(letter)}">${escapeHtml(letter)}</button>`).join('');
}

function updateFilterCount() {
  const count = [$('#typeFilter').value, $('#dialectFilter').value].filter(Boolean).length;
  $('#activeFilterCount').textContent = count;
}

function updateFilterVisibility() {
  const hasTypes = state.all.some((entry) => entry.kelime_turu);
  const hasDialects = state.all.some((entry) => entry.dil_veya_lehce);
  $('#typeFilterField').hidden = !hasTypes;
  $('#dialectFilterField').hidden = !hasDialects;
  $('#filterToggle').hidden = !hasTypes && !hasDialects;
  if ($('#filterToggle').hidden) {
    filterDrawer.hidden = true;
    $('#filterToggle').setAttribute('aria-expanded', 'false');
  }
}

function setSearchMode(mode) {
  state.searchMode = mode;
  document.querySelectorAll('[data-search-mode]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.searchMode === mode));
  });
  searchInput.placeholder = mode === 'word' ? 'Kelime ara...' : 'Anlam ara...';
  applyFilters();
}

function applyFilters() {
  const queryTokens = tokenize(searchInput.value);
  const selectedType = $('#typeFilter').value;
  const selectedDialect = $('#dialectFilter').value;
  const hasFilters = Boolean(queryTokens.length || state.activeLetter || selectedType || selectedDialect || state.favoritesOnly);
  const scoredEntries = state.searchIndex.map((indexedEntry) => ({
    entry: indexedEntry.entry,
    tokenScores: scoreIndexedEntry(indexedEntry, queryTokens)
  }));
  const fuzzyFallback = queryTokens.map((_, index) => !scoredEntries.some(({ tokenScores }) => tokenScores[index].directScore));
  const matches = scoredEntries.map(({ entry, tokenScores }) => ({
    entry,
    score: searchScore(tokenScores, fuzzyFallback)
  })).filter(({ entry, score }) => {
    if (score < 0) return false;
    if (state.activeLetter && normalize(entry.kelime).charAt(0).toLocaleUpperCase('tr-TR') !== state.activeLetter) return false;
    if (selectedType && entry.kelime_turu !== selectedType) return false;
    if (selectedDialect && entry.dil_veya_lehce !== selectedDialect) return false;
    if (state.favoritesOnly && !state.favorites.has(entryId(entry))) return false;
    return true;
  });
  matches.sort((a, b) => b.score - a.score || (state.sortAscending ? compareEntries(a.entry, b.entry) : compareEntries(b.entry, a.entry)));
  state.filtered = matches.map(({ entry }) => entry);
  state.page = 1;
  updateFilterCount();
  render(hasFilters);
}

function compareEntries(a, b) {
  return String(a.kelime || '').localeCompare(String(b.kelime || ''), 'tr', { sensitivity: 'base' }) || pageNumber(a.kaynak_sayfa) - pageNumber(b.kaynak_sayfa);
}

function entryId(entry) {
  return `${entry.kelime}|${entry.anlam}|${entry.kaynak_sayfa}`;
}

function saveFavorites() {
  localStorage.setItem('dlt-favorites', JSON.stringify([...state.favorites]));
  $('#favoriteCount').textContent = state.favorites.size;
}

function cardTemplate(entry, index) {
  const favorite = state.favorites.has(entryId(entry));
  const example = entry.ornek_metin || entry.notlar || '';
  return `<article class="entry-card" data-index="${index}" style="animation-delay:${Math.min(index * 18, 180)}ms">
    <div class="entry-top"><div><h2 class="entry-word">${escapeHtml(entry.kelime || '—')}</h2>${entry.kelime_turu ? `<div class="entry-type">${escapeHtml(entry.kelime_turu)}</div>` : ''}</div>
    <button class="favorite ${favorite ? 'is-favorite' : ''}" type="button" data-favorite="${escapeHtml(entryId(entry))}" aria-label="${favorite ? 'Favoriden çıkar' : 'Favoriye ekle'}">${favorite ? '★' : '☆'}</button></div>
    <p class="entry-meaning">${escapeHtml(entry.anlam || 'Anlam belirtilmemiş')}</p>
    ${example ? `<p class="entry-example">${escapeHtml(example)}</p>` : '<p class="entry-example"></p>'}
    <div class="entry-footer"><span>${escapeHtml(entry.dil_veya_lehce || '')}</span></div>
  </article>`;
}

function render(hasFilters = false) {
  const start = (state.page - 1) * state.pageSize;
  const visible = state.filtered.slice(start, start + state.pageSize);
  $('#resultSummary').textContent = hasFilters ? `${state.filtered.length.toLocaleString('tr-TR')} sonuç · ${state.all.length.toLocaleString('tr-TR')} toplam kayıt` : 'Arama veya harf seçimi bekleniyor';
  resultsGrid.innerHTML = visible.map((entry, index) => cardTemplate(entry, index)).join('');
  resultsGrid.hidden = !hasFilters || visible.length === 0;
  welcomeState.hidden = hasFilters;
  emptyState.hidden = !hasFilters || visible.length !== 0;
  pagination.hidden = !hasFilters;
  pagination.innerHTML = hasFilters ? paginationTemplate() : '';
  document.querySelectorAll('#letterNav button').forEach((button) => button.classList.toggle('active', button.dataset.letter === state.activeLetter));
}

function paginationTemplate() {
  const totalPages = Math.ceil(state.filtered.length / state.pageSize);
  if (totalPages <= 1) return '';
  const pages = new Set([1, totalPages, state.page, state.page - 1, state.page + 1].filter((page) => page > 0 && page <= totalPages));
  const sorted = [...pages].sort((a, b) => a - b);
  let html = `<button type="button" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''}>‹</button>`;
  let previous = 0;
  sorted.forEach((page) => {
    if (page - previous > 1) html += '<span class="pagination-gap">…</span>';
    html += `<button type="button" data-page="${page}" class="${page === state.page ? 'current' : ''}">${page}</button>`;
    previous = page;
  });
  return `${html}<button type="button" data-page="${state.page + 1}" ${state.page === totalPages ? 'disabled' : ''}>›</button>`;
}

function openDetail(entry) {
  const forms = (entry.cekimler || []).join(', ');
  modalContent.innerHTML = `<p class="eyebrow"><span></span> Sözlük maddesi</p><h2 id="modalWord" class="modal-word">${escapeHtml(entry.kelime || '—')}</h2>${entry.kelime_turu ? `<span class="modal-type">${escapeHtml(entry.kelime_turu)}</span>` : ''}<p class="detail-meaning">${escapeHtml(entry.anlam || 'Anlam belirtilmemiş')}</p>
    ${entry.ornek_metin ? `<div class="detail-section"><span class="detail-label">Örnek / kullanım</span><p class="detail-value">${escapeHtml(entry.ornek_metin)}</p></div>` : ''}
    ${forms ? `<div class="detail-section"><span class="detail-label">Çekimler</span><p class="detail-value">${escapeHtml(forms)}</p></div>` : ''}
    ${entry.notlar ? `<div class="detail-section"><span class="detail-label">Notlar</span><p class="detail-value">${escapeHtml(entry.notlar)}</p></div>` : ''}
    ${entry.dil_veya_lehce ? `<div class="detail-section"><span class="detail-label">Dil / lehçe</span><p class="detail-value">${escapeHtml(entry.dil_veya_lehce)}</p></div>` : ''}`;
  modalBackdrop.hidden = false;
  document.body.classList.add('modal-open');
}

function closeModal(backdrop) { backdrop.hidden = true; if ($('#modalBackdrop').hidden && $('#aboutBackdrop').hidden) document.body.classList.remove('modal-open'); }

resultsGrid.addEventListener('click', (event) => {
  const favoriteButton = event.target.closest('[data-favorite]');
  const card = event.target.closest('.entry-card');
  if (favoriteButton) {
    event.stopPropagation();
    const id = favoriteButton.dataset.favorite;
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    saveFavorites();
    applyFilters();
    return;
  }
  if (card) openDetail(state.filtered[(state.page - 1) * state.pageSize + Number(card.dataset.index)]);
});

pagination.addEventListener('click', (event) => { const button = event.target.closest('[data-page]'); if (button && !button.disabled) { state.page = Number(button.dataset.page); render(); window.scrollTo({ top: $('.content-grid').offsetTop - 90, behavior: 'smooth' }); } });
searchInput.addEventListener('input', () => { state.activeLetter = ''; applyFilters(); });
document.querySelectorAll('[data-search-mode]').forEach((button) => button.addEventListener('click', () => setSearchMode(button.dataset.searchMode)));
['typeFilter', 'dialectFilter'].forEach((id) => $(`#${id}`).addEventListener('input', applyFilters));
$('#filterToggle').addEventListener('click', () => { const isHidden = filterDrawer.hidden; filterDrawer.hidden = !isHidden; $('#filterToggle').setAttribute('aria-expanded', String(isHidden)); });
$('#clearFilters').addEventListener('click', () => { searchInput.value = ''; state.activeLetter = ''; $('#typeFilter').value = ''; $('#dialectFilter').value = ''; applyFilters(); });
$('#sortButton').addEventListener('click', () => { state.sortAscending = !state.sortAscending; $('#sortButton').firstChild.textContent = state.sortAscending ? 'A–Z ' : 'Z–A '; applyFilters(); });
$('#favoritesToggle').addEventListener('click', () => { state.favoritesOnly = !state.favoritesOnly; $('#favoritesToggle').classList.toggle('is-active', state.favoritesOnly); applyFilters(); });
$('#modalClose').addEventListener('click', () => closeModal(modalBackdrop));
$('#aboutButton').addEventListener('click', () => { $('#aboutBackdrop').hidden = false; document.body.classList.add('modal-open'); });
$('#aboutClose').addEventListener('click', () => closeModal($('#aboutBackdrop')));
$('#letterNav').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  state.activeLetter = state.activeLetter === button.dataset.letter ? '' : button.dataset.letter;
  searchInput.value = '';
  applyFilters();
  searchInput.focus();
});
$('#datasetButton').addEventListener('click', () => openDatasetChooser());
$('#datasetApply').addEventListener('click', () => {
  const selected = $('input[name="dataset"]:checked')?.value;
  if (selected) loadDataset(selected);
});
[modalBackdrop, $('#aboutBackdrop'), datasetBackdrop].forEach((backdrop) => backdrop.addEventListener('click', (event) => {
  if (event.target === backdrop && (backdrop !== datasetBackdrop || state.all.length)) closeModal(backdrop);
}));
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== searchInput) { event.preventDefault(); searchInput.focus(); }
  if (event.key === 'Escape') {
    closeModal(modalBackdrop);
    closeModal($('#aboutBackdrop'));
    if (state.all.length) closeModal(datasetBackdrop);
  }
});
document.querySelectorAll('[data-query]').forEach((button) => button.addEventListener('click', () => { searchInput.value = button.dataset.query; applyFilters(); searchInput.focus(); }));

function openDatasetChooser() {
  const current = state.dataset || 'detailed';
  $(`input[name="dataset"][value="${current}"]`).checked = true;
  datasetBackdrop.hidden = false;
  document.body.classList.add('modal-open');
}

async function loadDataset(dataset) {
  $('#datasetApply').disabled = true;
  $('#datasetApply').textContent = 'Yükleniyor...';
  try {
    const response = await fetch(datasetFiles[dataset]);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const entries = await response.json();
    state.dataset = dataset;
    localStorage.setItem('dlt-dataset', dataset);
    state.all = entries;
    buildSearchIndex();
    state.filtered = [];
    state.activeLetter = '';
    $('#typeFilter').value = '';
    $('#dialectFilter').value = '';
    state.favoritesOnly = false;
    $('#favoritesToggle').classList.remove('is-active');
    $('#datasetButton').textContent = `Veri seti: ${datasetLabels[dataset]}`;
    $('#heroTotal').textContent = state.all.length.toLocaleString('tr-TR');
    $('#aboutTotal').textContent = state.all.length.toLocaleString('tr-TR');
    $('#aboutTypes').textContent = new Set(state.all.map((entry) => entry.kelime_turu).filter(Boolean)).size.toLocaleString('tr-TR');
    $('#aboutDialects').textContent = new Set(state.all.map((entry) => entry.dil_veya_lehce).filter(Boolean)).size.toLocaleString('tr-TR');
    $('#favoriteCount').textContent = state.favorites.size;
    populateFilters();
    buildLetterNav();
    updateFilterVisibility();
    if (dataset === 'detailed' && !$('#filterToggle').hidden) {
      filterDrawer.hidden = false;
      $('#filterToggle').setAttribute('aria-expanded', 'true');
    }
    loadingState.hidden = true;
    closeModal(datasetBackdrop);
    updateFilterCount();
    render(false);
  } catch (error) {
    loadingState.innerHTML = '<span class="empty-glyph">!</span><h2>Veri yüklenemedi</h2><p>Siteyi yerel bir sunucu üzerinden açın ve veri dosyasının site klasöründe bulunduğunu doğrulayın.</p>';
    console.error(error);
  } finally {
    $('#datasetApply').disabled = false;
    $('#datasetApply').textContent = 'Seçimi uygula';
  }
}

openDatasetChooser();
