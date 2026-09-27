import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ShieldAlert, 
  Eye, 
  UserCheck, 
  Scale,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Crosshair,
  LayoutGrid,
  Layers,
  Terminal as TerminalIcon,
  Calendar,
  Coins,
  Tag,
  ArrowDown,
  ArrowUp,
  SlidersHorizontal
} from 'lucide-react';
import { Pelaku, SortOption } from '../types.ts';
import { CircularDossiers, Dossier, DossierStatus } from './ui/circular-dossiers.tsx';

interface GalleryViewProps {
  pelakuList: Pelaku[];
  onSelectPelaku: (pelaku: Pelaku) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ pelakuList, onSelectPelaku }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('amount_desc');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  // Filter & Sort computation
  const filteredAndSorted = useMemo(() => {
    let result = pelakuList.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = 
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.alias.toLowerCase().includes(q) ||
        item.jabatan.toLowerCase().includes(q) ||
        item.kasus.toLowerCase().includes(q);

      const matchSector = selectedSector === 'all' || item.instansi === selectedSector;
      const matchStatus = 
        selectedStatus === 'all' || 
        (selectedStatus === 'terpidana' && item.status_hukum.toLowerCase().includes('terpidana')) ||
        (selectedStatus === 'tersangka' && item.status_hukum.toLowerCase().includes('tersangka')) ||
        (selectedStatus === 'terdakwa' && item.status_hukum.toLowerCase().includes('terdakwa'));

      return matchSearch && matchSector && matchStatus;
    });

    if (sortBy === 'amount_desc' || sortBy === 'highest') {
      result.sort((a, b) => b.nominal_kerugian - a.nominal_kerugian);
    } else if (sortBy === 'amount_asc' || sortBy === 'lowest') {
      result.sort((a, b) => a.nominal_kerugian - b.nominal_kerugian);
    } else if (sortBy === 'year_desc' || sortBy === 'newest') {
      result.sort((a, b) => b.tahun_penindakan - a.tahun_penindakan);
    } else if (sortBy === 'year_asc') {
      result.sort((a, b) => a.tahun_penindakan - b.tahun_penindakan);
    } else if (sortBy === 'category_asc') {
      result.sort((a, b) => a.instansi.localeCompare(b.instansi) || a.kasus.localeCompare(b.kasus));
    } else if (sortBy === 'category_desc') {
      result.sort((a, b) => b.instansi.localeCompare(a.instansi) || b.kasus.localeCompare(a.kasus));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    return result;
  }, [pelakuList, searchQuery, selectedSector, selectedStatus, sortBy]);

  // Map to CircularDossiers format
  const dossiersList: Dossier[] = useMemo(() => {
    return filteredAndSorted.map((item) => {
      let status: DossierStatus = 'TERPIDANA';
      const statusLower = item.status_hukum.toLowerCase();
      if (statusLower.includes('terdakwa')) {
        status = 'TERDAKWA';
      } else if (statusLower.includes('tersangka')) {
        status = 'TERSANGKA';
      }

      return {
        id: item.id,
        name: item.nama,
        alias: item.alias,
        position: item.jabatan,
        status,
        sector: item.instansi,
        year: item.tahun_penindakan,
        caseSummary: item.kasus,
        estimatedLoss: item.nominal_formatted,
        photo: item.foto_url,
        originalData: item,
      };
    });
  }, [filteredAndSorted]);

  const handleOpenDossier = (dossier: Dossier) => {
    if (dossier.originalData) {
      onSelectPelaku(dossier.originalData as Pelaku);
    } else {
      const found = pelakuList.find((p) => p.id === dossier.id);
      if (found) onSelectPelaku(found);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSector('all');
    setSelectedStatus('all');
    setSortBy('amount_desc');
  };

  const isAmountActive = sortBy === 'amount_desc' || sortBy === 'amount_asc' || sortBy === 'highest' || sortBy === 'lowest';
  const isYearActive = sortBy === 'year_desc' || sortBy === 'year_asc' || sortBy === 'newest';
  const isCategoryActive = sortBy === 'category_asc' || sortBy === 'category_desc';

  const getSortLabel = (sort: SortOption): string => {
    switch (sort) {
      case 'amount_desc':
      case 'highest':
        return 'Kerugian: Tertinggi (High → Low)';
      case 'amount_asc':
      case 'lowest':
        return 'Kerugian: Terendah (Low → High)';
      case 'year_desc':
      case 'newest':
        return 'Tahun: Terbaru (2024 → 2020)';
      case 'year_asc':
        return 'Tahun: Terlama (2020 → 2024)';
      case 'category_asc':
        return 'Kategori Kasus: A → Z';
      case 'category_desc':
        return 'Kategori Kasus: Z → A';
      case 'name':
        return 'Nama Pelaku: A → Z';
      default:
        return 'Custom';
    }
  };

  return (
    <div id="galeri" className="space-y-8 pb-12 pt-4">
      
      {/* 1. Cyber Intelligence Banner */}
      <div className="cyber-panel p-5 sm:p-7 rounded-2xl border border-[#00F0FF]/30 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050811] border border-[#00F0FF]/30 text-xs font-mono font-bold text-[#00F0FF] mb-2.5">
            <Crosshair className="w-3.5 h-3.5 text-[#00F0FF]" />
            TARGET INTELLIGENCE DIRECTORY
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white font-display">
            Galeri Penindakan Kasus Korupsi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-sans">
            Akses publik terhadap profil pelaku tindak pidana korupsi, status vonis hukuman, rincian perkara, dan nilai kerugian negara.
          </p>
        </div>

        <a
          href="/galeri.html"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-[#050811] border border-[#00F0FF]/40 text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] shrink-0"
        >
          <span>FULL DOSSIER</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 2. Cyber Search & Filter Toolbar */}
      <div className="glass-panel p-5 rounded-2xl border border-[#00F0FF]/20 shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#00F0FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama, alias, atau kasus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050811] border border-[#00F0FF]/25 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] text-white text-xs font-mono placeholder:text-slate-500 transition-all outline-none"
            />
          </div>

          {/* Sektor Filter */}
          <div className="relative">
            <Filter className="w-4 h-4 text-[#00F0FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#050811] border border-[#00F0FF]/25 focus:border-[#00F0FF] text-white text-xs font-mono appearance-none transition-all outline-none cursor-pointer"
            >
              <option value="all">Semua Sektor Instansi</option>
              <option value="Swasta">Sektor Swasta / Korporasi</option>
              <option value="BUMN">BUMN / Perusahaan Negara</option>
              <option value="Kementerian">Kementerian / Lembaga</option>
              <option value="Pemerintah Daerah">Pemerintah Daerah (Pemda)</option>
            </select>
          </div>

          {/* Status Hukum Filter */}
          <div className="relative">
            <UserCheck className="w-4 h-4 text-[#00F0FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#050811] border border-[#00F0FF]/25 focus:border-[#00F0FF] text-white text-xs font-mono appearance-none transition-all outline-none cursor-pointer"
            >
              <option value="all">Semua Status Perkara</option>
              <option value="terpidana">Vonis Inkracht (Terpidana)</option>
              <option value="terdakwa">Proses Sidang (Terdakwa)</option>
              <option value="tersangka">Penyidikan (Tersangka)</option>
            </select>
          </div>

          {/* Sorting Dropdown (Year, Case Category, Corruption Amount, Name) */}
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-[#00F0FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="gallerySortDropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#050811] border border-[#00F0FF]/25 focus:border-[#00F0FF] text-white text-xs font-mono appearance-none transition-all outline-none cursor-pointer"
            >
              <optgroup label="💰 Nilai Kerugian / Corruption Amount" className="bg-[#090D16] text-slate-300 font-bold">
                <option value="amount_desc" className="text-white">Corruption Amount: Tertinggi (High → Low)</option>
                <option value="amount_asc" className="text-white">Corruption Amount: Terendah (Low → High)</option>
              </optgroup>
              <optgroup label="📅 Tahun Penindakan / Year" className="bg-[#090D16] text-slate-300 font-bold">
                <option value="year_desc" className="text-white">Year: Terbaru (2024 → 2020)</option>
                <option value="year_asc" className="text-white">Year: Terlama (2020 → 2024)</option>
              </optgroup>
              <optgroup label="🏷️ Kategori Kasus / Case Category" className="bg-[#090D16] text-slate-300 font-bold">
                <option value="category_asc" className="text-white">Case Category: Sektor & Kasus (A → Z)</option>
                <option value="category_desc" className="text-white">Case Category: Sektor & Kasus (Z → A)</option>
              </optgroup>
              <optgroup label="👤 Nama / Offender Name" className="bg-[#090D16] text-slate-300 font-bold">
                <option value="name" className="text-white">Nama Pelaku: Alfabetis (A → Z)</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* 3. Quick Sort Button Group (Corruption Amount, Year, Case Category) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>URUTKAN CEPAT:</span>
            </span>

            <div className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#050811] border border-[#00F0FF]/25 w-full sm:w-auto">
              {/* Button: Corruption Amount */}
              <button
                type="button"
                onClick={() => {
                  if (sortBy === 'amount_desc' || sortBy === 'highest') {
                    setSortBy('amount_asc');
                  } else {
                    setSortBy('amount_desc');
                  }
                }}
                className={`flex-1 sm:flex-initial justify-center px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isAmountActive
                    ? 'bg-[#FF1A40]/25 text-[#FF1A40] border border-[#FF1A40]/70 shadow-[0_0_12px_rgba(255,26,64,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
                title="Urutkan berdasarkan Nilai Kerugian Korupsi (Klik untuk beralih Tertinggi / Terendah)"
              >
                <Coins className="w-3.5 h-3.5 shrink-0" />
                <span>Corruption Amount</span>
                {isAmountActive && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF1A40]/30 text-[#FF1A40] border border-[#FF1A40]/50 font-mono">
                    {sortBy === 'amount_asc' || sortBy === 'lowest' ? '↑ Low' : '↓ High'}
                  </span>
                )}
              </button>

              {/* Button: Year */}
              <button
                type="button"
                onClick={() => {
                  if (sortBy === 'year_desc' || sortBy === 'newest') {
                    setSortBy('year_asc');
                  } else {
                    setSortBy('year_desc');
                  }
                }}
                className={`flex-1 sm:flex-initial justify-center px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isYearActive
                    ? 'bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/70 shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
                title="Urutkan berdasarkan Tahun Penindakan (Klik untuk beralih Terbaru / Terlama)"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Year</span>
                {isYearActive && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00F0FF]/30 text-[#00F0FF] border border-[#00F0FF]/50 font-mono">
                    {sortBy === 'year_asc' ? '↑ 2020' : '↓ 2024'}
                  </span>
                )}
              </button>

              {/* Button: Case Category */}
              <button
                type="button"
                onClick={() => {
                  if (sortBy === 'category_asc') {
                    setSortBy('category_desc');
                  } else {
                    setSortBy('category_asc');
                  }
                }}
                className={`flex-1 sm:flex-initial justify-center px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isCategoryActive
                    ? 'bg-[#00FF88]/25 text-[#00FF88] border border-[#00FF88]/70 shadow-[0_0_12px_rgba(0,255,136,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
                title="Urutkan berdasarkan Kategori Kasus / Sektor Instansi (Klik untuk beralih A-Z / Z-A)"
              >
                <Tag className="w-3.5 h-3.5 shrink-0" />
                <span>Case Category</span>
                {isCategoryActive && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00FF88]/30 text-[#00FF88] border border-[#00FF88]/50 font-mono">
                    {sortBy === 'category_desc' ? 'Z → A' : 'A → Z'}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Sort Label Badge */}
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
            <span>Aktif:</span>
            <span className="text-[#00F0FF] font-bold px-2.5 py-1 rounded-lg bg-[#050811] border border-[#00F0FF]/30 shadow-inner">
              {getSortLabel(sortBy)}
            </span>
          </div>
        </div>

        {/* Status Count, Reset Option, and View Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
          <div className="text-slate-400 flex items-center flex-wrap gap-2">
            <span>
              Menampilkan <strong className="text-[#00F0FF]">{filteredAndSorted.length}</strong> dari {pelakuList.length} berkas intelijen
            </span>
            {(searchQuery || selectedSector !== 'all' || selectedStatus !== 'all' || sortBy !== 'amount_desc') && (
              <button
                onClick={resetFilters}
                className="text-[#FF1A40] hover:underline font-semibold ml-2 cursor-pointer inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* View Mode Switcher: 3D Carousel vs Grid */}
            <div className="bg-[#050811] p-1 rounded-lg border border-[#00F0FF]/25 flex items-center gap-1">
              <button
                onClick={() => setViewMode('carousel')}
                title="Tampilan 3D Circular Carousel"
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'carousel'
                    ? 'bg-[#00F0FF] text-[#050811] shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" /> 3D CAROUSEL
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Tampilan Grid Matrix Klasik"
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-[#00F0FF] text-[#050811] shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3 h-3" /> GRID MATRIX
              </button>
            </div>

            <span className="text-slate-400 hidden lg:flex items-center gap-1.5">
              <span className="led-indicator led-green"></span>
              SIPP Terverifikasi
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredAndSorted.length === 0 && (
        <div className="p-12 text-center bg-[#090D16] rounded-2xl border border-slate-800 shadow-xl font-mono">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#050811] border border-slate-800 flex items-center justify-center text-slate-400 mb-4">
            <Search className="w-8 h-8 text-[#00F0FF]" />
          </div>
          <h3 className="text-lg font-bold text-white">Tidak Ada Kasus Yang Sesuai</h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            Tidak ditemukan berkas perkara dengan kriteria pencarian & filter saat ini.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-[#050811] border border-[#00F0FF]/30 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* 3. Target Intelligence Dossiers Showcase (Circular 3D Carousel or Grid Matrix) */}
      {filteredAndSorted.length > 0 && viewMode === 'carousel' && (
        <CircularDossiers
          dossiers={dossiersList}
          onOpenDossier={handleOpenDossier}
        />
      )}

      {filteredAndSorted.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((item) => {
            let badgeStatus = '[STATUS: TERPIDANA]';
            let badgeClass = 'bg-[#FF1A40]/15 text-[#FF1A40] border-[#FF1A40]/40 shadow-[0_0_10px_rgba(255,26,64,0.3)]';
            
            if (item.status_hukum.toLowerCase().includes('terdakwa')) {
              badgeStatus = '[STATUS: TERDAKWA]';
              badgeClass = 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]';
            } else if (item.status_hukum.toLowerCase().includes('tersangka')) {
              badgeStatus = '[STATUS: TERSANGKA]';
              badgeClass = 'bg-amber-500/15 text-amber-400 border-amber-500/40';
            }

            return (
              <div
                key={item.id}
                className="cyber-card flex flex-col justify-between p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all duration-300 group shadow-lg relative h-full"
              >
                <div className="corner-bracket-tl"></div>
                <div className="corner-bracket-br"></div>

                <div className="flex flex-col flex-1">
                  {/* Header Card: Target Photo Frame with Scanline & Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="dossier-frame w-14 h-14 sm:w-16 sm:h-16 shrink-0 relative overflow-hidden rounded-xl">
                        <img
                          src={item.foto_url}
                          alt={item.nama}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><rect width='120' height='120' fill='%230b1120'/><circle cx='60' cy='46' r='22' fill='%231e293b'/><path d='M26 100 C26 76 42 66 60 66 C78 66 94 76 94 100 Z' fill='%231e293b'/><rect x='2' y='2' width='116' height='116' fill='none' stroke='%2300F0FF' stroke-width='1.5' stroke-dasharray='4,4'/><text x='60' y='112' font-family='monospace' font-size='9' fill='%2300F0FF' text-anchor='middle'>[DOSSIER]</text></svg>";
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#00F0FF] transition-colors leading-tight font-display truncate">
                          {item.nama}
                        </h3>
                        <span className="text-xs font-semibold text-slate-400 block mt-0.5 truncate">Alias: {item.alias}</span>
                        <div className="text-xs text-[#00F0FF]/90 font-mono mt-0.5 truncate">{item.jabatan}</div>
                      </div>
                    </div>
                    
                    {/* Glowing Status Badge */}
                    <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border uppercase tracking-wider shrink-0 ${badgeClass}`}>
                      {badgeStatus}
                    </span>
                  </div>

                  {/* Sektor & Ringkasan Perkara */}
                  <div className="bg-[#050811] p-3 rounded-xl border border-slate-800/80 mb-4 font-mono flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 gap-2">
                      <span className="text-[#00F0FF] font-bold truncate">SEKTOR: {item.instansi}</span>
                      <span className="shrink-0">TA: {item.tahun_penindakan}</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans min-h-[3.25rem]">
                      <strong className="text-white">Kasus:</strong> {item.kasus}
                    </p>
                  </div>
                </div>

                {/* Footer Card: Large Neon Red Monospace Loss Figure */}
                <div className="pt-3 border-t border-[#00F0FF]/20 flex items-center justify-between mt-auto">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block truncate">
                      TOTAL ESTIMASI KERUGIAN
                    </span>
                    <span className="text-base sm:text-lg text-[#FF1A40] font-black font-mono glow-crimson block truncate">
                      {item.nominal_formatted}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectPelaku(item)}
                    className="px-3.5 py-2 text-xs font-mono font-bold text-[#00F0FF] hover:text-[#050811] bg-[#00F0FF]/15 hover:bg-[#00F0FF] border border-[#00F0FF]/40 rounded-xl transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)] shrink-0"
                  >
                    DOSSIER &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

