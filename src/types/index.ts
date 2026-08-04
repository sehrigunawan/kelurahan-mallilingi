export interface InfoKelurahan {
  nama: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  alamat: string;
  telepon: string;
  whatsapp: string;
  email: string;
  jamKerja: string;
  luasWilayah: string;
  jumlahPenduduk: string;
  jumlahKK: string;
  jumlahRT: string;
  jumlahRW: string;
  sambutanLurah: string;
  namaLurah: string;
  nipLurah: string;
  fotoLurah: string;
  fotoKantor: string;
  visi: string;
  misi: string[];
  batasWilayah: {
    utara: string;
    timur: string;
    selatan: string;
    barat: string;
  };
}

export interface LayananSurat {
  id: string;
  judul: string;
  kategori: string;
  waktu: string;
  biaya: string;
  deskripsi: string;
  persyaratan: string[];
  alur: string;
}

export interface BeritaPengumuman {
  id: string;
  judul: string;
  tanggal: string;
  kategori: string;
  gambar: string;
  ringkasan: string;
  isi?: string;
  penulis?: string;
}

export interface Aparatur {
  nama: string;
  jabatan: string;
  nip: string;
  foto: string;
}

export interface PengurusRT {
  rt: string;
  nama: string;
}

export interface PengurusRW {
  rw: string;
  ketua: string;
  rtList: PengurusRT[];
}

export interface MallilingiData {
  info: InfoKelurahan;
  layanan: LayananSurat[];
  berita: BeritaPengumuman[];
  struktur: Aparatur[];
  rwRtList?: PengurusRW[];
}
