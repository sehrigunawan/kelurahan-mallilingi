/**
 * Akses Pengelolaan Media Terintegrasi - Admin Script
 * Kelurahan Mallilingi, Kecamatan Bantaeng
 * Disusun untuk Proker Individu KKN
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check Access Pin
  checkAdminAccess();
});

function checkAdminAccess() {
  const isAuth = sessionStorage.getItem("MALLILINGI_ADMIN_AUTH");
  if (!isAuth) {
    const pin = prompt("Masukkan PIN Akses Pengelolaan Media Kelurahan Mallilingi:\n(PIN Bawaan: 1234)");
    if (pin === "1234" || pin === "mallilingi") {
      sessionStorage.setItem("MALLILINGI_ADMIN_AUTH", "true");
      initAdminDashboard();
    } else {
      alert("PIN Salah! Akses ditolak.");
      window.location.href = "index.html";
    }
  } else {
    initAdminDashboard();
  }
}

async function initAdminDashboard() {
  const data = await getMallilingiDataAsync();
  loadAdminGeneralInfo(data);
  loadAdminBerita(data);
  loadAdminLayanan(data);
  loadAdminUMKM(data);
  loadAdminStruktur(data);
}

// -------------------------------------------------------------
// 1. INFORMASI GENERAL KELURAHAN
// -------------------------------------------------------------
function loadAdminGeneralInfo(dataParam) {
  const data = dataParam || getMallilingiData();
  const info = data.info;

  setValue("editNamaLurah", info.namaLurah);
  setValue("editNipLurah", info.nipLurah);
  setValue("editSambutan", info.sambutanLurah);
  setValue("editVisi", info.visi);
  setValue("editMisi", Array.isArray(info.misi) ? info.misi.join("\n") : info.misi);
  setValue("editAlamat", info.alamat);
  setValue("editTelepon", info.telepon);
  setValue("editWhatsapp", info.whatsapp);
  setValue("editEmail", info.email);
  setValue("editJamKerja", info.jamKerja);
  setValue("editJumlahPenduduk", info.jumlahPenduduk);
  setValue("editJumlahKK", info.jumlahKK);
  setValue("editLuasWilayah", info.luasWilayah);
}

async function saveGeneralInfoForm(e) {
  e.preventDefault();
  const data = await getMallilingiDataAsync();

  data.info.namaLurah = getValue("editNamaLurah");
  data.info.nipLurah = getValue("editNipLurah");
  data.info.sambutanLurah = getValue("editSambutan");
  data.info.visi = getValue("editVisi");
  data.info.misi = getValue("editMisi").split("\n").filter(line => line.trim() !== "");
  data.info.alamat = getValue("editAlamat");
  data.info.telepon = getValue("editTelepon");
  data.info.whatsapp = getValue("editWhatsapp");
  data.info.email = getValue("editEmail");
  data.info.jamKerja = getValue("editJamKerja");
  data.info.jumlahPenduduk = getValue("editJumlahPenduduk");
  data.info.jumlahKK = getValue("editJumlahKK");
  data.info.luasWilayah = getValue("editLuasWilayah");

  await saveMallilingiDataAsync(data);
  showToast("✅ Informasi Umum Kelurahan berhasil diperbarui!");
}

// -------------------------------------------------------------
// 2. MANAJEMEN BERITA & PENGUMUMAN
// -------------------------------------------------------------
function loadAdminBerita() {
  const data = getMallilingiData();
  const tbody = document.getElementById("adminBeritaTbody");
  if (!tbody) return;

  tbody.innerHTML = data.berita.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.judul}</strong></td>
      <td><span class="badge">${item.kategori || 'Berita'}</span></td>
      <td>${item.tanggal}</td>
      <td>
        <button class="btn-sm btn-danger" onclick="deleteBerita('${item.id}')">🗑️ Hapus</button>
      </td>
    </tr>
  `).join("");
}

function addBeritaPrompt() {
  const judul = prompt("Masukkan Judul Berita / Pengumuman Baru:");
  if (!judul) return;

  const kategori = prompt("Kategori Berita (misal: KKN, Sosmas, Pemerintahan):", "Pengumuman");
  const ringkasan = prompt("Ringkasan Singkat Berita:");
  const konten = prompt("Isi Lengkap Berita:");

  const data = getMallilingiData();
  const newNews = {
    id: "news-" + Date.now(),
    judul: judul,
    kategori: kategori || "Pengumuman",
    tanggal: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
    penulis: "Pemerintah Kelurahan",
    ringkasan: ringkasan || judul,
    konten: konten || ringkasan || judul,
    gambar: "assets/images/kantor_kelurahan.jpg"
  };

  data.berita.unshift(newNews);
  saveMallilingiData(data);
  loadAdminBerita();
  showToast("🎉 Berita baru berhasil diterbitkan!");
}

function deleteBerita(id) {
  if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
  const data = getMallilingiData();
  data.berita = data.berita.filter(b => b.id !== id);
  saveMallilingiData(data);
  loadAdminBerita();
  showToast("🗑️ Berita berhasil dihapus.");
}

// -------------------------------------------------------------
// 3. MANAJEMEN LAYANAN ADMINISTRASI
// -------------------------------------------------------------
function loadAdminLayanan() {
  const data = getMallilingiData();
  const tbody = document.getElementById("adminLayananTbody");
  if (!tbody) return;

  tbody.innerHTML = data.layanan.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.judul}</strong></td>
      <td>${item.kategori}</td>
      <td>${item.waktu}</td>
      <td>${item.biaya}</td>
      <td>
        <button class="btn-sm btn-danger" onclick="deleteLayanan('${item.id}')">🗑️ Hapus</button>
      </td>
    </tr>
  `).join("");
}

function addLayananPrompt() {
  const judul = prompt("Nama Layanan / Surat (Contoh: Surat Keterangan Domisili):");
  if (!judul) return;

  const kategori = prompt("Kategori (Kependudukan / Sosial / Usaha):", "Kependudukan");
  const waktu = prompt("Estimasi Waktu Penyelesaian:", "15 - 30 Menit");
  const syaratRaw = prompt("Persyaratan (pisahkan dengan koma):", "Pengantar RT/RW, Fotokopi KTP, Fotokopi KK");

  const data = getMallilingiData();
  const newLayanan = {
    id: "layanan-" + Date.now(),
    judul: judul,
    kategori: kategori || "Kependudukan",
    waktu: waktu || "15-30 Menit",
    biaya: "Gratis (Rp 0)",
    persyaratan: syaratRaw ? syaratRaw.split(",").map(s => s.trim()) : ["Pengantar RT/RW"],
    alur: "1. Pemohon membawa berkas ke kantor lurah.\n2. Verifikasi berkas oleh petugas.\n3. Pengesahan dokumen."
  };

  data.layanan.push(newLayanan);
  saveMallilingiData(data);
  loadAdminLayanan();
  showToast("📋 Layanan baru berhasil ditambahkan!");
}

function deleteLayanan(id) {
  if (!confirm("Hapus layanan ini dari daftar public?")) return;
  const data = getMallilingiData();
  data.layanan = data.layanan.filter(l => l.id !== id);
  saveMallilingiData(data);
  loadAdminLayanan();
  showToast("🗑️ Layanan berhasil dihapus.");
}

// -------------------------------------------------------------
// 4. MANAJEMEN UMKM
// -------------------------------------------------------------
function loadAdminUMKM() {
  const data = getMallilingiData();
  const tbody = document.getElementById("adminUMKMTbody");
  if (!tbody) return;

  tbody.innerHTML = data.umkm.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.nama}</strong></td>
      <td>${item.pemilik}</td>
      <td>${item.harga}</td>
      <td>${item.whatsapp}</td>
      <td>
        <button class="btn-sm btn-danger" onclick="deleteUMKM('${item.id}')">🗑️ Hapus</button>
      </td>
    </tr>
  `).join("");
}

function addUMKMPrompt() {
  const nama = prompt("Nama Usaha / Produk UMKM:");
  if (!nama) return;

  const pemilik = prompt("Nama Pemilik & Lokasi RT/RW:");
  const harga = prompt("Kisaran Harga (Contoh: Rp 15.000 / bungkus):", "Rp 15.000");
  const wa = prompt("Nomor WhatsApp Pemilik (Format: 628xxx):", "6285255551234");
  const deskripsi = prompt("Deskripsi Singkat Produk:");

  const data = getMallilingiData();
  const newUMKM = {
    id: "umkm-" + Date.now(),
    nama: nama,
    pemilik: pemilik || "Warga Mallilingi",
    kategori: "Produk Lokal",
    harga: harga || "Terjangkau",
    whatsapp: wa || data.info.whatsapp,
    deskripsi: deskripsi || "Produk lokal buatan warga Kelurahan Mallilingi.",
    lokasi: "Kelurahan Mallilingi"
  };

  data.umkm.push(newUMKM);
  saveMallilingiData(data);
  loadAdminUMKM();
  showToast("🛒 Produk UMKM baru berhasil ditambahkan!");
}

function deleteUMKM(id) {
  if (!confirm("Hapus UMKM ini dari katalog publik?")) return;
  const data = getMallilingiData();
  data.umkm = data.umkm.filter(u => u.id !== id);
  saveMallilingiData(data);
  loadAdminUMKM();
  showToast("🗑️ UMKM dihapus.");
}

// -------------------------------------------------------------
// 5. MANAJEMEN STRUKTUR ORGANISASI
// -------------------------------------------------------------
function loadAdminStruktur() {
  const data = getMallilingiData();
  const tbody = document.getElementById("adminStrukturTbody");
  if (!tbody) return;

  tbody.innerHTML = data.struktur.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.nama}</strong></td>
      <td>${item.jabatan}</td>
      <td>${item.nip}</td>
    </tr>
  `).join("");
}

// -------------------------------------------------------------
// 6. EXPORT / IMPORT DATA JSON (BACKUP & RESTORE)
// -------------------------------------------------------------
function exportDataJSON() {
  const data = getMallilingiData();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `backup_web_kelurahan_mallilingi_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("📦 Data cadangan (JSON) berhasil diunduh!");
}

function triggerImportJSON() {
  document.getElementById("importFileInput").click();
}

function handleImportJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (importedData.info && importedData.layanan && importedData.berita) {
        saveMallilingiData(importedData);
        initAdminDashboard();
        alert("🎉 Berhasil! Data website Kelurahan Mallilingi telah dipulihkan dari file backup.");
      } else {
        alert("❌ File JSON tidak valid untuk format data Kelurahan Mallilingi.");
      }
    } catch (err) {
      alert("❌ Error membaca file JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

function restoreDefaultData() {
  if (confirm("⚠️ Apakah Anda yakin ingin mengembalikan seluruh data ke setelan awal (Default KKN)? Semua perubahan baru akan diganti.")) {
    resetMallilingiData();
    initAdminDashboard();
    showToast("🔄 Data dikembalikan ke setelan awal.");
  }
}

// Utility Helpers
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value : "";
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || "";
}

function showToast(msg) {
  let toast = document.getElementById("adminToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "adminToast";
    toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#0f172a; color:#ffffff; padding:12px 24px; border-radius:10px; z-index:3000; box-shadow:0 4px 15px rgba(0,0,0,0.2); font-weight:600;";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}
