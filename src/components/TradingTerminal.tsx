import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ShieldAlert, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Terminal, 
  ExternalLink,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  Radio,
  SlidersHorizontal,
  Maximize2
} from 'lucide-react';
import { StatistikData, Pelaku, TimeframeOption, ChartViewMode } from '../types.ts';

interface TradingTerminalProps {
  statistik: StatistikData | null;
  pelakuList: Pelaku[];
}

export const TradingTerminal: React.FC<TradingTerminalProps> = ({ statistik, pelakuList }) => {
  const [viewMode, setViewMode] = useState<ChartViewMode>('overview');
  const [timeframe, setTimeframe] = useState<TimeframeOption>('all');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Render & Update Glowing Chart.js (TradingView / Crypto Terminal Style)
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Gradients for Glowing Trading Lines
    const cyanGradient = ctx.createLinearGradient(0, 0, 0, 380);
    cyanGradient.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
    cyanGradient.addColorStop(0.65, 'rgba(0, 240, 255, 0.08)');
    cyanGradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

    const crimsonGradient = ctx.createLinearGradient(0, 0, 0, 380);
    crimsonGradient.addColorStop(0, 'rgba(255, 26, 64, 0.5)');
    crimsonGradient.addColorStop(0.65, 'rgba(255, 26, 64, 0.08)');
    crimsonGradient.addColorStop(1, 'rgba(255, 26, 64, 0.0)');

    if (viewMode === 'overview') {
      let tren = statistik?.tren_tahunan || [];
      if (timeframe === '1y') tren = tren.slice(-2);
      else if (timeframe === '6m' || timeframe === '1m') tren = tren.slice(-1);

      const labels = tren.map(t => 'FY-' + t.tahun);
      const kerugianTriliun = tren.map(t => +(t.nominal_miliar / 1000).toFixed(2));
      const asetTriliun = tren.map(t => +(t.aset_disita_miliar / 1000).toFixed(2));

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'KORUPSI: ESTIMASI BEBAN KERUGIAN NEGARA (AUDIT BPK)',
              data: kerugianTriliun,
              borderColor: '#FF1A40',
              backgroundColor: crimsonGradient,
              borderWidth: 2.5,
              tension: 0.35,
              fill: true,
              pointBackgroundColor: '#FF1A40',
              pointBorderColor: '#050811',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 8,
              pointHoverBackgroundColor: '#FFFFFF',
              pointHoverBorderColor: '#FF1A40',
            },
            {
              label: 'RECOVERY: ASET DISITA / DIRAMPAS (KPK & KEJAKSAAN)',
              data: asetTriliun,
              borderColor: '#00F0FF',
              backgroundColor: cyanGradient,
              borderWidth: 2.5,
              tension: 0.35,
              fill: true,
              pointBackgroundColor: '#00F0FF',
              pointBorderColor: '#050811',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 8,
              pointHoverBackgroundColor: '#FFFFFF',
              pointHoverBorderColor: '#00F0FF',
            }
          ]
        },
        options: getTradingOptions()
      });

    } else if (viewMode === 'sector') {
      const sektorData = statistik?.distribusi_sektor || [
        { sektor: 'Swasta', total_nominal: 378000000000000 },
        { sektor: 'BUMN', total_nominal: 16925000000000 },
        { sektor: 'Kementerian', total_nominal: 8190100000000 },
        { sektor: 'Pemerintah Daerah', total_nominal: 90000000000 }
      ];

      const labels = sektorData.map(s => s.sektor);
      const dataValues = sektorData.map(s => +(s.total_nominal / 1000000000000).toFixed(2));

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Total Beban Kerugian per Sektor (Triliun Rp)',
            data: dataValues,
            backgroundColor: [
              'rgba(255, 26, 64, 0.85)',
              'rgba(0, 240, 255, 0.85)',
              'rgba(56, 189, 248, 0.85)',
              'rgba(245, 158, 11, 0.85)'
            ],
            borderColor: ['#FF1A40', '#00F0FF', '#38BDF8', '#F59E0B'],
            borderWidth: 2,
            borderRadius: 8,
            maxBarThickness: 48
          }]
        },
        options: getTradingOptions()
      });

    } else if (viewMode === 'candlestick') {
      let monthly = statistik?.fluktuasi_bulanan_2024 || [];
      if (timeframe === '1m') monthly = monthly.slice(-1);
      else if (timeframe === '6m') monthly = monthly.slice(-6);

      const labels = monthly.map(m => m.bulan.substring(0, 3).toUpperCase() + ' 24');
      const lossVals = monthly.map(m => m.kerugian_triliun);
      const recoveredVals = monthly.map(m => m.aset_disita_triliun);

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Kerugian Baru Teridentifikasi (Rp T)',
              data: lossVals,
              backgroundColor: monthly.map(m => m.kerugian_triliun > 20 ? 'rgba(255, 26, 64, 0.9)' : 'rgba(255, 68, 100, 0.75)'),
              borderColor: '#FF1A40',
              borderWidth: 1.5,
              borderRadius: 6,
            },
            {
              label: 'Aset Rampasan Negara Berhasil Pulih (Rp T)',
              data: recoveredVals,
              backgroundColor: 'rgba(0, 255, 136, 0.85)',
              borderColor: '#00FF88',
              borderWidth: 1.5,
              borderRadius: 6,
            }
          ]
        },
        options: getTradingOptions()
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [viewMode, timeframe, statistik]);

  function getTradingOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          labels: {
            color: '#F8FAFC',
            font: { family: 'JetBrains Mono, monospace', size: 11, weight: 'bold' as const },
            boxWidth: 10,
            boxHeight: 10,
            padding: 18
          }
        },
        tooltip: {
          backgroundColor: 'rgba(5, 8, 17, 0.95)',
          borderColor: 'rgba(0, 240, 255, 0.4)',
          borderWidth: 1,
          titleColor: '#00F0FF',
          bodyColor: '#F8FAFC',
          titleFont: { family: 'Orbitron, sans-serif', size: 12, weight: 'bold' as const },
          bodyFont: { family: 'JetBrains Mono, monospace', size: 12 },
          padding: 12,
          cornerRadius: 8,
          boxPadding: 6,
          callbacks: {
            label: (item: any) => ` [${item.dataset.label.split(':')[0]}]: Rp ${item.formattedValue} Triliun`
          }
        }
      },
      scales: {
        x: {
          grid: { 
            color: 'rgba(0, 240, 255, 0.08)',
            tickBorderDash: [3, 3]
          },
          ticks: { 
            color: '#94A3B8', 
            font: { family: 'JetBrains Mono, monospace', size: 11, weight: 'bold' as const } 
          }
        },
        y: {
          beginAtZero: true,
          grid: { 
            color: 'rgba(0, 240, 255, 0.08)',
            tickBorderDash: [3, 3]
          },
          ticks: {
            color: '#94A3B8',
            font: { family: 'JetBrains Mono, monospace', size: 11 },
            callback: (v: any) => 'Rp ' + v + ' T'
          }
        }
      }
    };
  }

  const liveAudits = statistik?.live_audit_feed || [
    { time: '11:45:20 WIB', action: 'BLOKIR REKENING', target: 'Kasus PT Timah / Harvey Moeis', nominal: 'Rp 76.5 Miliar', status: 'CONFIRMED' },
    { time: '10:12:05 WIB', action: 'PENYITAAN ASET FISIK', target: 'Surya Darmadi (PT Duta Palma)', nominal: '3 Unit Helikopter & Sawit', status: 'EXECUTED' },
    { time: '09:30:15 WIB', action: 'EKSEKUSI UANG PENGGANTI', target: 'Setya Novanto (e-KTP)', nominal: 'USD 7.3 Juta (Cicilan)', status: 'DEPOSITED' },
    { time: '08:15:00 WIB', action: 'FORENSIK FINANSIAL', target: 'Rafael Alun Trisambodo', nominal: 'Safe Deposit Box Rp 37 M', status: 'VERIFIED' }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Terminal Header Breadcrumbs & Status Bar */}
      <div className="cyber-panel p-5 rounded-2xl border border-[#00F0FF]/25 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs">
            <span className="led-indicator led-green"></span>
            <span className="text-[#00F0FF] font-bold uppercase tracking-wider">
              CYBER TRADING PLATFORM // PAIR: KPK-RECOVERY/IDR
            </span>
            <span className="px-2 py-0.5 rounded bg-[#FF1A40]/15 text-[#FF1A40] text-[10px] font-bold border border-[#FF1A40]/30 font-mono">
              [LIVE FORENSICS]
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2 font-display">
            Live Financial & Asset Intelligence Terminal
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-sans">
            Dasbor audit keuangan bergaya TradingView & Bloomberg Terminal. Memantau dinamika kerugian negara versus efektivitas perampasan aset (Asset Forfeiture Engine).
          </p>
        </div>

        {/* HUD Quick Metrics */}
        <div className="flex items-center gap-3 font-mono">
          <div className="bg-[#050811] border border-[#00F0FF]/30 px-4 py-2.5 rounded-xl text-right shadow-[inset_0_1px_10px_rgba(0,240,255,0.08)]">
            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
              RECOVERY RATE
            </span>
            <div className="text-xl font-black text-[#00FF88] flex items-center justify-end gap-1 font-mono">
              <span>9.52%</span>
              <span className="text-xs">▲</span>
            </div>
          </div>
          
          <a
            href="/analisis.html"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-3 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-[#050811] border border-[#00F0FF]/40 text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            title="Buka Layar Penuh analisis.html"
          >
            <span>FULLSCREEN</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Main Terminal Workstation Frame */}
      <div className="cyber-panel border border-[#00F0FF]/30 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Terminal Header Toolbar */}
        <div className="terminal-hud-bar flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-[#090D16] border-b border-[#00F0FF]/25 p-3 sm:p-4">
          
          {/* View Mode Selectors (Tab Style) */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="px-2.5 py-1.5 rounded bg-[#050811] border border-[#00F0FF]/30 text-[#00F0FF] font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
              MODE:
            </div>
            <button
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'overview'
                  ? 'bg-[#00F0FF] text-[#050811] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white bg-[#050811] border border-slate-800'
              }`}
            >
              📈 KERUGIAN VS PEMULIHAN
            </button>
            <button
              onClick={() => setViewMode('sector')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'sector'
                  ? 'bg-[#00F0FF] text-[#050811] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white bg-[#050811] border border-slate-800'
              }`}
            >
              📊 KERUGIAN PER SEKTORE
            </button>
            <button
              onClick={() => setViewMode('candlestick')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'candlestick'
                  ? 'bg-[#00F0FF] text-[#050811] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white bg-[#050811] border border-slate-800'
              }`}
            >
              🕯️ FLUKTUASI BULANAN 2024
            </button>
          </div>

          {/* Timeframe Selectors Styled Like Trading Intervals: [1D] [1W] [1M] [1Y] [ALL] */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#00F0FF]" /> TIMEFRAME:
            </span>
            <div className="bg-[#050811] p-1 rounded-lg border border-[#00F0FF]/25 flex gap-1">
              {[
                { id: '1m', label: '[1M]' },
                { id: '6m', label: '[6M]' },
                { id: '1y', label: '[1Y]' },
                { id: 'all', label: '[ALL]' }
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id as TimeframeOption)}
                  className={`px-2.5 py-1 rounded font-bold font-mono transition-all cursor-pointer ${
                    timeframe === tf.id
                      ? 'bg-[#00F0FF] text-[#050811] shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chart Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Main Chart Area */}
          <div className="lg:col-span-8 p-4 sm:p-6 bg-[#050811]/95 border-b lg:border-b-0 lg:border-r border-[#00F0FF]/20">
            <div className="flex items-center justify-between mb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">DATA SCALE:</span>
                <span className="text-[#00F0FF] font-bold">TRILIUN RUPIAH (IDR)</span>
                <span className="hidden sm:inline text-slate-500">// CROSSHAIR MATRIX</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF1A40] shadow-[0_0_8px_#FF1A40]"></span> 
                  <span className="text-slate-300">Beban Kerugian</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"></span> 
                  <span className="text-slate-300">Aset Dirampas</span>
                </span>
              </div>
            </div>

            <div className="h-80 sm:h-96 w-full relative">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>

          {/* Live Orderbook / Forensic Feed */}
          <div className="lg:col-span-4 p-4 sm:p-5 bg-[#090D16]/90 flex flex-col justify-between border-l border-[#00F0FF]/15">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#00F0FF]/20 mb-3 font-mono">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <span className="led-indicator led-green"></span>
                  LIVE FORENSIC FEED
                </span>
                <span className="text-[10px] text-[#00F0FF] px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                  256-BIT ENCRYPTED
                </span>
              </div>

              <div className="space-y-2.5 font-mono">
                {liveAudits.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#050811] border border-slate-800/80 hover:border-[#00F0FF]/50 transition-all group">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-[#00F0FF] font-bold">{item.time}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#00FF88]/15 text-[#00FF88] text-[10px] font-bold border border-[#00FF88]/30">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-[#00F0FF] transition-colors">{item.action}</div>
                    <div className="text-[11px] text-slate-400 truncate">{item.target}</div>
                    <div className="text-xs font-black text-[#FF1A40] mt-1 font-mono">{item.nominal}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#00F0FF]/20 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>FORENSIC HOST STATUS:</span>
              <span className="text-[#00FF88] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" /> ONLINE / STABLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
