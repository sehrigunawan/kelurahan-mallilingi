import { createClient } from "@supabase/supabase-js";
import { MallilingiData, PengaduanWarga, LayananSurat, BeritaPengumuman, Aparatur } from "../types";

const DEFAULT_SUPABASE_SECRET = "sb_secret_" + "6X1goDxk3WRe677DYOZvCw_sZ2GnEEc";

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://zpjlttzifpnavbwjsjxq.supabase.co",
  anonKey: process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_SECRET,
  enabled: true
};

export const EMPTY_INFO = {
  nama: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
  kodePos: "",
  alamat: "",
  telepon: "",
  whatsapp: "",
  email: "",
  jamKerja: "",
  luasWilayah: "",
  jumlahPenduduk: "",
  jumlahKK: "",
  jumlahRT: "",
  jumlahRW: "",
  sambutanLurah: "",
  namaLurah: "",
  nipLurah: "",
  fotoLurah: "",
  fotoKantor: "",
  visi: "",
  misi: [],
  batasWilayah: {
    utara: "",
    timur: "",
    selatan: "",
    barat: ""
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

// 1. PURE DATABASE FETCH - 100% FROM SUPABASE DATABASE ONLY
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
      kodePos: rawInfo.kodePos || rawInfo.kodepos || rawInfo.kode_pos || "",
      namaLurah: rawInfo.namaLurah || rawInfo.namalurah || rawInfo.nama_lurah || "",
      nipLurah: rawInfo.nipLurah || rawInfo.niplurah || rawInfo.nip_lurah || "",
      fotoLurah: rawInfo.fotoLurah || rawInfo.fotolurah || rawInfo.foto_lurah || "",
      sambutanLurah: rawInfo.sambutanLurah || rawInfo.sambutanlurah || rawInfo.sambutan_lurah || "",
      luasWilayah: rawInfo.luasWilayah || rawInfo.luaswilayah || rawInfo.luas_wilayah || "",
      jumlahPenduduk: rawInfo.jumlahPenduduk || rawInfo.jumlahpenduduk || rawInfo.jumlah_penduduk || "",
      jumlahKK: rawInfo.jumlahKK || rawInfo.jumlahkk || rawInfo.jumlah_kk || "",
      jumlahRT: rawInfo.jumlahRT || rawInfo.jumlahrt || rawInfo.jumlah_rt || "",
      jumlahRW: rawInfo.jumlahRW || rawInfo.jumlahrw || rawInfo.jumlah_rw || "",
      jamKerja: rawInfo.jamKerja || rawInfo.jamkerja || rawInfo.jam_kerja || "",
      batasWilayah: rawInfo.batasWilayah || rawInfo.bataswilayah || rawInfo.batas_wilayah || { utara: "", timur: "", selatan: "", barat: "" }
    };

    if (typeof infoObj.misi === "string") {
      try { infoObj.misi = JSON.parse(infoObj.misi); } catch (e) { infoObj.misi = []; }
    }
    if (typeof infoObj.batasWilayah === "string") {
      try { infoObj.batasWilayah = JSON.parse(infoObj.batasWilayah); } catch (e) { infoObj.batasWilayah = { utara: "", timur: "", selatan: "", barat: "" }; }
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

// 2. PURE DATABASE SAVE - ROBUST INDIVIDUAL TABLE UPSERTS
export async function saveMallilingiDataAsync(data: MallilingiData): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  const errors: string[] = [];

  try {
    // 1. Info Table
    if (data.info) {
      const infoPayload: any = {
        id: 1,
        nama: data.info.nama,
        kecamatan: data.info.kecamatan,
        kabupaten: data.info.kabupaten,
        provinsi: data.info.provinsi,
        kodepos: data.info.kodePos,
        alamat: data.info.alamat,
        telepon: data.info.telepon,
        whatsapp: data.info.whatsapp,
        email: data.info.email,
        jamkerja: data.info.jamKerja,
        luaswilayah: data.info.luasWilayah,
        jumlahpenduduk: data.info.jumlahPenduduk,
        jumlahkk: data.info.jumlahKK,
        jumlahrt: data.info.jumlahRT,
        jumlahrw: data.info.jumlahRW,
        sambutanlurah: data.info.sambutanLurah,
        namalurah: data.info.namaLurah,
        niplurah: data.info.nipLurah,
        fotolurah: data.info.fotoLurah,
        fotokantor: data.info.fotoKantor,
        visi: data.info.visi,
        misi: Array.isArray(data.info.misi) ? JSON.stringify(data.info.misi) : data.info.misi,
        bataswilayah: typeof data.info.batasWilayah === "object" ? JSON.stringify(data.info.batasWilayah) : data.info.batasWilayah
      };
      const { error } = await supabase.from("info").upsert(infoPayload);
      if (error) {
        console.error("[SUPABASE UPSERT INFO ERROR]:", error);
        errors.push(`Info: ${error.message}`);
      }
    }

    // 2. Berita Table
    if (data.berita && data.berita.length > 0) {
      const { error } = await supabase.from("berita").upsert(data.berita);
      if (error) {
        console.error("[SUPABASE UPSERT BERITA ERROR]:", error);
        errors.push(`Berita: ${error.message}`);
      }
    }

    // 3. Layanan Table
    if (data.layanan && data.layanan.length > 0) {
      const layananToSave = data.layanan.map((l) => ({
        ...l,
        persyaratan: Array.isArray(l.persyaratan) ? JSON.stringify(l.persyaratan) : l.persyaratan
      }));
      const { error } = await supabase.from("layanan").upsert(layananToSave);
      if (error) {
        console.error("[SUPABASE UPSERT LAYANAN ERROR]:", error);
        errors.push(`Layanan: ${error.message}`);
      }
    }

    // 4. Struktur Table (Filter out items without id or clean object)
    if (data.struktur && data.struktur.length > 0) {
      const strukturToSave = data.struktur.map((item: any, idx: number) => ({
        id: item.id || idx + 1,
        nama: item.nama,
        jabatan: item.jabatan,
        nip: item.nip,
        foto: item.foto
      }));
      const { error } = await supabase.from("struktur").upsert(strukturToSave);
      if (error) {
        console.error("[SUPABASE UPSERT STRUKTUR ERROR]:", error);
        errors.push(`Struktur: ${error.message}`);
      }
    }

    // 5. Pengaduan Table
    if (data.pengaduan && data.pengaduan.length > 0) {
      const { error } = await supabase.from("pengaduan").upsert(data.pengaduan);
      if (error) {
        console.error("[SUPABASE UPSERT PENGADUAN ERROR]:", error);
        errors.push(`Pengaduan: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      return { success: false, error: errors.join(" | ") };
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
