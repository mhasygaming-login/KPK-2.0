/**
 * galeri.js - Target Intelligence Dossiers / Trading Cards
 * Cyber-Trading & Financial Intelligence Terminal
 */

let allPelaku = [];

async function loadPelakuGallery() {
  const container = document.getElementById('pelakuGrid');
  const countLabel = document.getElementById('resultCount');
  if (!container) return;

  try {
    const res = await fetch('/data/pelaku.json');
    allPelaku = await res.json();
    renderGallery(allPelaku);
    setupEventListeners();
  } catch (err) {
    console.error('Gagal mengambil data pelaku:', err);
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-[#FF1A40] font-medium font-mono">Gagal memuat basis data intelijen. Silakan segarkan halaman.</p>
      </div>
    `;
  }
}

function renderGallery(data) {
  const container = document.getElementById('pelakuGrid');
  const countLabel = document.getElementById('resultCount');
  if (!container) return;

  if (countLabel) {
    countLabel.textContent = `MENAMPILKAN ${data.length} DARI ${allPelaku.length} BERKAS TARGET INTELIJEN`;
  }

  if (data.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 bg-[#090D16] rounded-2xl border border-slate-800">
        <div class="w-16 h-16 mx-auto mb-3 text-slate-500">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h4 class="text-lg font-bold text-white font-mono">BERKAS DOSSIER TIDAK DITEMUKAN</h4>
        <p class="text-slate-400 text-sm mt-1">Coba gunakan kata kunci pencarian lain atau setel ulang filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = data.map(item => {
    let badgeText = '[STATUS: CONVICTED]';
    let badgeClass = 'bg-[#FF1A40]/15 text-[#FF1A40] border-[#FF1A40]/40 shadow-[0_0_10px_rgba(255,26,64,0.3)]';
    
    if (item.status_hukum.toLowerCase().includes('terdakwa')) {
      badgeText = '[STATUS: DEFENDANT]';
      badgeClass = 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]';
    } else if (item.status_hukum.toLowerCase().includes('tersangka')) {
      badgeText = '[STATUS: SUSPECT]';
      badgeClass = 'bg-amber-500/15 text-amber-400 border-amber-500/40';
    }

    return `
      <div class="cyber-card flex flex-col justify-between p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all duration-300 group shadow-xl relative">
        <div class="corner-bracket-tl"></div>
        <div class="corner-bracket-br"></div>

        <div>
          <!-- Header Card: Dossier Frame & Status Badge -->
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <div class="dossier-frame w-16 h-16 shrink-0 relative overflow-hidden rounded-xl">
                <img 
                  src="${item.foto_url}" 
                  alt="${item.nama}" 
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                  onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'><rect width=\'120\' height=\'120\' fill=\'%230b1120\'/><circle cx=\'60\' cy=\'46\' r=\'22\' fill=\'%231e293b\'/><path d=\'M26 100 C26 76 42 66 60 66 C78 66 94 76 94 100 Z\' fill=\'%231e293b\'/><rect x=\'2\' y=\'2\' width=\'116\' height=\'116\' fill=\'none\' stroke=\'%2300F0FF\' stroke-width=\'1.5\' stroke-dasharray=\'4,4\'/><text x=\'60\' y=\'112\' font-family=\'monospace\' font-size=\'9\' fill=\'%2300F0FF\' text-anchor=\'middle\'>[DOSSIER]</text></svg>'"
                />
              </div>
              <div>
                <h3 class="font-bold text-base text-white group-hover:text-[#00F0FF] transition-colors leading-tight font-display">${item.nama}</h3>
                <span class="text-xs font-semibold text-slate-400 block mt-0.5">Alias: ${item.alias}</span>
                <div class="text-xs text-[#00F0FF]/90 font-mono mt-0.5">${item.jabatan}</div>
              </div>
            </div>
            <span class="text-[10px] font-mono font-bold px-2 py-1 rounded border uppercase tracking-wider shrink-0 ${badgeClass}">
              ${badgeText}
            </span>
          </div>

          <!-- Instansi & Kasus -->
          <div class="bg-[#050811] p-3 rounded-xl border border-slate-800/80 mb-4 font-mono">
            <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span class="font-bold text-[#00F0FF]">SEKTOR: ${item.instansi}</span>
              <span>TA: ${item.tahun_penindakan}</span>
            </div>
            <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
              <strong class="text-white">Kasus:</strong> ${item.kasus}
            </p>
          </div>
        </div>

        <!-- Footer Card: Large Neon Red Monospace Loss Figure -->
        <div class="pt-3 border-t border-[#00F0FF]/20 flex items-center justify-between mt-2">
          <div>
            <span class="text-[10px] uppercase tracking-wider text-slate-400 font-bold block font-mono">
              TOTAL ESTIMASI KERUGIAN
            </span>
            <span class="text-base sm:text-lg text-[#FF1A40] font-black font-mono glow-crimson">
              ${item.nominal_formatted}
            </span>
          </div>
          <button 
            onclick="openPelakuDetail('${item.id}')"
            class="px-3.5 py-1.5 text-xs font-mono font-bold text-[#00F0FF] hover:text-[#050811] bg-[#00F0FF]/15 hover:bg-[#00F0FF] border border-[#00F0FF]/40 rounded-xl transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            DOSSIER &rarr;
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchPelaku');
  const sortSelect = document.getElementById('sortPelaku');
  const sektorFilter = document.getElementById('filterSektor');
  const btnSortAmount = document.getElementById('btnSortAmount');
  const btnSortYear = document.getElementById('btnSortYear');
  const btnSortCategory = document.getElementById('btnSortCategory');

  function updateQuickSortButtons(currentVal) {
    const isAmount = currentVal === 'highest' || currentVal === 'lowest';
    const isYear = currentVal === 'newest' || currentVal === 'oldest';
    const isCategory = currentVal === 'category_asc' || currentVal === 'category_desc';

    if (btnSortAmount) {
      btnSortAmount.className = isAmount
        ? 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all bg-[#FF1A40]/25 text-[#FF1A40] border border-[#FF1A40]/60 shadow-[0_0_10px_rgba(255,26,64,0.3)] cursor-pointer'
        : 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white border border-transparent cursor-pointer';
      btnSortAmount.innerHTML = currentVal === 'lowest' ? '💰 Corruption Amount (↑)' : '💰 Corruption Amount (↓)';
    }

    if (btnSortYear) {
      btnSortYear.className = isYear
        ? 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/60 shadow-[0_0_10px_rgba(0,240,255,0.3)] cursor-pointer'
        : 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white border border-transparent cursor-pointer';
      btnSortYear.innerHTML = currentVal === 'oldest' ? '📅 Year (↑ 2020)' : '📅 Year (↓ 2024)';
    }

    if (btnSortCategory) {
      btnSortCategory.className = isCategory
        ? 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all bg-[#00FF88]/25 text-[#00FF88] border border-[#00FF88]/60 shadow-[0_0_10px_rgba(0,255,136,0.3)] cursor-pointer'
        : 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white border border-transparent cursor-pointer';
      btnSortCategory.innerHTML = currentVal === 'category_desc' ? '🏷️ Case Category (Z-A)' : '🏷️ Case Category (A-Z)';
    }
  }

  function applyFilters() {
    let query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let sortVal = sortSelect ? sortSelect.value : 'highest';
    let sectorVal = sektorFilter ? sektorFilter.value : 'all';

    let result = allPelaku.filter(item => {
      const matchSearch = item.nama.toLowerCase().includes(query) ||
                          item.alias.toLowerCase().includes(query) ||
                          item.jabatan.toLowerCase().includes(query) ||
                          item.kasus.toLowerCase().includes(query);
      const matchSector = sectorVal === 'all' || item.instansi === sectorVal;
      return matchSearch && matchSector;
    });

    if (sortVal === 'highest') {
      result.sort((a, b) => b.nominal_kerugian - a.nominal_kerugian);
    } else if (sortVal === 'lowest') {
      result.sort((a, b) => a.nominal_kerugian - b.nominal_kerugian);
    } else if (sortVal === 'newest') {
      result.sort((a, b) => b.tahun_penindakan - a.tahun_penindakan);
    } else if (sortVal === 'oldest') {
      result.sort((a, b) => a.tahun_penindakan - b.tahun_penindakan);
    } else if (sortVal === 'category_asc') {
      result.sort((a, b) => a.instansi.localeCompare(b.instansi) || a.kasus.localeCompare(b.kasus));
    } else if (sortVal === 'category_desc') {
      result.sort((a, b) => b.instansi.localeCompare(a.instansi) || b.kasus.localeCompare(a.kasus));
    } else if (sortVal === 'name') {
      result.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    updateQuickSortButtons(sortVal);
    renderGallery(result);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
  if (sektorFilter) sektorFilter.addEventListener('change', applyFilters);

  if (btnSortAmount && sortSelect) {
    btnSortAmount.addEventListener('click', () => {
      sortSelect.value = sortSelect.value === 'highest' ? 'lowest' : 'highest';
      applyFilters();
    });
  }

  if (btnSortYear && sortSelect) {
    btnSortYear.addEventListener('click', () => {
      sortSelect.value = sortSelect.value === 'newest' ? 'oldest' : 'newest';
      applyFilters();
    });
  }

  if (btnSortCategory && sortSelect) {
    btnSortCategory.addEventListener('click', () => {
      sortSelect.value = sortSelect.value === 'category_asc' ? 'category_desc' : 'category_asc';
      applyFilters();
    });
  }
}

function openPelakuDetail(id) {
  const item = allPelaku.find(p => p.id === id);
  if (!item) return;

  const modal = document.getElementById('pelakuModal');
  const modalBody = document.getElementById('modalContent');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6 items-start font-mono">
      <div class="dossier-frame w-24 h-24 shrink-0 relative overflow-hidden rounded-xl">
        <img src="${item.foto_url}" alt="${item.nama}" referrerpolicy="no-referrer" class="w-full h-full object-cover" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'><rect width=\'120\' height=\'120\' fill=\'%230b1120\'/><circle cx=\'60\' cy=\'46\' r=\'22\' fill=\'%231e293b\'/><path d=\'M26 100 C26 76 42 66 60 66 C78 66 94 76 94 100 Z\' fill=\'%231e293b\'/><rect x=\'2\' y=\'2\' width=\'116\' height=\'116\' fill=\'none\' stroke=\'%2300F0FF\' stroke-width=\'1.5\' stroke-dasharray=\'4,4\'/><text x=\'60\' y=\'112\' font-family=\'monospace\' font-size=\'9\' fill=\'%2300F0FF\' text-anchor=\'middle\'>[DOSSIER]</text></svg>'">
      </div>
      <div class="flex-1">
        <div class="text-[10px] text-[#00F0FF] tracking-wider mb-1 flex items-center gap-1.5">
          <span class="led-indicator led-red"></span>
          TARGET DOSSIER // ${item.id}
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <h3 class="text-xl font-black text-white font-display">${item.nama}</h3>
          <span class="text-sm font-bold text-slate-400 font-mono">(${item.alias})</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#FF1A40]/15 text-[#FF1A40] border border-[#FF1A40]/40 shadow-[0_0_10px_rgba(255,26,64,0.3)]">${item.status_hukum}</span>
        </div>
        <p class="text-sm font-semibold text-[#00F0FF] mb-3">${item.jabatan} &bull; <span class="text-slate-300">${item.instansi}</span></p>
        
        <div class="bg-[#050811] border border-[#FF1A40]/40 p-4 rounded-xl mb-4 shadow-[0_0_20px_rgba(255,26,64,0.2)]">
          <div class="text-xs font-bold uppercase tracking-wider text-rose-300 font-mono">TOTAL ESTIMASI KERUGIAN KEUANGAN NEGARA</div>
          <div class="text-2xl sm:text-3xl font-black text-[#FF1A40] font-mono mt-0.5 glow-crimson">${item.nominal_formatted}</div>
          <div class="text-xs text-slate-400 mt-1 font-mono">ID Perkara: ${item.id} &bull; Tahun Penindakan: ${item.tahun_penindakan}</div>
        </div>

        <div class="space-y-3 text-sm text-slate-300">
          <p class="font-sans leading-relaxed"><strong class="text-white font-mono">Uraian Kasus:</strong> ${item.kasus}</p>
          <p class="text-xs"><strong class="text-white">Rujukan Berita Resmi:</strong> <a href="${item.sumber_berita}" target="_blank" rel="noreferrer" class="text-[#00F0FF] underline font-bold hover:text-white">Publikasi Siaran Pers KPK RI &rarr;</a></p>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closePelakuModal() {
  const modal = document.getElementById('pelakuModal');
  if (modal) modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', loadPelakuGallery);
