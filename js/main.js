/**
 * Web Profile Kelurahan Mallilingi - Public Interactive Logic
 * Disusun untuk Proker Individu KKN
 */

document.addEventListener("DOMContentLoaded", async () => {
  const data = await getMallilingiDataAsync();
  
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 2. Render Hero & Info
  renderHeroInfo(data.info);

  // 3. Render Layanan & Search
  renderLayananList(data.layanan);
  setupLayananSearch(data.layanan);

  // 4. Render Berita
  renderBeritaGrid(data.berita);

  // 5. Render UMKM
  renderUMKMGrid(data.umkm);

  // 6. Render Struktur Organisasi
  renderStrukturGrid(data.struktur);

  // 7. Top Bar Mobile Ticker Animation
  initTopBarTicker();

  // 8. Mobile Auto Rotate & Touch Carousel for Profil, Layanan, Berita, UMKM, and Struktur
  initGenericMobileAutoRotate(".profil-grid", ".profil-mobile-card", 5500);
  initGenericMobileAutoRotate("#layananContainer", ".layanan-card", 5000);
  initGenericMobileAutoRotate("#beritaContainer", ".berita-card", 5500);
  initGenericMobileAutoRotate("#umkmContainer", ".umkm-card", 5500);
  initGenericMobileAutoRotate("#strukturContainer", ".struktur-card", 5500);
});

function toggleLurahCardView(view, btn) {
  const viewSambutan = document.getElementById("lurahViewSambutan");
  const viewVisiMisi = document.getElementById("lurahViewVisiMisi");
  if (!viewSambutan || !viewVisiMisi) return;

  const dots = document.querySelectorAll(".card-dot-btn");
  dots.forEach(d => d.classList.remove("active"));

  if (view === "sambutan") {
    viewSambutan.classList.add("active");
    viewVisiMisi.classList.remove("active");
    if (dots[0]) dots[0].classList.add("active");
  } else {
    viewVisiMisi.classList.add("active");
    viewSambutan.classList.remove("active");
    if (dots[1]) dots[1].classList.add("active");
  }
}

function initGenericMobileAutoRotate(containerSelector, cardSelector, intervalMs) {
  let activeIndex = 0;
  let isUserSwiping = false;
  let swipeTimer = null;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.addEventListener("touchstart", () => {
    isUserSwiping = true;
    clearTimeout(swipeTimer);
  }, { passive: true });

  container.addEventListener("touchend", () => {
    swipeTimer = setTimeout(() => {
      isUserSwiping = false;
    }, 6000);
  }, { passive: true });

  setInterval(() => {
    if (window.innerWidth <= 768 && !isUserSwiping) {
      // Skip auto-rotate if user is actively searching in Layanan
      if (containerSelector === "#layananContainer") {
        const searchInput = document.getElementById("searchLayananInput");
        if (searchInput && searchInput.value.trim() !== "") return;
      }

      const cards = container.querySelectorAll(cardSelector);
      if (cards.length <= 1) return;

      activeIndex = (activeIndex + 1) % cards.length;
      const targetCard = cards[activeIndex];
      if (targetCard) {
        const scrollLeft = targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth"
        });
      }
    }
  }, intervalMs);
}

function initTopBarTicker() {
  if (window.innerWidth > 768) return;

  const ticker = document.getElementById("topBarTicker");
  if (!ticker) return;

  const messages = [
    "📍 Jl. Sungai Calendu, Kel. Mallilingi (92411)",
    "📞 Hubungi Kantor: (0413) 21001",
    "🕒 Jam Kerja: Senin - Jumat (08.00 - 16.00 WITA)"
  ];
  let index = 0;

  setInterval(() => {
    if (window.innerWidth <= 768) {
      ticker.style.opacity = "0";
      setTimeout(() => {
        index = (index + 1) % messages.length;
        ticker.textContent = messages[index];
        ticker.style.opacity = "1";
      }, 400);
    }
  }, 3600);
}


// Render Hero & Info
function renderHeroInfo(info) {
  if (!info) return;

  const elSambutan = document.getElementById("sambutanText");
  const elLurahNama = document.getElementById("lurahNama");
  const elLurahNip = document.getElementById("lurahNip");
  const elFotoLurah = document.getElementById("fotoLurahImg");
  const elVisi = document.getElementById("visiText");
  const elMisi = document.getElementById("misiList");
  
  if (elSambutan) elSambutan.textContent = `"${info.sambutanLurah || DEFAULT_MALLILINGI_DATA.info.sambutanLurah}"`;
  if (elLurahNama) elLurahNama.textContent = info.namaLurah || DEFAULT_MALLILINGI_DATA.info.namaLurah;
  if (elLurahNip) elLurahNip.textContent = info.nipLurah || DEFAULT_MALLILINGI_DATA.info.nipLurah;
  if (elFotoLurah && info.fotoLurah) elFotoLurah.src = info.fotoLurah;
  
  if (elVisi) elVisi.textContent = info.visi || DEFAULT_MALLILINGI_DATA.info.visi;
  if (elMisi && Array.isArray(info.misi)) {
    elMisi.innerHTML = info.misi.map(m => `<li>${m}</li>`).join("");
  }

  // Set stats
  const statPenduduk = document.getElementById("statPenduduk");
  const statKK = document.getElementById("statKK");
  const statLuas = document.getElementById("statLuas");
  const statRT = document.getElementById("statRT");

  if (statPenduduk) statPenduduk.textContent = info.jumlahPenduduk || "3.420 Jiwa";
  if (statKK) statKK.textContent = info.jumlahKK || "890 KK";
  if (statLuas) statLuas.textContent = info.luasWilayah || "0.84 km²";
  if (statRT) statRT.textContent = (info.jumlahRW && info.jumlahRT) ? `${info.jumlahRW} / ${info.jumlahRT}` : "4 RW / 12 RT";
}

// Render Layanan Cards
function renderLayananList(layananList) {
  const container = document.getElementById("layananContainer");
  if (!container) return;

  if (layananList.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #64748b;">Belum ada data layanan administrasi.</div>`;
    return;
  }

  container.innerHTML = layananList.map((item, idx) => `
    <div class="layanan-card ${idx === 0 ? 'active' : ''}">
      <div>
        <span class="layanan-badge">${item.kategori || 'Layanan Umum'}</span>
        <h3>${item.judul}</h3>
        <div class="layanan-meta">
          <span>⏱️ ${item.waktu || '15-30 Menit'}</span>
          <span>💰 ${item.biaya || 'Gratis'}</span>
        </div>
        <p style="font-size:0.85rem; color:#64748b; margin-bottom:1rem;">
          Memerlukan ${item.persyaratan ? item.persyaratan.length : 0} dokumen persyaratan utama.
        </p>
      </div>
      <button class="btn btn-outline" style="width:100%;" onclick="openLayananDetail('${item.id}')">
        📋 Syarat & Alur Pengurusan
      </button>
    </div>
  `).join("");
}


// Search Layanan Filter
function setupLayananSearch(allLayanan) {
  const searchInput = document.getElementById("searchLayananInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = allLayanan.filter(item => 
      item.judul.toLowerCase().includes(query) || 
      (item.kategori && item.kategori.toLowerCase().includes(query))
    );
    renderLayananList(filtered);
  });
}

// Modal Layanan Detail
async function openLayananDetail(id) {
  const data = await getMallilingiDataAsync();
  const item = data.layanan.find(l => l.id === id);
  if (!item) return;

  const modal = document.getElementById("detailModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = item.judul;

  const syaratHtml = (item.persyaratan || [])
    .map(s => `<li style="margin-bottom:0.4rem;">${s}</li>`)
    .join("");

  const alurFormatted = (item.alur || "Hubungi kantor kelurahan untuk alur detail.")
    .split("\n")
    .map(line => `<p style="margin-bottom:0.4rem;">${line}</p>`)
    .join("");

  modalBody.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="layanan-badge">${item.kategori || 'Administrasi'}</span>
      <div style="display:flex; gap:1.5rem; margin-top:0.5rem; font-weight:600; font-size:0.9rem; color:#059669;">
        <div>⏱️ Estimasi Waktu: ${item.waktu || 'Terjangkau'}</div>
        <div>💰 Biaya: ${item.biaya || 'Gratis'}</div>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size:1.05rem; margin-bottom:0.5rem; color:#0f172a;">📄 Dokumen Persyaratan:</h4>
      <ul style="padding-left: 1.25rem; color:#334155; font-size:0.95rem;">
        ${syaratHtml}
      </ul>
    </div>

    <div>
      <h4 style="font-size:1.05rem; margin-bottom:0.5rem; color:#0f172a;">🔄 Alur Pengurusan:</h4>
      <div style="background:#f8fafc; border-left:3px solid #059669; padding:1rem; border-radius:6px; font-size:0.9rem; color:#334155;">
        ${alurFormatted}
      </div>
    </div>
    
    <div style="margin-top: 1.75rem; text-align:right;">
      <a href="https://wa.me/${data.info.whatsapp}?text=Halo%20Kelurahan%20Mallilingi,%20saya%20ingin%20bertanya%20mengenai%20${encodeURIComponent(item.judul)}" 
         target="_blank" 
         class="btn btn-primary" style="font-size:0.85rem;">
         💬 Tanya Petugas Pelayanan via WhatsApp
      </a>
    </div>
  `;

  modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("detailModal");
  if (modal) modal.classList.remove("active");
}

// Render Berita Grid
function renderBeritaGrid(beritaList) {
  const container = document.getElementById("beritaContainer");
  if (!container) return;

  if (beritaList.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b;">Belum ada berita atau pengumuman.</div>`;
    return;
  }

  container.innerHTML = beritaList.map((item, idx) => `
    <article class="berita-card ${idx === 0 ? 'active' : ''}">
      <img src="${item.gambar || 'assets/images/kantor_kelurahan.jpg'}" alt="${item.judul}" class="berita-img" />
      <div class="berita-body">
        <div>
          <div class="berita-date">📅 ${item.tanggal} • ${item.kategori || 'Pengumuman'}</div>
          <h3>${item.judul}</h3>
          <p>${item.ringkasan}</p>
        </div>
        <button class="btn btn-outline" style="font-size:0.8rem; padding:0.4rem 0.8rem; width:100%; margin-top:auto;" onclick="openBeritaDetail('${item.id}')">
          Baca Selengkapnya →
        </button>
      </div>
    </article>
  `).join("");
}

async function openBeritaDetail(id) {
  const data = await getMallilingiDataAsync();
  const item = data.berita.find(b => b.id === id);
  if (!item) return;

  const modal = document.getElementById("detailModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = item.judul;
  modalBody.innerHTML = `
    <div style="font-size:0.85rem; color:#059669; font-weight:600; margin-bottom:1rem;">
      📅 ${item.tanggal || 'Terbaru'} | Kategori: ${item.kategori || 'Pengumuman'}
    </div>
    <img src="${item.gambar || 'assets/images/kantor_kelurahan.jpg'}" style="width:100%; border-radius:10px; max-height:260px; object-fit:cover; margin-bottom:1rem;" />
    <p style="font-size:1rem; line-height:1.7; color:#1e293b; white-space: pre-line;">
      ${item.isi || item.konten || item.ringkasan}
    </p>
  `;

  modal.classList.add("active");
}

// Render UMKM Grid
function renderUMKMGrid(umkmList) {
  const container = document.getElementById("umkmContainer");
  if (!container) return;

  if (umkmList.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b;">Belum ada UMKM terdaftar.</div>`;
    return;
  }

  container.innerHTML = umkmList.map((item, idx) => `
    <div class="umkm-card ${idx === 0 ? 'active' : ''}">
      <div class="umkm-card-body">
        <span class="umkm-tag">${item.kategori || 'Produk Lokal'}</span>
        <h3 style="font-size:1.15rem; margin-top:0.3rem;">${item.nama}</h3>
        <p style="font-size:0.85rem; color:#64748b; margin-top:0.2rem;">👤 Pemilik: ${item.pemilik}</p>
        <div class="umkm-price">${item.harga}</div>
        <p class="desc">${item.deskripsi}</p>
        <p style="font-size:0.8rem; color:#94a3b8; margin-top:auto;">📍 ${item.lokasi}</p>
      </div>
      <a href="https://wa.me/${item.whatsapp || '6285255551234'}?text=Halo%20${encodeURIComponent(item.pemilik)},%20saya%20tertarik%20pesan%20${encodeURIComponent(item.nama)}" 
         target="_blank" 
         class="wa-order-btn">
        💬 Hubungi Penjual (WhatsApp)
      </a>
    </div>
  `).join("");
}

// Render Struktur Organisasi
function renderStrukturGrid(strukturList) {
  const container = document.getElementById("strukturContainer");
  if (!container) return;

  container.innerHTML = strukturList.map((item, idx) => `
    <div class="struktur-card ${idx === 0 ? 'active' : ''}">
      <div class="struktur-hover-bg">
        <img src="${item.foto || 'assets/images/lurah.jpg'}" alt="${item.nama}" />
        <div class="struktur-gradient-overlay"></div>
      </div>
      <div class="struktur-content">
        <div class="struktur-avatar-wrapper">
          <img src="${item.foto || 'assets/images/lurah.jpg'}" alt="${item.nama}" class="struktur-avatar" />
        </div>
        <div class="role">${item.jabatan}</div>
        <h4>${item.nama}</h4>
        <div class="nip">${item.nip}</div>
      </div>
    </div>
  `).join("");
}
