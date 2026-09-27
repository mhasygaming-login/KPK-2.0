import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  MapPin, 
  ExternalLink, 
  Scale, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight, 
  Globe, 
  Terminal as TerminalIcon,
  ChevronRight
} from 'lucide-react';
import { ActiveTab } from '../types.ts';

interface FooterProps {
  onNavigate?: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (tab: ActiveTab) => {
    if (onNavigate) {
      onNavigate(tab);
    } else {
      const element = document.getElementById(tab);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#050811] text-slate-300 border-t border-slate-800/80 mt-auto overflow-hidden">
      {/* Top Cyber Accent Glow Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-80" />

      {/* Ambient Radial Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-36 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-36 bg-[#FF1A40]/5 rounded-full blur-3xl pointer-events-none" />

      {/* =====================================================================
          TIER 1: QUICK HOTLINE & EMERGENCY WHISTLEBLOWER BANNER (AutoLayout Grid)
          ===================================================================== */}
      <div className="border-b border-slate-800/80 bg-[#070D1C]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            
            {/* 1. Call Center 198 Card */}
            <a 
              href="tel:198"
              className="group flex items-center gap-3.5 p-3.5 rounded-xl bg-[#091122] border border-slate-800 hover:border-red-500/50 hover:bg-[#0d172e] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(255,26,64,0.15)] min-h-[78px]"
              aria-label="Telepon Call Center KPK 198"
            >
              <div className="w-11 h-11 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#FF1A40] group-hover:scale-105 group-hover:bg-[#FF1A40] group-hover:text-white transition-all duration-200 shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Call Center KPK</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="text-base font-black text-white tracking-wide font-mono flex items-center justify-between mt-0.5">
                  <span>198</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 font-sans tracking-tight">
                    BEBAS PULSA
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">Layanan Siaga 24 Jam</p>
              </div>
            </a>

            {/* 2. KWS Portal Card */}
            <a 
              href="https://pengaduan.kpk.go.id" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-3.5 p-3.5 rounded-xl bg-[#091122] border border-slate-800 hover:border-[#00F0FF]/50 hover:bg-[#0d172e] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] min-h-[78px]"
              aria-label="Kunjungi Portal Whistleblower KPK"
            >
              <div className="w-11 h-11 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] group-hover:scale-105 group-hover:bg-[#00F0FF] group-hover:text-[#050811] transition-all duration-200 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Portal Whistleblower</span>
                  <ArrowUpRight className="w-3 h-3 text-[#00F0FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-sm font-bold text-white truncate mt-0.5">pengaduan.kpk.go.id</div>
                <p className="text-[11px] text-cyan-400/90 font-mono truncate mt-0.5">KWS SHA-256 Terenkripsi</p>
              </div>
            </a>

            {/* 3. WhatsApp Pengaduan Card */}
            <a 
              href="https://wa.me/62811955198" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-3.5 p-3.5 rounded-xl bg-[#091122] border border-slate-800 hover:border-emerald-500/50 hover:bg-[#0d172e] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] min-h-[78px]"
              aria-label="Hubungi WhatsApp Pengaduan KPK"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-[#050811] transition-all duration-200 shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">WhatsApp Dumas Resmi</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-sm font-bold text-white font-mono tracking-tight mt-0.5">0811-955-198</div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">Bukti Berkas & Dokumen Digital</p>
              </div>
            </a>

            {/* 4. Email Resmi KPK Card */}
            <a 
              href="mailto:pengaduan@kpk.go.id"
              className="group flex items-center gap-3.5 p-3.5 rounded-xl bg-[#091122] border border-slate-800 hover:border-amber-500/50 hover:bg-[#0d172e] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] min-h-[78px]"
              aria-label="Kirim Email ke Dumas KPK"
            >
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-[#050811] transition-all duration-200 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Email Dumas KPK</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-sm font-bold text-white truncate mt-0.5">pengaduan@kpk.go.id</div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">Penyampaian Berkas Formal</p>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* =====================================================================
          TIER 2: MAIN FOOTER NAVIGATION & INFORMATION GRID (AutoLayout Columns)
          ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COL 1: IDENTITY, MISSION & PHYSICAL ADDRESS (Md: 6 Cols, Lg: 5 Cols) */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            
            {/* KPK Brand Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#FF1A40] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,26,64,0.4)] border border-red-400/40 shrink-0">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight leading-snug">
                  KOMISI PEMBERANTASAN KORUPSI
                </h3>
                <p className="text-xs font-mono font-semibold text-[#00F0FF] tracking-wider">
                  REPUBLIK INDONESIA
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Sistem Forensik Korupsi & Asset Recovery Nasional menghadirkan transparansi terintegrasi data putusan pengadilan berkekuatan hukum tetap (inkracht) serta hasil audit kerugian keuangan negara BPK & BPKP RI.
            </p>

            {/* Physical Address Card */}
            <div className="p-3.5 rounded-xl bg-[#091122]/90 border border-slate-800/80 flex items-start gap-3 max-w-md shadow-inner">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                <span className="font-semibold text-white block">Gedung Merah Putih KPK RI</span>
                Jl. Kuningan Persada Kav. 4, RT.1/RW.6, Guntur, Setiabudi, Jakarta Selatan 12950
              </div>
            </div>

            {/* Security Badges Pill List */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-medium text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ISO 27001 Certified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[11px] font-mono font-medium text-[#00F0FF]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                <span>BSSN Cybersecurity</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-[11px] font-mono font-medium text-purple-300">
                <Scale className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>BPK Audit Terverifikasi</span>
              </span>
            </div>
          </div>

          {/* COL 2: NAVIGASI MODUL APLIKASI (Md: 3 Cols, Lg: 3 Cols) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#00F0FF] rounded-sm inline-block shrink-0"></span>
              <span>Navigasi Modul</span>
            </h4>

            <nav className="flex flex-col space-y-1 text-xs">
              <button 
                type="button"
                onClick={() => handleNavClick('beranda')}
                className="w-full text-left py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-[#00F0FF] transition-all flex items-center gap-2 cursor-pointer group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 transition-all shrink-0" />
                <span className="font-medium">Beranda & Metrik Inti</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('analisis')}
                className="w-full text-left py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-[#00F0FF] transition-all flex items-center gap-2 cursor-pointer group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 transition-all shrink-0" />
                <span className="font-medium">Terminal Analisis Live</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('galeri')}
                className="w-full text-left py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-[#00F0FF] transition-all flex items-center gap-2 cursor-pointer group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 transition-all shrink-0" />
                <span className="font-medium">Dossier & Profil Pelaku</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('edukasi')}
                className="w-full text-left py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-[#00F0FF] transition-all flex items-center gap-2 cursor-pointer group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 transition-all shrink-0" />
                <span className="font-medium">Edukasi & Tipologi Kasus</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('laporan')}
                className="w-full text-left py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-[#00F0FF] transition-all flex items-center gap-2 cursor-pointer group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00F0FF] group-hover:translate-x-0.5 transition-all shrink-0" />
                <span className="font-medium">Whistleblower (KWS)</span>
              </button>

              <div className="pt-2">
                <a 
                  href="/analisis.html" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#091122] border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF]/15 hover:border-[#00F0FF] text-[11px] font-mono font-bold transition-all group"
                  aria-label="Buka Terminal Layar Penuh"
                >
                  <span className="flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                    <span>Terminal Fullscreen</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </nav>
          </div>

          {/* COL 3: LANDASAN HUKUM & INTEGRITAS (Md: 3 Cols, Lg: 4 Cols) */}
          <div className="md:col-span-3 lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-purple-500 rounded-sm inline-block shrink-0"></span>
              <span>Landasan Hukum</span>
            </h4>

            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/40 transition-colors">
                <Scale className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-slate-200 font-semibold block leading-tight">UU No. 19 Tahun 2019</span>
                  <span className="text-[11px] text-slate-500 leading-snug block mt-0.5">Perubahan UU Komisi Pemberantasan Tindak Pidana Korupsi</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/40 transition-colors">
                <FileText className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-slate-200 font-semibold block leading-tight">UU Tipikor No. 31/1999 jo. UU 20/2001</span>
                  <span className="text-[11px] text-slate-500 leading-snug block mt-0.5">Pemberantasan Tipikor & Pemulihan Keuangan Negara</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/40 transition-colors">
                <Globe className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-slate-200 font-semibold block leading-tight">UU KIP No. 14 Tahun 2008</span>
                  <span className="text-[11px] text-slate-500 leading-snug block mt-0.5">Keterbukaan Informasi Publik bagi Seluruh Rakyat Indonesia</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/40 transition-colors">
                <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-slate-200 font-semibold block leading-tight">Perlindungan Saksi & Korban</span>
                  <span className="text-[11px] text-slate-500 leading-snug block mt-0.5">Sinergi terpadu bersama LPSK RI & Kerahasiaan Saksi</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =====================================================================
            TIER 3: SUB-FOOTER BOTTOM BAR (AutoLayout Flex-Row / Stack)
            ===================================================================== */}
        <div className="mt-12 pt-6 border-t border-slate-800/90 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright & Official Disclaimers */}
          <div className="text-xs text-slate-400 font-mono text-center md:text-left space-y-1">
            <p>
              &copy; {new Date().getFullYear()} <strong className="text-white">Komisi Pemberantasan Korupsi (KPK) RI</strong>. Hak Cipta Dilindungi Undang-Undang.
            </p>
            <p className="text-[11px] text-slate-500">
              Inisiatif Satu Data Forensik Publik & Pemulihan Aset Nasional.
            </p>
          </div>

          {/* External Government Ecosystem Portals */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-xs font-mono">
            <a 
              href="https://kpk.go.id" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091122] hover:bg-[#0F1D38] border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all shadow-sm"
              title="Portal Resmi Komisi Pemberantasan Korupsi"
            >
              <span>kpk.go.id</span>
              <ExternalLink className="w-3 h-3 text-[#00F0FF]" />
            </a>

            <a 
              href="https://jaga.id" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091122] hover:bg-[#0F1D38] border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all shadow-sm"
              title="JAGA.id - Portal Pencegahan Korupsi"
            >
              <span>jaga.id</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>

            <a 
              href="https://lpsk.go.id" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091122] hover:bg-[#0F1D38] border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all shadow-sm"
              title="Lembaga Perlindungan Saksi dan Korban"
            >
              <span>lpsk.go.id</span>
              <ExternalLink className="w-3 h-3 text-purple-400" />
            </a>

            <a 
              href="https://bpk.go.id" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091122] hover:bg-[#0F1D38] border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white transition-all shadow-sm"
              title="Badan Pemeriksa Keuangan Republik Indonesia"
            >
              <span>bpk.go.id</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
