export interface Pelaku {
  id: string;
  nama: string;
  alias: string;
  jabatan: string;
  instansi: 'Swasta' | 'BUMN' | 'Kementerian' | 'Pemerintah Daerah' | string;
  kasus: string;
  nominal_kerugian: number;
  nominal_formatted: string;
  status_hukum: string;
  tahun_penindakan: number;
  foto_url: string;
  sumber_berita: string;
}

export interface TrenTahunan {
  tahun: number;
  nominal_kerugian: number;
  nominal_miliar: number;
  jumlah_kasus: number;
  tersangka: number;
  aset_disita_miliar: number;
}

export interface DistribusiSektor {
  sektor: string;
  persentase: number;
  total_nominal: number;
  total_kasus: number;
  warna: string;
}

export interface FluktuasiBulanan {
  bulan: string;
  kerugian_triliun: number;
  aset_disita_triliun: number;
  open: number;
  high: number;
  low: number;
  close: number;
  status: 'bullish' | 'bearish' | 'surge';
}

export interface LiveAuditFeedItem {
  time: string;
  action: string;
  target: string;
  nominal: string;
  status: string;
}

export interface StatistikData {
  ringkasan_nasional: {
    total_kerugian_negara: number;
    total_kerugian_formatted: string;
    total_tersangka: number;
    total_kasus_selesai: number;
    total_aset_disita: number;
    total_aset_disita_formatted: string;
    tingkat_pemulihan_aset_persen: number;
    kasus_aktif: number;
  };
  tren_tahunan: TrenTahunan[];
  distribusi_sektor: DistribusiSektor[];
  dampak_sosial_ekivalen: {
    gedung_sekolah_dasar: number;
    puskesmas_rawat_inap: number;
    bantuan_beasiswa_kuliah: number;
    kilometer_jalan_tol: number;
  };
  fluktuasi_bulanan_2024?: FluktuasiBulanan[];
  live_audit_feed?: LiveAuditFeedItem[];
}

export type ActiveTab = 'beranda' | 'analisis' | 'galeri' | 'edukasi' | 'laporan';
export type TimeframeOption = '1m' | '6m' | '1y' | 'all';
export type ChartViewMode = 'overview' | 'sector' | 'candlestick';
export type SortOption = 'highest' | 'lowest' | 'newest' | 'name';

