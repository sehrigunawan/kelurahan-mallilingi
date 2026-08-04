import { createClient } from "@supabase/supabase-js";
import { MallilingiData, PengaduanWarga } from "../types";

export const SUPABASE_CONFIG = {
  url: "https://zpjlttzifpnavbwjsjxq.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwanR0emlmcG5hdmJ3anNqeHEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1NDA3ODA5MywiZXhwIjoyMDY5NjU0MDkzfQ.dummyKeyIfAny",
  enabled: true
};

export const EMPTY_MALLILINGI_DATA: MallilingiData = {
  info: {
    nama: "Kelurahan Mallilingi",
    kecamatan: "Kecamatan Bantaeng",
    kabupaten: "Kabupaten Bantaeng",
    provinsi: "Sulawesi Selatan",
    kodePos: "92411",
    alamat: "Jl. Sungai Calendu, Kel. Mallilingi, Kec. Bantaeng, Kab. Bantaeng, Sulawesi Selatan 92411",
    telepon: "(0413) 21001",
    whatsapp: "6285255551234",
    email: "kelurahanmallilingi@gmail.com",
    jamKerja: "Senin - Jumat: 08.00 - 16.00 WITA",
    luasWilayah: "0.84 km²",
    jumlahPenduduk: "3.420 Jiwa",
    jumlahKK: "890 KK",
    jumlahRT: "25 RT",
    jumlahRW: "8 RW",
    sambutanLurah: "Selamat datang di portal resmi Kelurahan Mallilingi. Kami berkomitmen memberikan pelayanan publik yang ramah, transparan, cepat, dan mengayomi bagi seluruh masyarakat Kelurahan Mallilingi.",
    namaLurah: "ILHAM",
    nipLurah: "Kepala Kelurahan Mallilingi",
    fotoLurah: "/assets/images/default_profile.jpg",
    fotoKantor: "/assets/images/kantor_kelurahan.jpg",
    visi: "Mengutamakan pelayanan kemandirian dan keamanan untuk kemajuan atas iman dan taqwa.",
    misi: [
      "Meningkatkan mutu pelayanan serta kualitas hidup masyarakat.",
      "Memperkuat lembaga-lembaga kemasyarakatan sebagai wadah untuk memotivasi masyarakat dalam meningkatkan partisipasinya.",
      "Mengendalikan sistem keamanan lingkungan ketertiban masyarakat.",
      "Menggalang potensi pemuda yang berhubungan dengan kemandirian dan kreatifitas, dalam rangka membangun ketegaran pemuda memasuki era globalisasi.",
      "Melibatkan sektor swasta dalam meningkatkan kemitraan."
    ],
    batasWilayah: {
      utara: "Desa Ulugalung",
      timur: "Kelurahan Lembang",
      selatan: "Kelurahan Letta",
      barat: "Kelurahan Pallantikang"
    }
  },
  layanan: [],
  berita: [],
  struktur: [],
  pengaduan: [],
  rwRtList: []
};

export const DEFAULT_MALLILINGI_DATA = EMPTY_MALLILINGI_DATA;
export const DEFAULT_RW_RT_LIST: any[] = [];

let supabaseClient: any = null;
if (SUPABASE_CONFIG.enabled && !SUPABASE_CONFIG.url.includes("your-project")) {
  try {
    supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  } catch (e) {
    console.warn("Supabase client init fallback:", e);
  }
}

export async function getMallilingiDataAsync(): Promise<MallilingiData> {
  if (supabaseClient) {
    try {
      const [infoRes, beritaRes, layananRes, strukturRes, pengaduanRes, rwRtRes] = await Promise.all([
        supabaseClient.from("info").select("*").single(),
        supabaseClient.from("berita").select("*").order("created_at", { ascending: false }),
        supabaseClient.from("layanan").select("*"),
        supabaseClient.from("struktur").select("*"),
        supabaseClient.from("pengaduan").select("*").order("created_at", { ascending: false }),
        supabaseClient.from("rw_rt_list").select("*")
      ]);

      let infoObj = EMPTY_MALLILINGI_DATA.info;
      if (infoRes.data) {
        let rawInfo = infoRes.data;
        infoObj = {
          ...EMPTY_MALLILINGI_DATA.info,
          ...rawInfo,
          kodePos: rawInfo.kodePos || rawInfo.kodepos || rawInfo.kode_pos || EMPTY_MALLILINGI_DATA.info.kodePos,
          namaLurah: rawInfo.namaLurah || rawInfo.namalurah || rawInfo.nama_lurah || EMPTY_MALLILINGI_DATA.info.namaLurah,
          nipLurah: rawInfo.nipLurah || rawInfo.niplurah || rawInfo.nip_lurah || EMPTY_MALLILINGI_DATA.info.nipLurah,
          fotoLurah: rawInfo.fotoLurah || rawInfo.fotolurah || rawInfo.foto_lurah || EMPTY_MALLILINGI_DATA.info.fotoLurah,
          sambutanLurah: rawInfo.sambutanLurah || rawInfo.sambutanlurah || rawInfo.sambutan_lurah || EMPTY_MALLILINGI_DATA.info.sambutanLurah,
          luasWilayah: rawInfo.luasWilayah || rawInfo.luaswilayah || rawInfo.luas_wilayah || EMPTY_MALLILINGI_DATA.info.luasWilayah,
          jumlahPenduduk: rawInfo.jumlahPenduduk || rawInfo.jumlahpenduduk || rawInfo.jumlah_penduduk || EMPTY_MALLILINGI_DATA.info.jumlahPenduduk,
          jumlahKK: rawInfo.jumlahKK || rawInfo.jumlahkk || rawInfo.jumlah_kk || EMPTY_MALLILINGI_DATA.info.jumlahKK,
          jumlahRT: rawInfo.jumlahRT || rawInfo.jumlahrt || rawInfo.jumlah_rt || EMPTY_MALLILINGI_DATA.info.jumlahRT,
          jumlahRW: rawInfo.jumlahRW || rawInfo.jumlahrw || rawInfo.jumlah_rw || EMPTY_MALLILINGI_DATA.info.jumlahRW,
          jamKerja: rawInfo.jamKerja || rawInfo.jamkerja || rawInfo.jam_kerja || EMPTY_MALLILINGI_DATA.info.jamKerja,
        };

        if (typeof infoObj.misi === "string") {
          try { infoObj.misi = JSON.parse(infoObj.misi); } catch (e) { infoObj.misi = EMPTY_MALLILINGI_DATA.info.misi; }
        }
        if (typeof infoObj.batasWilayah === "string") {
          try { infoObj.batasWilayah = JSON.parse(infoObj.batasWilayah); } catch (e) { infoObj.batasWilayah = EMPTY_MALLILINGI_DATA.info.batasWilayah; }
        }
      }

      let layananList = (layananRes.data || []).map((item: any) => {
        let persy = item.persyaratan;
        if (typeof persy === "string") {
          try { persy = JSON.parse(persy); } catch (e) { persy = []; }
        }
        return {
          ...item,
          persyaratan: Array.isArray(persy) ? persy : []
        };
      });

      return {
        info: infoObj,
        berita: beritaRes.data || [],
        layanan: layananList || [],
        struktur: strukturRes.data || [],
        pengaduan: pengaduanRes.data || [],
        rwRtList: rwRtRes.data || []
      };
    } catch (err) {
      console.warn("Supabase database fetch error:", err);
    }
  }
  return EMPTY_MALLILINGI_DATA;
}

export async function saveMallilingiDataAsync(data: MallilingiData): Promise<void> {
  if (supabaseClient) {
    try {
      await Promise.all([
        supabaseClient.from("info").upsert({ id: 1, ...data.info }),
        supabaseClient.from("berita").upsert(data.berita),
        supabaseClient.from("layanan").upsert(data.layanan),
        supabaseClient.from("struktur").upsert(data.struktur),
        supabaseClient.from("pengaduan").upsert(data.pengaduan)
      ]);
    } catch (e) {
      console.error("Supabase async save error:", e);
    }
  }
}

export async function sendPengaduanWargaAsync(aduan: { nama: string; telepon: string; kategori: string; judul: string; isi: string }): Promise<boolean> {
  const newAduan: PengaduanWarga = {
    id: `aduan-${Date.now()}`,
    tanggal: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
    nama: aduan.nama,
    nik: "-",
    telepon: aduan.telepon,
    kategori: aduan.kategori,
    judul: aduan.judul,
    isi: aduan.isi,
    status: "Baru"
  };

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from("pengaduan").insert([newAduan]);
      if (error) console.error("Error inserting pengaduan to Supabase:", error);
    } catch (e) {
      console.error("Supabase insert pengaduan error:", e);
    }
  }
  return true;
}
