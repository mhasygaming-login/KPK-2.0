import React from 'react';
import { PhoneCall, ShieldAlert, CheckCircle, ExternalLink, Lock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080D1A] text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF1A40] flex items-center justify-center text-white shadow-lg shadow-red-500/30 border border-red-400/40">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  Komisi Pemberantasan Korupsi Republik Indonesia
                </span>
                <span className="text-[11px] font-mono text-[#00F0FF] font-semibold">
                  Sistem Transparansi Forensik Korupsi & Asset Recovery
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Instrumen transparansi data penindakan korupsi dan pemulihan aset berdasarkan putusan inkracht serta audit BPK & BPKP RI.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-lg bg-[#0F172A] text-slate-300 border border-slate-800">
                Gedung Merah Putih KPK, Jl. Kuningan Persada Kav. 4, Setiabudi, Jakarta Selatan
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2 text-xs font-mono">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3 text-cyan-400">
              Layanan Pengaduan
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2 text-white font-bold bg-[#0F172A] p-2 rounded-lg border border-slate-800">
                <PhoneCall className="w-4 h-4 text-rose-500 shrink-0" /> 
                <span>CALL CENTER: 198 (BEBAS PULSA)</span>
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>KWS: pengaduan.kpk.go.id</span>
              </p>
              <p className="text-slate-400">Email: pengaduan@kpk.go.id</p>
              <p className="text-slate-400">WhatsApp Resmi: 0811 955 198</p>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-2 text-xs font-mono">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3 text-cyan-400">
              Kepatuhan & Integritas
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" /> Enkripsi KWS End-to-End
              </p>
              <p>Lolos Aksesibilitas WCAG 2.1 AA/AAA</p>
              <p>Keterbukaan Informasi Publik UU No. 14/2008</p>
              <p>UU Tipikor No. 31/1999 jo. UU 20/2001</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <p>&copy; {new Date().getFullYear()} Komisi Pemberantasan Korupsi (KPK) RI. Cyber-Government Transparency Initiative.</p>
          <div className="flex items-center gap-4">
            <a href="https://kpk.go.id" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
              Portal KPK <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://jaga.id" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
              JAGA.id <ExternalLink className="w-3 h-3" />
            </a>
            <a href="/analisis.html" target="_blank" rel="noreferrer" className="hover:text-cyan-400 flex items-center gap-1 transition-colors">
              Terminal Standalone <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
