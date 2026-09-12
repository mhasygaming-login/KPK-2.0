import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Coins, 
  Building2, 
  GraduationCap, 
  HeartPulse, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  Activity,
  Zap,
  Flame,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  Crosshair,
  Terminal as TerminalIcon
} from 'lucide-react';
import { Pelaku, StatistikData, ActiveTab } from '../types.ts';

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

  // Smooth Counter Animation State
  const [tersangkaCount, setTersangkaCount] = useState(0);
  const [kasusSelesaiCount, setKasusSelesaiCount] = useState(0);

  useEffect(() => {
    const targetTersangka = ringkasan?.total_tersangka || 1428;
    const targetKasus = ringkasan?.total_kasus_selesai || 1284;
    
    let frame = 0;
    const totalFrames = 30;
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
    <div className="space-y-10 pb-12">
      
      {/* 1. Hero Section: Cyber-Trading / Financial Intelligence Terminal Hero */}
      <section id="heroSection" className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#090D16]/90 border border-[#00F0FF]/30 p-6 sm:p-8 lg:p-10 cyber-card">
        {/* Glowing Matrix Corner Brackets */}
        <div className="corner-bracket-tl"></div>
        <div className="corner-bracket-br"></div>

        {/* Ambient Glow Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00F0FF]/12 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF1A40]/12 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF1A40]/15 border border-[#FF1A40]/40 text-xs font-mono font-bold text-[#FF1A40] uppercase tracking-wider mb-4">
            <span className="led-indicator led-red"></span>
            <span>DATA PENINDAKAN HUKUM</span>
          </div>

          {/* Sized-down, comfortable title for better readability */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug text-white font-display">
            KPK Anti-Corruption <span className="text-[#00F0FF] glow-cyan">Intelligence</span> & Trading Terminal
          </h1>
          
          {/* Concise, uncluttered subtitle */}
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
            Transparansi data penindakan tindak pidana korupsi, audit kerugian negara, dan pemulihan aset (Asset Recovery).
          </p>

          {/* High-Impact Hero Statistic Card */}
          <div className="mt-6 glass-panel border border-[#FF1A40]/50 rounded-2xl p-5 sm:p-7 backdrop-blur-xl shadow-[0_0_30px_rgba(255,26,64,0.2)] relative overflow-hidden">
            <div className="scanline-beam"></div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-rose-300 uppercase block flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#FF1A40]" />
                  TOTAL ESTIMASI KERUGIAN NEGARA
                </span>
                
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1.5 font-mono flex items-baseline gap-2">
                  <span className="text-[#FF1A40] glow-crimson">
                    {ringkasan?.total_kerugian_formatted || 'Rp 403,17 Triliun'}
                  </span>
                </div>
                
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-2 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FF88] shrink-0" />
                  Akumulasi perkara korupsi 2020–2024 (Audit BPK & BPKP)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 font-mono">
                <button
                  id="btnLihatAnalisis"
                  onClick={() => onNavigate('analisis')}
                  className="px-5 py-3 rounded-xl bg-[#FF1A40] hover:bg-[#ff3355] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,26,64,0.4)] hover:shadow-[0_0_25px_rgba(255,26,64,0.7)] transition-all cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  Terminal Analisis <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="btnBukaGaleri"
                  onClick={() => onNavigate('galeri')}
                  className="px-5 py-3 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-[#050811] border border-[#00F0FF]/50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  Dossier Pelaku
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stat Counter Cards */}
      <section id="statCardsSection" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Total Tersangka */}
        <div className="cyber-card p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Tersangka & Terpidana</span>
            <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {tersangkaCount.toLocaleString('id-ID')}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            <span className="text-[#00FF88] font-bold">144 Kasus Aktif</span> persidangan
          </p>
        </div>

        {/* Card 2: Kasus Selesai */}
        <div className="cyber-card p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00FF88] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Vonis Inkracht</span>
            <div className="w-8 h-8 rounded-lg bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {kasusSelesaiCount.toLocaleString('id-ID')}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Berkekuatan hukum tetap
          </p>
        </div>

        {/* Card 3: Total Aset Disita */}
        <div className="cyber-card p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Aset Rampasan Disita</span>
            <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#00F0FF] mt-2 font-mono glow-cyan">
            {ringkasan?.total_aset_disita_formatted || 'Rp 38,40 Triliun'}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Rampasan & uang pengganti
          </p>
        </div>

        {/* Card 4: Rasio Pemulihan */}
        <div className="cyber-card p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00FF88] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Asset Recovery Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#00FF88] mt-2 font-mono flex items-center gap-1.5 glow-emerald">
            <span>{ringkasan?.tingkat_pemulihan_aset_persen || '9,52'} %</span>
            <ArrowUpRight className="w-4 h-4 text-[#00FF88]" />
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Rasio pengembalian kas negara
          </p>
        </div>
      </section>

      {/* 3. Social Fiscal Equivalents Section */}
      <section id="socialImpactSection" className="glass-panel rounded-3xl border border-[#00F0FF]/25 p-6 sm:p-7 shadow-2xl relative">
        <div className="border-b border-slate-800 pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 font-display">
              <span className="led-indicator led-red"></span>
              Kesetaraan Fiskal Kerugian Korupsi
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Nilai alokasi jika dana korupsi <strong className="text-[#FF1A40] font-mono">Rp 403,17 Triliun</strong> diselamatkan:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#050811] border border-[#00F0FF]/20 hover:border-[#00F0FF] transition-all">
            <div className="w-9 h-9 rounded-lg bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center mb-2.5 border border-[#00F0FF]/30">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-white font-mono">
              {dampak?.bantuan_beasiswa_kuliah.toLocaleString('id-ID') || '4.031.681'}
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] block mt-1">
              Beasiswa S1
            </span>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Biaya kuliah 4 tahun penuh hingga lulus.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#050811] border border-[#00FF88]/20 hover:border-[#00FF88] transition-all">
            <div className="w-9 h-9 rounded-lg bg-[#00FF88]/15 text-[#00FF88] flex items-center justify-center mb-2.5 border border-[#00FF88]/30">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-white font-mono">
              {dampak?.gedung_sekolah_dasar.toLocaleString('id-ID') || '80.633'}
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00FF88] block mt-1">
              Gedung SD Baru
            </span>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Pembangunan dan renovasi SD di pelosok 3T.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#050811] border border-[#FF1A40]/20 hover:border-[#FF1A40] transition-all">
            <div className="w-9 h-9 rounded-lg bg-[#FF1A40]/15 text-[#FF1A40] flex items-center justify-center mb-2.5 border border-[#FF1A40]/30">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-white font-mono">
              {dampak?.puskesmas_rawat_inap.toLocaleString('id-ID') || '26.877'}
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1A40] block mt-1">
              Puskesmas Ranap
            </span>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Layanan rawat inap terpadu per kecamatan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#050811] border border-amber-500/20 hover:border-amber-400 transition-all">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2.5 border border-amber-500/30">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-xl font-black text-white font-mono">
              {dampak?.kilometer_jalan_tol.toLocaleString('id-ID') || '1.612'} KM
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mt-1">
              Jalan Tol Logistik
            </span>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Pembangunan jalur logistik Trans-Sumatera.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Top Cases Highlight Preview (Target Intelligence Dossiers) */}
      <section id="topCasesPreviewSection" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white font-display">
              Top Perkara & Beban Kerugian
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Rekam jejak perkara dengan nilai kerugian terbesar.
            </p>
          </div>
          <button
            onClick={() => onNavigate('galeri')}
            className="text-xs font-mono font-bold text-[#00F0FF] hover:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer group"
          >
            <span>BUKA DIREKTORI ({pelakuList.length} PERKARA)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pelakuList.slice(0, 3).map((item) => (
            <div 
              key={item.id} 
              className="cyber-card p-5 rounded-2xl border border-[#00F0FF]/25 hover:border-[#00F0FF] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="dossier-frame w-14 h-14 shrink-0">
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
                      <h3 className="font-bold text-sm text-white group-hover:text-[#00F0FF] transition-colors leading-tight font-display">
                        {item.nama}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium block">Alias: {item.alias}</span>
                      <div className="text-[11px] text-[#00F0FF] font-mono mt-0.5">{item.instansi}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FF1A40]/15 text-[#FF1A40] border border-[#FF1A40]/40 shrink-0">
                    [{item.status_hukum.toUpperCase()}]
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 bg-[#050811] p-3 rounded-xl border border-slate-800/80 mb-4 font-sans">
                  {item.kasus}
                </p>
              </div>

              <div className="pt-3 border-t border-[#00F0FF]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">ESTIMASI KERUGIAN</span>
                  <span className="text-sm font-black text-[#FF1A40] font-mono glow-crimson">{item.nominal_formatted}</span>
                </div>
                <button
                  onClick={() => onSelectPelaku(item)}
                  className="text-xs font-mono font-bold text-[#00F0FF] hover:text-[#050811] bg-[#00F0FF]/15 hover:bg-[#00F0FF] px-3.5 py-1.5 rounded-lg border border-[#00F0FF]/40 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                >
                  DOSSIER &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
