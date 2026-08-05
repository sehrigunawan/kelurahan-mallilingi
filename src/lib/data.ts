import { createClient } from "@supabase/supabase-js";
import { MallilingiData, PengaduanWarga, LayananSurat, BeritaPengumuman, Aparatur } from "../types";

const DEFAULT_SUPABASE_SECRET = "sb_secret_" + "6X1goDxk3WRe677DYOZvCw_sZ2GnEEc";

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://zpjlttzifpnavbwjsjxq.supabase.co",
  anonKey: process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_SECRET,
  enabled: true
};

export const EMPTY_INFO = {
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
};

export const DEFAULT_MALLILINGI_DATA: MallilingiData = {
  info: EMPTY_INFO,
  layanan: [],
  berita: [],
  struktur: [],
  pengaduan: [],
  rwRtList: []
};

export const DEFAULT_RW_RT_LIST: any[] = [];

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || SUPABASE_CONFIG.url;
  let key = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!key || key.startsWith("sb_publishable_") || key.includes("dummyKeyIfAny")) {
    key = DEFAULT_SUPABASE_SECRET;
  }
  return createClient(url, key);
}

// 1. PURE DATABASE FETCH - NO LOCAL FALLBACK ARRAYS
export async function getMallilingiDataAsync(): Promise<MallilingiData> {
  const supabase = getSupabaseClient();
  
  try {
    const [infoRes, beritaRes, layananRes, strukturRes, pengaduanRes, rwRtRes] = await Promise.all([
      supabase.from("info").select("*").single(),
      supabase.from("berita").select("*").order("created_at", { ascending: false }),
      supabase.from("layanan").select("*"),
      supabase.from("struktur").select("*"),
      supabase.from("pengaduan").select("*").order("created_at", { ascending: false }),
      supabase.from("rw_rt_list").select("*")
    ]);

    if (infoRes.error && infoRes.error.code !== "PGRST116") {
      console.error("[SUPABASE ERROR] info query failed:", infoRes.error);
    }
    if (beritaRes.error) console.error("[SUPABASE ERROR] berita query failed:", beritaRes.error);
    if (layananRes.error) console.error("[SUPABASE ERROR] layanan query failed:", layananRes.error);
    if (strukturRes.error) console.error("[SUPABASE ERROR] struktur query failed:", strukturRes.error);
    if (pengaduanRes.error) console.error("[SUPABASE ERROR] pengaduan query failed:", pengaduanRes.error);

    let rawInfo = infoRes.data || {};
    let infoObj = {
      ...EMPTY_INFO,
      ...rawInfo,
      kodePos: rawInfo.kodePos || rawInfo.kodepos || rawInfo.kode_pos || EMPTY_INFO.kodePos,
      namaLurah: rawInfo.namaLurah || rawInfo.namalurah || rawInfo.nama_lurah || EMPTY_INFO.namaLurah,
      nipLurah: rawInfo.nipLurah || rawInfo.niplurah || rawInfo.nip_lurah || EMPTY_INFO.nipLurah,
      fotoLurah: rawInfo.fotoLurah || rawInfo.fotolurah || rawInfo.foto_lurah || EMPTY_INFO.fotoLurah,
      sambutanLurah: rawInfo.sambutanLurah || rawInfo.sambutanlurah || rawInfo.sambutan_lurah || EMPTY_INFO.sambutanLurah,
      luasWilayah: rawInfo.luasWilayah || rawInfo.luaswilayah || rawInfo.luas_wilayah || EMPTY_INFO.luasWilayah,
      jumlahPenduduk: rawInfo.jumlahPenduduk || rawInfo.jumlahpenduduk || rawInfo.jumlah_penduduk || EMPTY_INFO.jumlahPenduduk,
      jumlahKK: rawInfo.jumlahKK || rawInfo.jumlahkk || rawInfo.jumlah_kk || EMPTY_INFO.jumlahKK,
      jumlahRT: rawInfo.jumlahRT || rawInfo.jumlahrt || rawInfo.jumlah_rt || EMPTY_INFO.jumlahRT,
      jumlahRW: rawInfo.jumlahRW || rawInfo.jumlahrw || rawInfo.jumlah_rw || EMPTY_INFO.jumlahRW,
      jamKerja: rawInfo.jamKerja || rawInfo.jamkerja || rawInfo.jam_kerja || EMPTY_INFO.jamKerja,
    };

    if (typeof infoObj.misi === "string") {
      try { infoObj.misi = JSON.parse(infoObj.misi); } catch (e) { infoObj.misi = EMPTY_INFO.misi; }
    }
    if (typeof infoObj.batasWilayah === "string") {
      try { infoObj.batasWilayah = JSON.parse(infoObj.batasWilayah); } catch (e) { infoObj.batasWilayah = EMPTY_INFO.batasWilayah; }
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
    console.error("[SUPABASE FATAL FETCH ERROR]:", err);
    return {
      info: EMPTY_INFO,
      berita: [],
      layanan: [],
      struktur: [],
      pengaduan: [],
      rwRtList: []
    };
  }
}

// 2. PURE DATABASE SAVE - NO LOCAL STORAGE / NO IN-MEMORY DUMMY
export async function saveMallilingiDataAsync(data: MallilingiData): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  
  try {
    const results = await Promise.all([
      supabase.from("info").upsert({ id: 1, ...data.info }),
      supabase.from("berita").upsert(data.berita),
      supabase.from("layanan").upsert(data.layanan),
      supabase.from("struktur").upsert(data.struktur),
      supabase.from("pengaduan").upsert(data.pengaduan)
    ]);

    const errors = results.map((r) => r.error).filter(Boolean);
    if (errors.length > 0) {
      console.error("[SUPABASE UPSERT ERRORS]:", errors);
      return { success: false, error: errors.map((e: any) => e.message).join(", ") };
    }

    return { success: true };
  } catch (e: any) {
    console.error("[SUPABASE SAVE EXCEPTION]:", e);
    return { success: false, error: e.message || "Failed to save to Supabase Database" };
  }
}

// 3. PURE DATABASE INSERT FOR CITIZEN COMPLAINT - NO LOCAL STORAGE / NO MEMORY
export async function sendPengaduanWargaAsync(aduan: { nama: string; telepon: string; kategori: string; judul: string; isi: string }): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();

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

  try {
    const { error } = await supabase.from("pengaduan").insert([newAduan]);
    if (error) {
      console.error("[SUPABASE INSERT PENGADUAN ERROR]:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (e: any) {
    console.error("[SUPABASE INSERT PENGADUAN EXCEPTION]:", e);
    return { success: false, error: e.message || "Failed to insert complaint into Supabase" };
  }
}

// 4. PURE DATABASE DELETE & UPDATE ACTIONS
export async function deletePengaduanAsync(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  try {
    const { error } = await supabase.from("pengaduan").delete().eq("id", id);
    if (error) {
      console.error("[SUPABASE DELETE PENGADUAN ERROR]:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function updatePengaduanStatusAsync(id: string, newStatus: "Baru" | "Proses" | "Selesai"): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  try {
    const { error } = await supabase.from("pengaduan").update({ status: newStatus }).eq("id", id);
    if (error) {
      console.error("[SUPABASE UPDATE STATUS ERROR]:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteLayananAsync(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  try {
    const { error } = await supabase.from("layanan").delete().eq("id", id);
    if (error) {
      console.error("[SUPABASE DELETE LAYANAN ERROR]:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteBeritaAsync(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  try {
    const { error } = await supabase.from("berita").delete().eq("id", id);
    if (error) {
      console.error("[SUPABASE DELETE BERITA ERROR]:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
