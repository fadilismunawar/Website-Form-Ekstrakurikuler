const EKSKUL = [
  { id: "pramuka", nama: "Pramuka", ikon: "bi-compass", warna: "#2d2a1d", desk: "Pusat pelatihan kepemimpinan, kemandirian, dan ketahanan mental di alam terbuka.", foto: "assets/pramuka.jpeg" },
  { id: "paskibra", nama: "Paskibra", ikon: "bi-flag", warna: "#1c2137", desk: "Wadah pembentukan disiplin tinggi, kekompakan tim, dan rasa tanggung jawab baris-berbaris.", foto: "assets/paskibra.jpeg" },
  { id: "pmr", nama: "PMR", ikon: "bi-heart-pulse", warna: "#321d1d", desk: "Pusat belajar teknik pertolongan darurat serta aksi kepedulian kemanusiaan di lingkungan sekolah.", foto: "assets/pmr.jpg" },
  { id: "jepang", nama: "Bahasa Jepang", ikon: "bi-translate", warna: "#331f2b", desk: "Klub studi untuk mendalami tata bahasa, aksara, serta tradisi negeri sakura.", foto: "assets/jepang.jpeg" },
  { id: "jurnalis", nama: "Jurnalis", ikon: "bi-newspaper", warna: "#17302c", desk: "Komunitas peliput berita, pencari fakta, dan pengelola media publikasi sekolah.", foto: "assets/jurnalis.jpeg" },
  { id: "silat", nama: "Silat", ikon: "bi-shield-check", warna: "#28203b", desk: "Seni bela diri tradisional untuk mengasah ketangkasan fisik dan mental yang tangguh.", foto: "assets/silat.jpeg" },
  { id: "padus", nama: "Padus", ikon: "bi-mic", warna: "#192837", desk: "Paduan suara yang menyatukan vokal dalam harmoni indah untuk memeriahkan acara sekolah.", foto: "assets/padus.jpeg" },
  { id: "voli", nama: "Voli", ikon: "bi-trophy", warna: "#2c3319", desk: "Ekstrakurikuler olahraga untuk melatih teknik smash, passing, dan kerjasama tim di lapangan.", foto: "assets/voli.jpeg" },
  { id: "futsal", nama: "Futsal", ikon: "bi-dribbble", warna: "#35241b", desk: "Arena pembinaan fisik, strategi taktik, dan ketangkasan mengolah bola secara sportif.", foto: "assets/futsal.jpeg" },
  { id: "foster", nama: "Foster", ikon: "bi-chat-dots", warna: "#15332f", desk: "Kelompok diskusi interaktif untuk melatih kelancaran berbicara bahasa Inggris.", foto: "assets/foster.jpeg" },
  { id: "mtq", nama: "MTQ", ikon: "bi-book", warna: "#312e17", desk: "Bimbingan seni membaca Al-Qur'an dan ilmu tilawah untuk persiapan perlombaan.", foto: "assets/mtq.jpeg" },
  { id: "rebana", nama: "Rebana", ikon: "bi-music-note-beamed", warna: "#331f33", desk: "Grup musik rebana yang melantunkan irama islami dan puji-pujian penuh makna.", foto: "assets/rebana.jpeg" },
  { id: "rohis", nama: "Rohis", ikon: "bi-moon-stars", warna: "#1b3323", desk: "Forum kerohanian islam untuk memperdalam wawasan keagamaan lewat kajian positif.", foto: "assets/rohis.jpeg" },
  { id: "drumband", nama: "Drumband", ikon: "bi-megaphone", warna: "#352023", desk: "Barisan musik perkusi dan tiup yang tampil memukau dalam setiap upacara resmi.", foto: "assets/drumband.jpeg" },
  { id: "tari", nama: "Tari", ikon: "bi-person-arms-up", warna: "#35241b", desk: "Sanggar gerak tari Nusantara dan kreasi modern untuk pementasan seni pelajar.", foto: "assets/tari.jpeg" },
];

const $ = (selector, root = document) => root.querySelector(selector);
const cariEkskul = (id) => EKSKUL.find((e) => e.id === id) || null;

function initBeranda() {
  const grid = $("#ekskulGrid");
  if (!grid) return;

  grid.innerHTML = EKSKUL.map(
    (e) => `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card ekskul-modern-card h-100 rounded-4 overflow-hidden" role="button" data-ekskul="${e.id}">
        <div class="card-img-top-wrapper position-relative" style="height: 140px; background-color: ${e.warna};">
          <img src="${e.foto}" alt="${e.nama}" class="w-100 h-100 object-fit-cover opacity-75" onerror="this.style.display='none'">
          <div class="position-absolute top-0 start-0 m-3 badge-icon bg-dark text-white border border-secondary border-opacity-25 rounded-circle shadow-sm d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;">
            <i class="bi ${e.ikon} fs-6 text-accent"></i>
          </div>
        </div>
        <div class="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            <h3 class="h6 fw-bold mb-1 text-white">${e.nama}</h3>
            <p class="text-white-50 small mb-3">${e.desk}</p>
          </div>
          <span class="btn btn-sm btn-light fw-bold py-1 px-3 rounded-pill d-inline-flex align-items-center justify-content-center gap-1 shadow-sm mt-auto w-100 bg-accent text-dark border-0">
            Daftar Sekarang <i class="bi bi-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>`,
  ).join("");

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-ekskul]");
    if (card) window.bukaDaftar(card.dataset.ekskul);
  });
}

const POLA_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const ATURAN = {
  nama(v) { return !v.trim() ? "Nama lengkap wajib diisi." : v.trim().length < 3 ? "Minimal 3 karakter." : ""; },
  email(v) { return !v.trim() ? "Email wajib diisi." : !POLA_EMAIL.test(v) ? "Format email salah." : ""; },
  password(v) { return !v ? "Password wajib diisi." : v.length < 8 ? "Minimal 8 karakter." : ""; },
  konfirmasi(v, semua) { return !v ? "Ketik ulang password." : v !== semua.password ? "Password tidak sama." : ""; },
  kelas(v) { return !v ? "Pilih kelas." : ""; },
  jurusan(v) { return !v ? "Pilih jurusan." : ""; },
  ekskul(v) { return !v ? "Pilih salah satu ekskul." : ""; },
};

function renderModalContent() {
  const container = $("#modalContentContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="modal-header border-0 pb-0">
      <div>
        <span class="badge bg-primary bg-opacity-25 text-accent mb-1 px-3 py-1 rounded-pill fw-semibold small">Formulir Resmi</span>
        <h3 class="fw-bold h4 mb-0 text-white">Pendaftaran Ekstrakurikuler</h3>
      </div>
      <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body pt-3">
      <div id="areaForm">
        <p class="text-white-50 small mb-4">Lengkapi data diri di bawah ini dengan informasi yang valid.</p>

        <form id="formDaftar" novalidate>
          <div class="mb-3">
            <label for="nama" class="form-label fw-semibold small text-white-50">Nama Lengkap</label>
            <input type="text" class="form-control bg-dark-input text-white rounded-3 py-2 shadow-none" id="nama" placeholder="Masukkan Nama Anda" />
            <div class="field-msg text-danger small mt-1" id="msg-nama"></div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-sm-6">
              <label for="kelas" class="form-label fw-semibold small text-white-50">Kelas</label>
              <select class="form-select bg-dark-input text-white rounded-3 py-2 shadow-none" id="kelas">
                <option value="" class="bg-dark text-muted">Pilih Kelas...</option>
                <option value="X" class="bg-dark text-white">X</option>
                <option value="XI" class="bg-dark text-white">XI</option>
                <option value="XII" class="bg-dark text-white">XII</option>
              </select>
              <div class="field-msg text-danger small mt-1" id="msg-kelas"></div>
            </div>
            <div class="col-sm-6">
              <label for="jurusan" class="form-label fw-semibold small text-white-50">Jurusan</label>
              <select class="form-select bg-dark-input text-white rounded-3 py-2 shadow-none" id="jurusan">
                <option value="" class="bg-dark text-muted">Pilih Jurusan...</option>
                <option value="Busana" class="bg-dark text-white">Busana</option>
                <option value="Tata Boga" class="bg-dark text-white">Tata Boga</option>
                <option value="RPL" class="bg-dark text-white">RPL</option>
                <option value="TKJ" class="bg-dark text-white">TKJ</option>
                <option value="TKR" class="bg-dark text-white">TKR</option>
                <option value="TSM" class="bg-dark text-white">TSM</option>
              </select>
              <div class="field-msg text-danger small mt-1" id="msg-jurusan"></div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label fw-semibold small text-white-50">Email Aktif</label>
            <input type="email" class="form-control bg-dark-input text-white rounded-3 py-2 shadow-none" id="email" placeholder="nama@domain.com" />
            <div class="field-msg text-danger small mt-1" id="msg-email"></div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-sm-6">
              <label for="password" class="form-label fw-semibold small text-white-50">Password</label>
              <input type="password" class="form-control bg-dark-input text-white rounded-3 py-2 shadow-none" id="password" placeholder="Minimal 8 karakter" />
              <div class="field-msg text-danger small mt-1" id="msg-password"></div>
            </div>
            <div class="col-sm-6">
              <label for="konfirmasi" class="form-label fw-semibold small text-white-50">Konfirmasi Password</label>
              <input type="password" class="form-control bg-dark-input text-white rounded-3 py-2 shadow-none" id="konfirmasi" placeholder="Konfirmasi password" />
              <div class="field-msg text-danger small mt-1" id="msg-konfirmasi"></div>
            </div>
          </div>

          <div class="mb-4">
            <label for="ekskul" class="form-label fw-semibold small text-white-50">Pilihan Ekstrakurikuler</label>
            <select class="form-select bg-dark-input text-white rounded-3 py-2 shadow-none" id="ekskul">
              <option value="" class="bg-dark text-muted">Pilih Ekskul Tujuan...</option>
            </select>
            <div class="field-msg text-danger small mt-1" id="msg-ekskul"></div>
          </div>

          <button type="submit" class="btn btn-gradient-main w-100 py-2 fw-semibold shadow-sm">
            Kirim Pendaftaran
          </button>
        </form>
      </div>

      <div id="panelSukses" class="text-center py-4" hidden tabindex="-1">
        <div class="success-icon-box mx-auto mb-3 bg-success text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 65px; height: 65px; font-size: 1.8rem;">
          <i class="bi bi-check-lg"></i>
        </div>
        <h3 class="fw-bold mb-2 h4 text-white">Pendaftaran Berhasil!</h3>
        <p class="text-white-50 small mb-4" id="teksSukses"></p>
        <div class="d-flex justify-content-center gap-2">
          <button type="button" class="btn btn-gradient-main px-4" data-bs-dismiss="modal">Tutup</button>
          <button type="button" id="btnUlang" class="btn btn-outline-light px-4">Daftar Lain</button>
        </div>
      </div>
    </div>
  `;
}

function initDaftar() {
  renderModalContent();
  const form = $("#formDaftar");
  if (!form) return;

  const daftarKolom = ["nama", "kelas", "jurusan", "email", "password", "konfirmasi", "ekskul"];
  const input = {};
  const pesan = {};
  const disentuh = {};

  daftarKolom.forEach((k) => {
    input[k] = $("#" + k);
    pesan[k] = $("#msg-" + k);
    disentuh[k] = false;
  });

  input.ekskul.insertAdjacentHTML(
    "beforeend",
    EKSKUL.map((e) => `<option value="${e.id}" class="bg-dark text-white">${e.nama}</option>`).join(""),
  );

  const nilaiSemua = () => ({
    nama: input.nama.value,
    kelas: input.kelas.value,
    jurusan: input.jurusan.value,
    email: input.email.value,
    password: input.password.value,
    konfirmasi: input.konfirmasi.value,
    ekskul: input.ekskul.value,
  });

  function validasi(kolom) {
    const semua = nilaiSemua();
    const teksEror = ATURAN[kolom](semua[kolom], semua);
    if (disentuh[kolom]) {
      input[kolom].classList.toggle("is-invalid", teksEror !== "");
      input[kolom].classList.toggle("is-valid", teksEror === "");
      pesan[kolom].textContent = teksEror;
    }
    return teksEror === "";
  }

  daftarKolom.forEach((kolom) => {
    const ev = input[kolom].tagName === "SELECT" ? "change" : "input";
    input[kolom].addEventListener(ev, () => {
      disentuh[kolom] = true;
      validasi(kolom);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    daftarKolom.forEach((k) => { disentuh[k] = true; });
    const hasil = daftarKolom.map((k) => validasi(k));
    const salahPertama = daftarKolom.find((k, i) => !hasil[i]);

    if (salahPertama) {
      input[salahPertama].focus();
      return;
    }

    const semua = nilaiSemua();
    const data = cariEkskul(semua.ekskul);
    $("#teksSukses").textContent = `Terima kasih, ${semua.nama}! Pendaftaranmu ke ekskul ${data ? data.nama : ''} berhasil dicatat.`;
    $("#areaForm").hidden = true;
    $("#panelSukses").hidden = false;
  });

  function resetForm() {
    form.reset();
    daftarKolom.forEach((k) => {
      disentuh[k] = false;
      input[k].classList.remove("is-valid", "is-invalid");
      pesan[k].textContent = "";
    });
    $("#panelSukses").hidden = true;
    $("#areaForm").hidden = false;
  }

  $("#btnUlang").addEventListener("click", resetForm);

  const modalEl = $("#modalDaftar");
  const modal = new bootstrap.Modal(modalEl);

  window.bukaDaftar = (id = "") => {
    resetForm();
    input.ekskul.value = id;
    modal.show();
  };

  document.querySelectorAll("[data-buka-daftar]").forEach((btn) => {
    btn.addEventListener("click", () => window.bukaDaftar());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBeranda();
  initDaftar();
});