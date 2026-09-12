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
  Terminal as TerminalIcon
} from 'lucide-react';
import { Pelaku, SortOption } from '../types.ts';

interface GalleryViewProps {
  pelakuList: Pelaku[];
  onSelectPelaku: (pelaku: Pelaku) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ pelakuList, onSelectPelaku }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('highest');

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

    if (sortBy === 'highest') {
      result.sort((a, b) => b.nominal_kerugian - a.nominal_kerugian);
    } else if (sortBy === 'lowest') {
      result.sort((a, b) => a.nominal_kerugian - b.nominal_kerugian);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.tahun_penindakan - a.tahun_penindakan);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    return result;
  }, [pelakuList, searchQuery, selectedSector, selectedStatus, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSector('all');
    setSelectedStatus('all');
    setSortBy('highest');
  };

  return (
    <div id="galeri" className="space-y-8 pb-12 pt-4">
      
      {/* 1. Cyber Intelligence Banner */}
      <div className="cyber-panel p-6 sm:p-8 rounded-2xl border border-[#00F0FF]/30 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050811] border border-[#00F0FF]/30 text-xs font-mono font-bold text-[#00F0FF] mb-3">
            <Crosshair className="w-3.5 h-3.5 text-[#00F0FF]" />
            TARGET INTELLIGENCE DIRECTORY // DOSSIER TIPIKOR
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
            Galeri Penindakan Kasus & Target Intelligence Dossiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-sans">
            Akses publik terhadap profil pelaku tindak pidana korupsi, status vonis hukuman yang dijatuhkan majelis hakim, rincian perkara, serta nilai nominal kerugian negara.
          </p>
        </div>

        <a
          href="/galeri.html"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-[#050811] border border-[#00F0FF]/40 text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] shrink-0"
        >
          <span>FULL DOSSIER (HTML)</span>
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

          {/* Sorting */}
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-[#00F0FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#050811] border border-[#00F0FF]/25 focus:border-[#00F0FF] text-white text-xs font-mono appearance-none transition-all outline-none cursor-pointer"
            >
              <option value="highest">Kerugian Tertinggi (Desc)</option>
              <option value="lowest">Kerugian Terendah (Asc)</option>
              <option value="newest">Tahun Terbaru (2024-2020)</option>
              <option value="name">Nama Pelaku (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Status Count & Reset Option */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
          <div className="text-slate-400">
            <span>
              Menampilkan <strong className="text-[#00F0FF]">{filteredAndSorted.length}</strong> dari {pelakuList.length} berkas intelijen
            </span>
            {(searchQuery || selectedSector !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={resetFilters}
                className="text-[#FF1A40] hover:underline font-semibold ml-3 cursor-pointer inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filter
              </button>
            )}
          </div>
          <span className="text-slate-400 hidden sm:flex items-center gap-1.5">
            <span className="led-indicator led-green"></span>
            Terverifikasi Sistem Informasi Penelusuran Perkara (SIPP)
          </span>
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

      {/* 3. Target Intelligence Dossiers Grid (Trading Cards Style) */}
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
              className="cyber-card flex flex-col justify-between p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all duration-300 group shadow-lg relative"
            >
              <div className="corner-bracket-tl"></div>
              <div className="corner-bracket-br"></div>

              <div>
                {/* Header Card: Target Photo Frame with Scanline & Status Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="dossier-frame w-16 h-16 shrink-0 relative">
                      <div className="scanline-beam"></div>
                      <img
                        src={item.foto_url}
                        alt={item.nama}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#00F0FF] transition-colors leading-tight font-display">
                        {item.nama}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400 block mt-0.5">Alias: {item.alias}</span>
                      <div className="text-xs text-[#00F0FF]/90 font-mono mt-0.5">{item.jabatan}</div>
                    </div>
                  </div>
                  
                  {/* Glowing Status Badge */}
                  <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border uppercase tracking-wider shrink-0 ${badgeClass}`}>
                    {badgeStatus}
                  </span>
                </div>

                {/* Sektor & Ringkasan Perkara */}
                <div className="bg-[#050811] p-3 rounded-xl border border-slate-800/80 mb-4 font-mono">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="text-[#00F0FF] font-bold">SEKTOR: {item.instansi}</span>
                    <span>TA: {item.tahun_penindakan}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                    <strong className="text-white">Kasus:</strong> {item.kasus}
                  </p>
                </div>
              </div>

              {/* Footer Card: Large Neon Red Monospace Loss Figure */}
              <div className="pt-3 border-t border-[#00F0FF]/20 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                    TOTAL ESTIMASI KERUGIAN
                  </span>
                  <span className="text-base sm:text-lg text-[#FF1A40] font-black font-mono glow-crimson">
                    {item.nominal_formatted}
                  </span>
                </div>

                <button
                  onClick={() => onSelectPelaku(item)}
                  className="px-3.5 py-1.5 text-xs font-mono font-bold text-[#00F0FF] hover:text-[#050811] bg-[#00F0FF]/15 hover:bg-[#00F0FF] border border-[#00F0FF]/40 rounded-xl transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                >
                  DOSSIER &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
