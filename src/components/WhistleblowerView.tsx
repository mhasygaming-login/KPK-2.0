import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  EyeOff, 
  Eye, 
  Copy, 
  Check,
  Send,
  HelpCircle,
  Gavel,
  Coins,
  Scale
} from 'lucide-react';

export const WhistleblowerView: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [kategori, setKategori] = useState('');
  const [instansi, setInstansi] = useState('');
  const [kronologi, setKronologi] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [nominal, setNominal] = useState('');
  const [namaPelapor, setNamaPelapor] = useState('');
  const [kontakPelapor, setKontakPelapor] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      const names = Array.from(e.dataTransfer.files).map((f: File) => f.name);
      setAttachedFiles(prev => [...prev, ...names]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const names = Array.from(e.target.files).map((f: File) => f.name);
      setAttachedFiles(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'KPK-KWS-2024-' + Math.floor(10000 + Math.random() * 90000) + 'X';
    setSubmittedCode(code);
  };

  const handleCopyCode = () => {
    if (!submittedCode) return;
    navigator.clipboard.writeText(submittedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="edukasi" className="space-y-10 pt-4">
      {/* Header Banner */}
      <div className="bg-[#0F172A] border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            WHISTLEBLOWING SYSTEM (KWS) KPK RI
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Edukasi Anti-Korupsi & Pengaduan Masyarakat
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Laporkan dugaan tindak pidana korupsi secara aman dengan perlindungan identitas penuh yang dijamin oleh Lembaga Perlindungan Saksi dan Korban (LPSK).
          </p>
        </div>

        <div className="bg-[#0A0F1D] border border-slate-800 p-4 rounded-xl font-mono text-xs text-right shrink-0">
          <div className="text-slate-400 uppercase text-[10px]">STANDAR ENKRIPSI</div>
          <div className="text-cyan-400 font-bold text-sm mt-0.5">256-BIT AES ENCRYPTED</div>
          <div className="text-emerald-400 text-[11px] mt-1 flex items-center justify-end gap-1">
            <Lock className="w-3 h-3" /> Anonymous Routing
          </div>
        </div>
      </div>

      {/* Part 1: 7 Tipologi Korupsi Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              7 Tipologi Tindak Pidana Korupsi (UU Tipikor)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Rujukan delik hukum korupsi berdasarkan UU No. 31/1999 jo. UU No. 20/2001
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-card p-5 rounded-xl border border-slate-800 hover:border-rose-500/60 transition-all">
            <div className="text-xs font-mono font-bold text-rose-400 mb-1">TIPOLOGI 01</div>
            <h4 className="font-bold text-white text-sm mb-1.5">Kerugian Keuangan Negara</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Perbuatan melawan hukum memperkaya diri atau korporasi yang secara nyata merugikan kas perbendaharaan negara atau daerah.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 hover:border-cyan-500/60 transition-all">
            <div className="text-xs font-mono font-bold text-cyan-400 mb-1">TIPOLOGI 02</div>
            <h4 className="font-bold text-white text-sm mb-1.5">Suap-Menyuap (Bribery)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Memberikan atau menjanjikan uang/fasilitas kepada pegawai negeri agar bertindak menyimpang dari kewajiban jabatannya.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 hover:border-amber-500/60 transition-all">
            <div className="text-xs font-mono font-bold text-amber-400 mb-1">TIPOLOGI 03</div>
            <h4 className="font-bold text-white text-sm mb-1.5">Gratifikasi Terlarang</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pemberian hadiah dalam bentuk apapun kepada penyelenggara negara yang tidak dilaporkan ke KPK dalam waktu 30 hari kerja.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 hover:border-rose-500/60 transition-all">
            <div className="text-xs font-mono font-bold text-rose-400 mb-1">TIPOLOGI 04</div>
            <h4 className="font-bold text-white text-sm mb-1.5">Pemerasan dalam Jabatan</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Penyalahgunaan kewenangan aparatur untuk memaksa seseorang memberikan sejumlah dana, fee, atau pemotongan hak anggaran.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 hover:border-cyan-500/60 transition-all">
            <div className="text-xs font-mono font-bold text-cyan-400 mb-1">TIPOLOGI 05</div>
            <h4 className="font-bold text-white text-sm mb-1.5">Penggelapan dalam Jabatan</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Menggelapkan atau memalsukan pembukuan daftar perbendaharaan negara yang diamanahkan dalam kewenangan jabatannya.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-slate-800 hover:border-amber-500/60 transition-all">
            <div className="text-xs font-mono font-bold text-amber-400 mb-1">TIPOLOGI 06 & 07</div>
            <h4 className="font-bold text-white text-sm mb-1.5">Kecurangan & Benturan Kepentingan</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kecurangan spesifikasi proyek pengadaan barang/jasa serta keterlibatan langsung dalam lelang yang seharusnya diawasi.
            </p>
          </div>
        </div>
      </div>

      {/* Part 2: Official Whistleblowing System (KWS) Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              Saluran Pengaduan Masyarakat (KWS Secure)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Data laporan Anda diverifikasi langsung oleh Tim Pengaduan Masyarakat KPK RI.
            </p>
          </div>

          {/* Anonymity Controls */}
          <div className="bg-[#0A0F1D] p-1.5 rounded-xl border border-slate-800 flex items-center gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsAnonymous(true)}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAnonymous
                  ? 'bg-cyan-500 text-[#080D1A] shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" /> Mode Anonim
            </button>
            <button
              type="button"
              onClick={() => setIsAnonymous(false)}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                !isAnonymous
                  ? 'bg-cyan-500 text-[#080D1A] shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Sertakan Identitas
            </button>
          </div>
        </div>

        {submittedCode ? (
          /* Submission Receipt Success Box */
          <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/40 text-emerald-200 space-y-4 font-mono">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white">Laporan Pengaduan Berhasil Dikirim!</h4>
                <p className="text-xs text-emerald-300 font-sans">
                  Berkas laporan Anda telah masuk ke antrean verifikasi Direktorat Pengaduan Masyarakat KPK RI secara terenkripsi.
                </p>
              </div>
            </div>

            <div className="bg-[#080D1A] p-4 rounded-xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-400 uppercase block">KODE TIKET RAHASIA ANDA</span>
                <span className="text-xl font-black text-cyan-300 tracking-wider">{submittedCode}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#080D1A] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Tersalin!' : 'Salin Kode Tiket'}
              </button>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Catat atau simpan kode di atas. KPK akan menindaklanjuti proses telaah dalam 3x24 jam kerja sesuai ketentuan standar SOP penanganan pengaduan masyarakat.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmittedCode(null);
                setKategori('');
                setInstansi('');
                setKronologi('');
                setAttachedFiles([]);
              }}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              &larr; Buat Pengaduan Baru Lainnya
            </button>
          </div>
        ) : (
          /* Form Inputs */
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isAnonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#080D1A] border border-cyan-500/30">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Nama Lengkap Pelapor <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={namaPelapor}
                    onChange={(e) => setNamaPelapor(e.target.value)}
                    placeholder="Nama asli Anda (Kerahasiaan Dijamin UU)"
                    className="w-full px-3 py-2 text-sm bg-[#0F172A] border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Nomor WhatsApp / Email Kontak <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={kontakPelapor}
                    onChange={(e) => setKontakPelapor(e.target.value)}
                    placeholder="0812xxxx atau email@domain.com"
                    className="w-full px-3 py-2 text-sm bg-[#0F172A] border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Kategori Dugaan Korupsi <span className="text-rose-400">*</span>
                </label>
                <select
                  required
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#080D1A] border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="">-- Pilih Jenis Tipologi --</option>
                  <option value="pengadaan">Pengadaan Barang & Jasa (PBJ)</option>
                  <option value="suap">Penyuapan / Uang Pelicin / Gratifikasi</option>
                  <option value="pemerasan">Pungutan Liar / Pemerasan Pegawai</option>
                  <option value="anggaran">Penyalahgunaan Dana APBN / APBD / Desa</option>
                  <option value="perizinan">Penyimpangan Izin Pertambangan & Hutan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Instansi / Lembaga / Korporasi Terlapor <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={instansi}
                  onChange={(e) => setInstansi(e.target.value)}
                  placeholder="Contoh: Dinas Bina Marga Prov. X / PT BUMN Y"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#080D1A] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Lokasi & Periode Waktu Kejadian
                </label>
                <input
                  type="text"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  placeholder="Contoh: Kota Semarang, Januari–Agustus 2024"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#080D1A] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Perkiraan Nilai Kerugian / Aliran Dana
                </label>
                <input
                  type="text"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  placeholder="Contoh: Rp 5.000.000.000 (Opsional jika diketahui)"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#080D1A] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                Uraian Kronologi Peristiwa & Modus Operandi <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={kronologi}
                onChange={(e) => setKronologi(e.target.value)}
                placeholder="Jelaskan secara ringkas dan runtut: Siapa yang terlibat, bagaimana rekayasa dokumen/lelang dibuat, nomor rekening tujuan aliran dana..."
                className="w-full p-3.5 text-sm bg-[#080D1A] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              ></textarea>
            </div>

            {/* File Upload Drag and Drop */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                Lampiran Bukti Dokumen Pendukung (PDF, JPG, PNG, DOCX - Maks 25MB)
              </label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-700 hover:border-cyan-500/70 rounded-2xl p-5 text-center bg-[#080D1A] transition-colors"
              >
                <UploadCloud className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Tarik & letakkan file bukti di sini, atau{' '}
                  <label className="text-cyan-400 hover:underline cursor-pointer">
                    pilih dari komputer
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Bukti transfer, invoice fiktif, risalah lelang, atau rekaman suara
                </p>

                {attachedFiles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    {attachedFiles.map((name, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Enkripsi 256-Bit SHA aktif. Laporan Anda terlindungi secara anonim.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black text-sm tracking-wider uppercase font-mono shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Kirim Pengaduan KWS
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
