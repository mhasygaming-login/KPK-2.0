import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  BarChart3, 
  Users, 
  Home, 
  PhoneCall, 
  Menu, 
  X, 
  ExternalLink,
  Lock,
  Activity,
  ChevronRight,
  TrendingUp,
  Cpu,
  Terminal as TerminalIcon
} from 'lucide-react';
import { ActiveTab } from '../types.ts';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onNavigateSection: (sectionId: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    onNavigateSection(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header id="mainNavbar" className="sticky top-0 z-50 transition-all duration-300 select-none">
      {/* 1. Cyber High-Tech Ticker / Marquee Bar */}
      <div className="ticker-container bg-[#050811] border-b border-[#00F0FF]/25">
        <div className="ticker-track">
          <div className="ticker-item">
            <span className="led-indicator led-green"></span>
            <span className="text-[#00FF88] font-mono font-bold">[SYSTEM: ONLINE]</span>
          </div>
          <div className="ticker-item">
            <span className="text-slate-400 font-mono">TOTAL CORRUPTION LOSS:</span>
            <span className="ticker-down font-mono font-bold">Rp 403.17T ▼</span>
          </div>
          <div className="ticker-item">
            <span className="text-slate-400 font-mono">RECOVERY RATE:</span>
            <span className="ticker-up font-mono font-bold">9.52% ▲</span>
          </div>
          <div className="ticker-item">
            <span className="text-slate-400 font-mono">ASSET RECOVERED:</span>
            <span className="ticker-cyan font-mono font-bold">Rp 38.40T ▲</span>
          </div>
          <div className="ticker-item">
            <span className="text-slate-400 font-mono">ACTIVE CASES:</span>
            <span className="text-amber-400 font-mono font-bold">144 PERKARA</span>
          </div>
          <div className="ticker-item">
            <span className="led-indicator led-cyan"></span>
            <span className="text-cyan-400 font-mono font-bold">WHISTLEBLOWER (KWS): 256-BIT ENCRYPTED</span>
          </div>
          <div className="ticker-item">
            <span className="text-slate-400 font-mono">LAST UPDATED:</span>
            <span className="text-white font-mono font-bold">LIVE STREAMING</span>
          </div>
          
          {/* Continuous Loop Track Items */}
          <div className="ticker-item">
            <span className="led-indicator led-green"></span>
            <span className="text-[#00FF88] font-mono font-bold">[SYSTEM: ONLINE]</span>
          </div>
          <div className="ticker-item">
            <span className="text-slate-400 font-mono">TOTAL CORRUPTION LOSS:</span>
            <span className="ticker-down font-mono font-bold">Rp 403.17T ▼</span>
          </div>
          <div className="ticker-item">
            <span className="text-slate-400 font-mono">RECOVERY RATE:</span>
            <span className="ticker-up font-mono font-bold">9.52% ▲</span>
          </div>
          <div className="ticker-item">
            <span className="text-slate-400 font-mono">ASSET RECOVERED:</span>
            <span className="ticker-cyan font-mono font-bold">Rp 38.40T ▲</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar Bar (Cyber Glassmorphism with HUD Indicator) */}
      <div className={`bg-[#050811]/90 backdrop-blur-xl border-b border-[#00F0FF]/20 shadow-2xl transition-all ${
        scrolled ? 'py-1' : 'py-2'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Brand Logo & HUD Status */}
            <div 
              id="brandLogo" 
              onClick={() => handleLinkClick('beranda')}
              className="flex items-center gap-3.5 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#FF1A40] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,26,64,0.5)] group-hover:shadow-[0_0_30px_rgba(255,26,64,0.8)] transition-all border border-red-400/40">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF88]"></span>
                </span>
              </div>
              <div>
                <div className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center font-display">
                  <span>KPK INTELLIGENCE</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                  <span className="text-[#00F0FF]">TERMINAL</span>
                  <span>//</span>
                  <span className="text-[#00FF88]">ONLINE</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation with Active Scroll-Spy Indicators */}
            <nav id="desktopNav" className="hidden lg:flex items-center gap-2 font-mono text-xs">
              <button
                id="navBeranda"
                onClick={() => handleLinkClick('beranda')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === 'beranda'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>BERANDA</span>
              </button>

              <button
                id="navAnalisis"
                onClick={() => handleLinkClick('analisis')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === 'analisis'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>LIVE ANALYTICS</span>
              </button>

              <button
                id="navGaleri"
                onClick={() => handleLinkClick('galeri')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === 'galeri'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>DOSSIER PELAKU</span>
              </button>

              <button
                id="navEdukasi"
                onClick={() => handleLinkClick('edukasi')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === 'edukasi' || activeTab === 'laporan'
                    ? 'bg-[#FF1A40]/15 text-[#FF1A40] border border-[#FF1A40] shadow-[0_0_15px_rgba(255,26,64,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-[#FF1A40]" />
                <span>EDUKASI & KWS</span>
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                id="mobileMenuToggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-[#00F0FF] hover:bg-slate-800/80 border border-slate-700/60 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobileMenuDrawer" className="lg:hidden bg-[#050811]/95 backdrop-blur-xl border-b border-[#00F0FF]/30 px-4 py-4 space-y-2 font-mono text-sm shadow-2xl">
          <button
            onClick={() => handleLinkClick('beranda')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'beranda' ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4 text-[#00F0FF]" /> BERANDA
          </button>
          <button
            onClick={() => handleLinkClick('analisis')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'analisis' ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-[#00F0FF]" /> LIVE ANALYTICS
          </button>
          <button
            onClick={() => handleLinkClick('galeri')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'galeri' ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-[#00F0FF]" /> DOSSIER PELAKU
          </button>
          <button
            onClick={() => handleLinkClick('edukasi')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'edukasi' ? 'bg-[#FF1A40]/20 text-[#FF1A40] border border-[#FF1A40]/50' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-[#FF1A40]" /> EDUKASI & KWS
          </button>
        </div>
      )}
    </header>
  );
};
