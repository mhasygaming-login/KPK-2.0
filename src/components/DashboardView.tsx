import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Coins, 
  Building2, 
  GraduationCap, 
  HeartPulse, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  ArrowUpRight, 
  ExternalLink,
  Lock,
  Activity,
  Sparkles,
  Layers,
  Crosshair,
  Search,
  X,
  RotateCcw,
  SlidersHorizontal,
  FileSearch
} from 'lucide-react';
import { Pelaku, StatistikData, ActiveTab } from '../types.ts';
import { searchPelakuFuzzy } from '../lib/fuzzySearch.ts';

interface DashboardViewProps {
  pelakuList: Pelaku[];
  statistik: StatistikData | null;
  onNavigate: (tab: ActiveTab) => void;
  onSelectPelaku: (pelaku: Pelaku) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  pelakuList,
  statistik,
  onNavigate,
  onSelectPelaku,
}) => {
  const ringkasan = statistik?.ringkasan_nasional;
  const dampak = statistik?.dampak_sosial_ekivalen;

  // Smooth Counter Animation for stats
  const [tersangkaCount, setTersangkaCount] = useState(0);
  const [kasusSelesaiCount, setKasusSelesaiCount] = useState(0);

  // Real-time fuzzy search & status filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'terpidana' | 'tersangka' | 'terdakwa'>('all');
  const [showAllResults, setShowAllResults] = useState(false);

  // Optimized fuzzy search computation
  const filteredPelakuList = useMemo(() => {
    return searchPelakuFuzzy(pelakuList, searchQuery, statusFilter);
  }, [pelakuList, searchQuery, statusFilter]);

  // Determine displayed items: show all when actively searching or filter is applied, else top 3 (expandable)
  const isFiltered = searchQuery.trim().length > 0 || statusFilter !== 'all';
  const displayedPelaku = isFiltered || showAllResults
    ? filteredPelakuList 
    : filteredPelakuList.slice(0, 3);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setShowAllResults(false);
  };

  useEffect(() => {
    const targetTersangka = ringkasan?.total_tersangka || 1428;
    const targetKasus = ringkasan?.total_kasus_selesai || 1284;
    
    let frame = 0;
    const totalFrames = 25;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setTersangkaCount(Math.floor(targetTersangka * progress));
      setKasusSelesaiCount(Math.floor(targetKasus * progress));
      if (frame >= totalFrames) {
        clearInterval(interval);
        setTersangkaCount(targetTersangka);
        setKasusSelesaiCount(targetKasus);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [ringkasan]);

  return (
    <div className="space-y-10 sm:space-y-12 pb-12">
      
      {/* ==========================================================================
          1. HERO SECTION (Figma AutoLayout Stack, Bold Copywriting, Direct CTAs)
          ========================================================================== */}
      <section 
        id="heroSection" 
        className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#090D16]/95 border border-[#00F0FF]/30 p-6 sm:p-10 lg:p-12 cyber-card"
      >
        {/* Corner Brackets */}
        <div className="corner-bracket-tl"></div>
        <div className="corner-bracket-br"></div>

        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF1A40]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* AutoLayout Vertical Stack (flex-col, gap-6) */}
        <div className="relative z-10 max-w-4xl flex flex-col items-start gap-5 sm:gap-6">
          
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050811] border border-[#00F0FF]/35 text-xs font-mono font-bold text-[#00F0FF] tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] animate-pulse"></span>
            <span>TRANSPARANSI TERVERIFIKASI BPK RI</span>
          </div>

          {/* Bold Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white font-display">
            Transparansi Penindakan. <br className="hidden sm:inline" />
            <span className="text-[#00F0FF] glow-cyan">Pemulihan Aset Nyata.</span>
          </h1>
          
          {/* Minimalist 1-2 Sentences On-The-Point Copy */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
            Pantau rekam jejak perkara tindak pidana korupsi nasional, status vonis inkracht majelis hakim, dan audit pemulihan aset sitaan negara secara real-time.
          </p>

          {/* Call to Action Button Group (AutoLayout Flex-Row, Gap-4) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-2 font-mono w-full sm:w-auto">
            <button
              onClick={() => onNavigate('analisis')}
              className="px-6 py-3 rounded-xl bg-[#00F0FF] hover:bg-[#33f3ff] text-[#050811] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Activity className="w-4 h-4 shrink-0" />
              <span>TRADING TERMINAL</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={() => onNavigate('galeri')}
              className="px-5 py-3 rounded-xl bg-[#090D16] hover:bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.15)]"
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>DOSSIER PELAKU</span>
            </button>

            <button
              onClick={() => onNavigate('edukasi')}
              className="px-5 py-3 rounded-xl bg-[#090D16] hover:bg-[#FF1A40]/15 text-[#FF1A40] border border-[#FF1A40]/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-[#FF1A40] shadow-[0_0_12px_rgba(255,26,64,0.15)]"
            >
              <Lock className="w-4 h-4 shrink-0" />
              <span>PENGADUAN KWS</span>
            </button>
          </div>

        </div>
      </section>

      {/* ==========================================================================
          2. BENTO GRID: RECOVERY METRICS & SIPP INTEGRATION (AutoLayout Grid)
          ========================================================================== */}
      <section id="bentoMatrix" className="space-y-4">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#00F0FF] uppercase tracking-widest block">
              // ARCHITECTURE MATRIX
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Audit Terbuka Berbasis Bukti
            </h2>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050811] border border-slate-800 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00FF88]" />
            Audit Terverifikasi BPK & BPKP
          </span>
        </div>

        {/* 12-Column Responsive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Asset Recovery & Total Kerugian (Span 8) */}
          <div className="lg:col-span-8 bento-card-surface p-6 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden">
            <div>
              {/* Card Top: Icon & Live Badge */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#00FF88]/15 border border-[#00FF88]/40 text-[#00FF88] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,136,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse"></span>
                  RECOVERY RATE: {ringkasan?.tingkat_pemulihan_aset_persen || '9,52'}%
                </span>
              </div>

              {/* Headline & 1-Sentence Description */}
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Pemulihan Aset Negara (Asset Recovery)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-2xl font-sans leading-relaxed">
                Akumulasi barang rampasan, sita eksekusi, dan uang pengganti perkara tindak pidana korupsi yang berhasil disetor kembali ke kas negara.
              </p>
            </div>

            {/* Split Metrics: Kerugian vs Disita */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 font-mono">
              <div className="p-4 rounded-xl bg-[#050811]/90 border border-[#FF1A40]/30 shadow-inner">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  TOTAL ESTIMASI KERUGIAN
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#FF1A40] glow-crimson block mt-1">
                  {ringkasan?.total_kerugian_formatted || 'Rp 403,17 Triliun'}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  144 perkara tipikor terdata
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#050811]/90 border border-[#00F0FF]/30 shadow-inner">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  ASET RAMPASAN DIKEMBALIKAN
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#00FF88] glow-emerald block mt-1">
                  {ringkasan?.total_aset_disita_formatted || 'Rp 38,40 Triliun'}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#00FF88]" />
                  9,52% rasio penyelamatan
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: SIPP & MA Synchronized Tracker (Span 4) */}
          <div className="lg:col-span-4 bento-card-surface p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded bg-[#050811] border border-slate-800 text-[11px] font-mono text-[#00F0FF] font-bold">
                  SIPP & MA SYNC
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-display">
                Register Perkara
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 font-sans leading-relaxed">
                Sinkronisasi otomatis dengan Sistem Informasi Penelusuran Perkara Pengadilan Negeri dan Mahkamah Agung.
              </p>
            </div>

            {/* Quick Stat Counters */}
            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#050811]/90 border border-slate-800">
                <span className="text-xs text-slate-400">Total Tersangka:</span>
                <span className="text-lg font-black text-white">
                  {tersangkaCount.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#050811]/90 border border-slate-800">
                <span className="text-xs text-slate-400">Vonis Inkracht:</span>
                <span className="text-lg font-black text-[#00FF88]">
                  {kasusSelesaiCount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================================
          3. FISCAL EQUIVALENCY CARDS (Figma AutoLayout Grid, 8pt Spacing)
          ========================================================================== */}
      <section id="socialImpactSection" className="bento-card-surface p-6 sm:p-8 shadow-2xl relative">
        <div className="border-b border-slate-800/80 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 font-display">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF1A40] shadow-[0_0_8px_#FF1A40]"></span>
              Kesetaraan Fiskal Kerugian Korupsi
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Potensi alokasi jika dana korupsi <strong className="text-[#FF1A40] font-mono">Rp 403,17 Triliun</strong> terselamatkan untuk rakyat:
            </p>
          </div>
        </div>

        {/* 4-Column AutoLayout Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          <div className="p-4 sm:p-5 rounded-xl bg-[#050811] border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all flex flex-col justify-between gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center border border-[#00F0FF]/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white font-mono group-hover:text-[#00F0FF] transition-colors">
                {dampak?.bantuan_beasiswa_kuliah.toLocaleString('id-ID') || '4.031.681'}
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] block mt-1">
                Beasiswa Kuliah S1
              </span>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Membiayai 4 tahun penuh perkuliahan sampai wisuda.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#050811] border border-[#00FF88]/25 hover:border-[#00FF88] transition-all flex flex-col justify-between gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#00FF88]/15 text-[#00FF88] flex items-center justify-center border border-[#00FF88]/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white font-mono group-hover:text-[#00FF88] transition-colors">
                {dampak?.gedung_sekolah_dasar.toLocaleString('id-ID') || '80.633'}
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00FF88] block mt-1">
                Gedung SD Baru
              </span>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Pembangunan & renovasi sekolah dasar di daerah 3T.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#050811] border border-[#FF1A40]/25 hover:border-[#FF1A40] transition-all flex flex-col justify-between gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#FF1A40]/15 text-[#FF1A40] flex items-center justify-center border border-[#FF1A40]/30">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white font-mono group-hover:text-[#FF1A40] transition-colors">
                {dampak?.puskesmas_rawat_inap.toLocaleString('id-ID') || '26.877'}
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1A40] block mt-1">
                Puskesmas Rawat Inap
              </span>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Fasilitas rawat inap terpadu per kecamatan se-Indonesia.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#050811] border border-amber-500/25 hover:border-amber-400 transition-all flex flex-col justify-between gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-white font-mono group-hover:text-amber-400 transition-colors">
                {dampak?.kilometer_jalan_tol.toLocaleString('id-ID') || '1.612'} KM
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mt-1">
                Jalan Tol Logistik
              </span>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Pembangunan infrastruktur penghubung jalur distribusi.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================================
          4. INTEL SEARCH & DOSSIER PREVIEW (Real-time Fuzzy Search by Name / Status)
          ========================================================================== */}
      <section id="topCasesPreviewSection" className="space-y-5">
        
        {/* Header & Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[11px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider mb-1.5">
              <Crosshair className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>FORENSIC DOSSIER SEARCH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Pencarian Intelijen & Rekam Jejak Pelaku
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pencarian real-time dengan algoritma fuzzy toleransi salah ketik berdasarkan nama atau status hukum perkara.
            </p>
          </div>

          <button
            onClick={() => onNavigate('galeri')}
            className="text-xs font-mono font-bold text-[#00F0FF] hover:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer group px-3 py-2 rounded-xl bg-[#091122] border border-slate-800 hover:border-[#00F0FF]/50 transition-all shadow-sm"
          >
            <span>DIREKTORI PENUH ({pelakuList.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Real-time Search Box & Status Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#090D16]/95 border border-[#00F0FF]/30 shadow-xl space-y-4">
          
          {/* Main Input Row */}
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center pointer-events-none text-slate-400">
              <Search className={`w-5 h-5 transition-colors ${searchQuery ? 'text-[#00F0FF]' : 'text-slate-400'}`} />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama pelaku (e.g. Surya, Syahrul, Harvey) atau status hukum (e.g. Terpidana, Tersangka)..."
              className="w-full bg-[#050811] text-white placeholder-slate-500 text-sm font-sans pl-12 pr-28 py-3.5 rounded-xl border border-slate-700/80 focus:border-[#00F0FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/25 shadow-inner transition-all"
            />

            {/* Right side helper / clear button */}
            <div className="absolute right-3 flex items-center gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Hapus pencarian"
                  aria-label="Hapus kata kunci pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 select-none">
                FUZZY ENGINE
              </span>
            </div>
          </div>

          {/* Quick Status Filter Pills & Results Feedback */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-800/80">
            
            {/* Status Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Status:</span>
              </span>

              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#00F0FF] text-[#050811] shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'bg-[#050811] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Semua
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('terpidana')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  statusFilter === 'terpidana'
                    ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    : 'bg-[#050811] text-slate-400 hover:text-rose-400 border border-slate-800'
                }`}
              >
                Terpidana (Inkracht)
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('tersangka')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  statusFilter === 'tersangka'
                    ? 'bg-amber-500 text-[#050811] shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'bg-[#050811] text-slate-400 hover:text-amber-400 border border-slate-800'
                }`}
              >
                Tersangka
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('terdakwa')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  statusFilter === 'terdakwa'
                    ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                    : 'bg-[#050811] text-slate-400 hover:text-purple-400 border border-slate-800'
                }`}
              >
                Terdakwa
              </button>
            </div>

            {/* Results Counter & Reset */}
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono">
              <span className="text-slate-400">
                Cocok: <strong className="text-white">{filteredPelakuList.length}</strong> / {pelakuList.length}
              </span>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[11px] text-[#00F0FF] hover:text-white underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Results Grid or Empty State */}
        {filteredPelakuList.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedPelaku.map((item) => {
                const isStatusMatch = searchQuery && item.status_hukum.toLowerCase().includes(searchQuery.toLowerCase().trim());
                
                let badgeClass = 'bg-[#FF1A40]/15 text-[#FF1A40] border-[#FF1A40]/40 shadow-[0_0_10px_rgba(255,26,64,0.2)]';
                if (isStatusMatch || statusFilter !== 'all') {
                  badgeClass = 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/50 shadow-[0_0_10px_rgba(0,255,136,0.3)]';
                } else if (item.status_hukum.toLowerCase().includes('terdakwa')) {
                  badgeClass = 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
                } else if (item.status_hukum.toLowerCase().includes('tersangka')) {
                  badgeClass = 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
                }

                return (
                  <div 
                    key={item.id} 
                    className="cyber-card p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all flex flex-col justify-between group shadow-lg h-full"
                  >
                    <div className="flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="dossier-frame w-14 h-14 shrink-0 overflow-hidden rounded-xl">
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
                            <h3 className="font-bold text-sm text-white group-hover:text-[#00F0FF] transition-colors leading-tight font-display truncate">
                              {item.nama}
                            </h3>
                            <span className="text-xs text-slate-400 font-medium block truncate">Alias: {item.alias}</span>
                            <div className="text-[11px] text-[#00F0FF] font-mono mt-0.5 truncate">{item.instansi}</div>
                          </div>
                        </div>
                        
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 transition-all ${badgeClass}`}>
                          [{item.status_hukum.toUpperCase()}]
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-3 bg-[#050811] p-3 rounded-xl border border-slate-800/80 mb-4 font-sans min-h-[3.5rem] flex-1">
                        {item.kasus}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#00F0FF]/20 flex items-center justify-between mt-auto">
                      <div className="min-w-0 pr-2">
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block truncate">ESTIMASI KERUGIAN</span>
                        <span className="text-sm sm:text-base font-black text-[#FF1A40] font-mono glow-crimson block truncate">{item.nominal_formatted}</span>
                      </div>
                      <button
                        onClick={() => onSelectPelaku(item)}
                        className="text-xs font-mono font-bold text-[#00F0FF] hover:text-[#050811] bg-[#00F0FF]/15 hover:bg-[#00F0FF] px-3.5 py-2 rounded-xl border border-[#00F0FF]/40 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)] shrink-0"
                      >
                        DOSSIER &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Toggle show more if not actively filtered and list > 3 */}
            {!isFiltered && filteredPelakuList.length > 3 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowAllResults(!showAllResults)}
                  className="px-5 py-2.5 rounded-xl bg-[#091122] hover:bg-[#0d172e] border border-slate-800 hover:border-[#00F0FF]/40 text-xs font-mono font-bold text-[#00F0FF] transition-all cursor-pointer shadow-sm"
                >
                  {showAllResults 
                    ? '▲ TAMPILKAN 3 PERKARA TERATAS SAJA' 
                    : `▼ TAMPILKAN SEMUA ${filteredPelakuList.length} PERKARA`}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="cyber-card p-8 sm:p-10 rounded-2xl border border-dashed border-slate-700/80 text-center space-y-4 bg-[#090D16]/60">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#FF1A40] mx-auto shadow-[0_0_15px_rgba(255,26,64,0.2)]">
              <FileSearch className="w-6 h-6" />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-base font-bold text-white font-display">
                Tidak Ditemukan Perkara yang Cocok
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Algoritma pencarian fuzzy tidak menemukan hasil untuk kata kunci{' '}
                <span className="text-[#00F0FF] font-mono font-bold">"{searchQuery}"</span>
                {statusFilter !== 'all' && (
                  <span> dengan filter status <span className="text-amber-400 font-mono">[{statusFilter.toUpperCase()}]</span></span>
                )}.
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Tips: Coba gunakan nama alias, nama sektor (Swasta/BUMN), atau ganti filter status ke "Semua".
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-[#050811] border border-[#00F0FF]/40 text-xs font-mono font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Pencarian & Tampilkan Semua</span>
            </button>
          </div>
        )}

      </section>

    </div>
  );
};
