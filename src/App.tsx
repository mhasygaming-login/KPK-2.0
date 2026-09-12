import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { GalleryView } from './components/GalleryView.tsx';
import { WhistleblowerView } from './components/WhistleblowerView.tsx';
import { PelakuModal } from './components/PelakuModal.tsx';
import { Footer } from './components/Footer.tsx';
import { Pelaku, StatistikData, ActiveTab } from './types.ts';
import { ArrowUp, Activity, Users, Lock, ShieldAlert, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [pelakuList, setPelakuList] = useState<Pelaku[]>([]);
  const [statistik, setStatistik] = useState<StatistikData | null>(null);
  const [selectedPelaku, setSelectedPelaku] = useState<Pelaku | null>(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Section Refs for Scroll-Spy
  const berandaRef = useRef<HTMLElement | null>(null);
  const analisisRef = useRef<HTMLElement | null>(null);
  const galeriRef = useRef<HTMLElement | null>(null);
  const edukasiRef = useRef<HTMLElement | null>(null);

  // Smooth scroll handler
  const scrollToSection = (sectionId: ActiveTab) => {
    setActiveTab(sectionId);
    let targetElement: HTMLElement | null = null;
    
    if (sectionId === 'beranda') targetElement = berandaRef.current;
    else if (sectionId === 'analisis') targetElement = analisisRef.current;
    else if (sectionId === 'galeri') targetElement = galeriRef.current;
    else if (sectionId === 'edukasi' || sectionId === 'laporan') targetElement = edukasiRef.current;

    if (targetElement) {
      const headerOffset = 110;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  // Scroll listener for back-to-top & Scroll-Spy
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Scroll Spy calculation
      const scrollPosition = window.scrollY + 200;

      const sections: { id: ActiveTab; element: HTMLElement | null }[] = [
        { id: 'beranda', element: berandaRef.current },
        { id: 'analisis', element: analisisRef.current },
        { id: 'galeri', element: galeriRef.current },
        { id: 'edukasi', element: edukasiRef.current }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.element) {
          const top = sec.element.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync with window hash if loaded with hash (e.g. #analisis)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as ActiveTab;
    if (['beranda', 'analisis', 'galeri', 'edukasi', 'laporan'].includes(hash)) {
      setTimeout(() => {
        scrollToSection(hash === 'laporan' ? 'edukasi' : hash);
      }, 500);
    }
  }, [loading]);

  // Fetch JSON data preserving data/pelaku.json & data/statistik.json
  useEffect(() => {
    async function loadData() {
      try {
        const [pelakuRes, statRes] = await Promise.all([
          fetch('/data/pelaku.json'),
          fetch('/data/statistik.json')
        ]);

        if (pelakuRes.ok) {
          const data = await pelakuRes.json();
          setPelakuList(data);
        }
        if (statRes.ok) {
          const data = await statRes.json();
          setStatistik(data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0F1D] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Bar with Live Ticker & Active Scroll-Spy */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onNavigateSection={scrollToSection} 
      />

      {/* Main Container Multi-Section Landing Page */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-mono text-cyan-400 font-semibold tracking-wider">
              MEMUAT DATA TRANSPARANSI FORENSIK KPK...
            </p>
          </div>
        ) : (
          <>
            {/* 1. BERANDA SECTION (Hero, Counters, Social Impact, Top Cases) */}
            <section 
              id="beranda" 
              ref={berandaRef} 
              className="scroll-mt-28 transition-all duration-300"
            >
              <DashboardView
                pelakuList={pelakuList}
                statistik={statistik}
                onNavigate={scrollToSection}
                onSelectPelaku={(p) => setSelectedPelaku(p)}
              />
            </section>

            {/* Section Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs font-mono font-bold text-slate-500 px-3 py-1 rounded-full bg-[#0F172A] border border-slate-800 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                MODUL 02 / ANALISIS KEUANGAN & PEMULIHAN ASET
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* 2. LIVE ANALYTICS SECTION (Trading Terminal & Detailed Sektoral Breakdown) */}
            <section 
              id="analisis" 
              ref={analisisRef} 
              className="scroll-mt-28 transition-all duration-300"
            >
              <AnalyticsView
                pelakuList={pelakuList}
                statistik={statistik}
              />
            </section>

            {/* Section Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs font-mono font-bold text-slate-500 px-3 py-1 rounded-full bg-[#0F172A] border border-slate-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                MODUL 03 / GALERI PENINDAKAN & DOSSIER PELAKU
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* 3. GALERI PELAKU & KASUS SECTION */}
            <section 
              id="galeri" 
              ref={galeriRef} 
              className="scroll-mt-28 transition-all duration-300"
            >
              <GalleryView
                pelakuList={pelakuList}
                onSelectPelaku={(p) => setSelectedPelaku(p)}
              />
            </section>

            {/* Section Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs font-mono font-bold text-slate-500 px-3 py-1 rounded-full bg-[#0F172A] border border-slate-800 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                MODUL 04 / EDUKASI ANTI-KORUPSI & FORMULIR PENGADUAN (KWS)
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* 4. EDUKASI & PENGADUAN MASYARAKAT SECTION */}
            <section 
              id="edukasi" 
              ref={edukasiRef} 
              className="scroll-mt-28 transition-all duration-300"
            >
              <WhistleblowerView />
            </section>
          </>
        )}
      </main>

      {/* Pelaku Case Detail Modal */}
      <PelakuModal
        pelaku={selectedPelaku}
        onClose={() => setSelectedPelaku(null)}
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          id="btnBackToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-[#080D1A] border border-cyan-500/40 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer group"
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
