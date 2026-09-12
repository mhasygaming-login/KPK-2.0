import React from 'react';
import { X, ExternalLink, ShieldAlert, Calendar, Building2, User, Scale, DollarSign, Lock, Crosshair } from 'lucide-react';
import { Pelaku } from '../types.ts';

interface PelakuModalProps {
  pelaku: Pelaku | null;
  onClose: () => void;
}

export const PelakuModal: React.FC<PelakuModalProps> = ({ pelaku, onClose }) => {
  if (!pelaku) return null;

  const isTerpidana = pelaku.status_hukum.toLowerCase().includes('terpidana');
  const isTersangka = pelaku.status_hukum.toLowerCase().includes('tersangka');

  return (
    <div className="fixed inset-0 z-50 bg-[#050811]/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="cyber-panel rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] relative border border-[#00F0FF]/40 my-8 max-h-[90vh] overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Brackets */}
        <div className="corner-bracket-tl"></div>
        <div className="corner-bracket-br"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-[#00F0FF] p-2 rounded-xl bg-[#050811] hover:bg-[#00F0FF]/15 border border-[#00F0FF]/25 transition-all cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dossier Terminal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-[#00F0FF]/20">
          <div className="dossier-frame w-20 h-20 sm:w-24 sm:h-24 shrink-0 relative">
            <div className="scanline-beam"></div>
            <img
              src={pelaku.foto_url}
              alt={pelaku.nama}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#00F0FF] tracking-wider mb-1 flex items-center gap-1.5">
              <span className="led-indicator led-red"></span>
              TARGET INTELLIGENCE DOSSIER // {pelaku.id}
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">{pelaku.nama}</h2>
              <span className="text-sm font-bold text-slate-400 font-mono">({pelaku.alias})</span>
            </div>
            <p className="text-sm font-semibold text-[#00F0FF] font-mono">{pelaku.jabatan}</p>
            
            <div className="mt-2.5 flex flex-wrap items-center gap-2 font-mono">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
                  isTerpidana
                    ? 'bg-[#FF1A40]/15 text-[#FF1A40] border-[#FF1A40]/40 shadow-[0_0_10px_rgba(255,26,64,0.3)]'
                    : isTersangka
                    ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                    : 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40'
                }`}
              >
                [{pelaku.status_hukum.toUpperCase()}]
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#050811] text-slate-300 border border-slate-800">
                TAHUN: {pelaku.tahun_penindakan}
              </span>
            </div>
          </div>
        </div>

        {/* Financial Loss Highlight Card (Cyber Glassmorphism with Neon Crimson Glow) */}
        <div className="my-6 p-5 rounded-2xl bg-[#050811] border border-[#FF1A40]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono shadow-[0_0_20px_rgba(255,26,64,0.2)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 block">
              TOTAL ESTIMASI KERUGIAN KEUANGAN NEGARA
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#FF1A40] mt-0.5 glow-crimson">
              {pelaku.nominal_formatted}
            </div>
            <span className="text-xs text-slate-400">
              Angka Riil: Rp {pelaku.nominal_kerugian.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-300 space-y-1">
            <div><strong className="text-white">Instansi:</strong> {pelaku.instansi}</div>
            <div><strong className="text-white">Status Eksekusi:</strong> {isTerpidana ? 'Inkracht Tetap' : 'Proses Hukum'}</div>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-4 text-sm text-slate-300 font-mono">
          <div>
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#00F0FF]" />
              URAIAN PERKARA & MODUS OPERANDI:
            </h4>
            <p className="bg-[#050811] p-4 rounded-xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200 font-sans">
              {pelaku.kasus}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3 bg-[#050811] rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Status Penegakan Hukum</span>
              <strong className="text-white mt-1 block">{pelaku.status_hukum}</strong>
            </div>
            <div className="p-3 bg-[#050811] rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Klasifikasi Sektor</span>
              <strong className="text-white mt-1 block">{pelaku.instansi}</strong>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 pt-4 border-t border-[#00F0FF]/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#00FF88]" /> Sumber: Direktori Putusan MA / KPK RI
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-[#050811] border border-[#00F0FF]/40 font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.2)]"
          >
            TUTUP DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};
