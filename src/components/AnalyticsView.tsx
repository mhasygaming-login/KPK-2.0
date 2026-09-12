import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { 
  BarChart3, 
  PieChart, 
  TrendingDown, 
  Layers, 
  Filter, 
  CheckCircle, 
  Info,
  Activity,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { Pelaku, StatistikData } from '../types.ts';
import { TradingTerminal } from './TradingTerminal.tsx';

interface AnalyticsViewProps {
  pelakuList: Pelaku[];
  statistik: StatistikData | null;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ pelakuList, statistik }) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartInstance = useRef<Chart | null>(null);

  const doughnutChartRef = useRef<HTMLCanvasElement | null>(null);
  const doughnutChartInstance = useRef<Chart | null>(null);

  // Filter pelaku based on selectedYear
  const filteredPelaku = selectedYear === 'all' 
    ? pelakuList 
    : pelakuList.filter(p => p.tahun_penindakan === parseInt(selectedYear));

  // Render or Update Bar Chart
  useEffect(() => {
    if (!barChartRef.current) return;

    const sorted = [...filteredPelaku].sort((a, b) => b.nominal_kerugian - a.nominal_kerugian);
    const top10 = sorted.slice(0, 10);

    const labels = top10.map(p => p.nama.length > 16 ? p.nama.substring(0, 16) + '...' : p.nama);
    const dataValues = top10.map(p => +(p.nominal_kerugian / 1000000000000).toFixed(2));

    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }

    const ctx = barChartRef.current.getContext('2d');
    if (!ctx) return;

    barChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Estimasi Kerugian (Triliun Rupiah)',
          data: dataValues,
          backgroundColor: '#EF4444',
          hoverBackgroundColor: '#DC2626',
          borderRadius: 6,
          borderWidth: 0,
          maxBarThickness: 40
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#E2E8F0',
              font: { family: 'ui-monospace, monospace', size: 12, weight: 'bold' as const }
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            borderColor: '#334155',
            borderWidth: 1,
            titleColor: '#38BDF8',
            bodyColor: '#F8FAFC',
            callbacks: {
              label: (item: any) => ` Nilai: Rp ${item.formattedValue} Triliun`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(51, 65, 85, 0.3)' },
            ticks: {
              color: '#94A3B8',
              font: { family: 'ui-monospace, monospace', size: 11 },
              callback: (v: any) => 'Rp ' + v + ' T'
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#94A3B8',
              font: { family: 'ui-monospace, monospace', size: 11 },
              maxRotation: 45,
              minRotation: 20
            }
          }
        }
      }
    });

    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [filteredPelaku]);

  // Render or Update Doughnut Chart Sektor
  useEffect(() => {
    if (!doughnutChartRef.current) return;

    const sektorAgg: Record<string, number> = {
      'Swasta': 0,
      'BUMN': 0,
      'Kementerian': 0,
      'Pemerintah Daerah': 0
    };

    filteredPelaku.forEach(p => {
      if (sektorAgg[p.instansi] !== undefined) {
        sektorAgg[p.instansi] += p.nominal_kerugian;
      } else {
        sektorAgg['Swasta'] += p.nominal_kerugian;
      }
    });

    const sectors = Object.keys(sektorAgg);
    const rawValues = sectors.map(s => +(sektorAgg[s] / 1000000000000).toFixed(2));
    const colors = ['#EF4444', '#06B6D4', '#3B82F6', '#F59E0B'];

    if (doughnutChartInstance.current) {
      doughnutChartInstance.current.destroy();
    }

    const ctx = doughnutChartRef.current.getContext('2d');
    if (!ctx) return;

    doughnutChartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: sectors,
        datasets: [{
          data: rawValues,
          backgroundColor: colors,
          borderColor: '#0F172A',
          borderWidth: 3,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 14,
              font: { family: 'ui-monospace, monospace', size: 12, weight: 'bold' as const },
              color: '#E2E8F0'
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            borderColor: '#334155',
            borderWidth: 1,
            titleColor: '#38BDF8',
            bodyColor: '#F8FAFC',
            callbacks: {
              label: (item: any) => ` ${item.label}: Rp ${item.formattedValue} Triliun`
            }
          }
        }
      }
    });

    return () => {
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }
    };
  }, [filteredPelaku]);

  const yearsList = ['all', '2024', '2023', '2022', '2021', '2020'];

  return (
    <div id="analisis" className="space-y-10 pb-12 pt-4">
      {/* 1. PRIMARY HIGH-TECH TRADING TERMINAL */}
      <TradingTerminal statistik={statistik} pelakuList={pelakuList} />

      {/* 2. SECONDARY DETAILED BREAKDOWN (Bar Chart Top 10 & Doughnut) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#0F172A] p-5 rounded-2xl border border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Rincian Perkara Besar & Matriks Sektoral
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Filter data berdasarkan tahun penindakan untuk melihat evolusi kasus dan distribusi sektor.
            </p>
          </div>

          {/* Year Range Filter Buttons */}
          <div className="bg-[#0A0F1D] p-1.5 rounded-xl border border-slate-800 flex flex-wrap items-center gap-1 font-mono">
            <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> TAHUN:
            </span>
            {yearsList.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-cyan-500 text-[#080D1A] shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {yr === 'all' ? 'Semua' : yr}
              </button>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bar Chart Top Cases */}
          <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-rose-400" />
                  10 Kasus Korupsi dengan Nominal Terbesar
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Besaran kerugian keuangan negara (Triliun Rupiah)
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                TOP 10
              </span>
            </div>
            <div className="h-80 w-full relative">
              <canvas ref={barChartRef} id="barChartKasus"></canvas>
            </div>
          </div>

          {/* Doughnut Chart Sektor */}
          <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-cyan-400" />
                  Distribusi Korupsi Berdasarkan Sektor
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Porsi kerugian: Swasta, BUMN, Kementerian, Pemda
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                SEKTORAL
              </span>
            </div>
            <div className="h-80 w-full relative flex items-center justify-center">
              <canvas ref={doughnutChartRef} id="doughnutChartSektor"></canvas>
            </div>
          </div>
        </div>

        {/* Sektor Breakdown Table */}
        <div className="glass-panel rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-[#0A0F1D] flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white">Matriks Evaluasi Risiko Sektoral Tindak Pidana Korupsi</h4>
              <p className="text-xs text-slate-400 font-mono">Hasil audit forensik BPK RI & strategi mitigasi KPK</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
              AUDIT VERIFIED
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead className="bg-[#0D1527] text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5 sm:p-4">Sektor Instansi</th>
                  <th className="p-3.5 sm:p-4">Porsi Kerugian</th>
                  <th className="p-3.5 sm:p-4">Total Kerugian Negara</th>
                  <th className="p-3.5 sm:p-4">Jumlah Perkara</th>
                  <th className="p-3.5 sm:p-4">Tingkat Kerentanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {statistik?.distribusi_sektor.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold flex items-center gap-2 text-white">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.warna }}></span>
                      {item.sektor}
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-cyan-300">{item.persentase} %</td>
                    <td className="p-3.5 sm:p-4 font-black text-rose-400">
                      Rp {(item.total_nominal / 1000000000000).toFixed(2)} Triliun
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium text-slate-300">{item.total_kasus} Kasus</td>
                    <td className="p-3.5 sm:p-4">
                      {item.persentase > 50 ? (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          Sangat Kritis
                        </span>
                      ) : item.persentase > 20 ? (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          Tinggi
                        </span>
                      ) : (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          Menengah
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
