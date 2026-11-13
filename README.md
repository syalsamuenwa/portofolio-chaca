# Portofolio Syalsa Muenwa Jadeita

Website portofolio satu halaman: proyek, sertifikat, dan arsip tugas kuliah.
Bahasa halaman: Inggris. Dibuat dengan HTML, CSS, dan JavaScript murni — tanpa
framework dan tanpa proses build. Tema putih–pink profesional.

## Struktur folder

```
Portofolio/
├─ index.html                    ← halaman utama
├─ assets/
│  ├─ css/style.css              ← warna, font, layout
│  ├─ img/
│  │  ├─ Profile.jpg             ← foto asli (dipakai untuk preview sosial/OG)
│  │  ├─ Profile-cutout.png      ← foto dengan latar transparan (cover kartu)
│  │  ├─ Profile-avatar.png      ← potongan persegi untuk avatar bulat
│  │  └─ Sertifikat/             ← file sertifikat asli
│  │     └─ thumbs/              ← thumbnail ringan untuk galeri
│  ├─ SIMONEV-SIKEP/             ← checkout proyek magang (tidak dipublikasikan)
│  └─ js/
│     ├─ content.js              ← SEMUA data: profil, skill, proyek, tugas, sertifikat
│     └─ main.js                 ← logika pencarian, filter, popup, tombol copy
├─ tugas/
│  ├─ Tugas 1/tugas 1.mp4        ← video tugas 1
│  ├─ Tugas 2/
│  │  ├─ IMG_4320.MOV            ← rekaman asli 207 MB (tidak ikut Git)
│  │  └─ tugas 2.mp4             ← versi web 6,4 MB (yang dipakai website)
│  └─ UTS/
│     ├─ Presentasi UTS_2300018324.mp4          ← video presentasi UTS (35,1 MB)
│     └─ Surat Lamaran Pekerjaan_2300018324.pdf ← surat lamaran UTS (0,2 MB)
└─ README.md
```

## Cara membuka

Klik dua kali `index.html`. Website langsung jalan tanpa install apa pun.
Koneksi internet hanya dibutuhkan untuk font Google; kalau offline, font
otomatis memakai font bawaan sistem.

## 1. Ganti nama, foto, email, dan nomor HP

Buka `assets/js/content.js`, ubah bagian `profile`. Email dan WhatsApp sudah
diisi dengan data asli; kalau berubah, ganti di satu tempat ini saja.

```js
profile: {
  name: "Syalsa Muenwa Jadeita",
  shortName: "Syalsa Jadeita",
  initial: "S",                       // huruf cadangan kalau foto gagal dimuat
  role: "Informatics Student · Web & Mobile Developer",
  major: "Informatics",
  university: "Universitas Ahmad Dahlan",
  semester: 7,
  semesterLabel: "Semester 7",
  location: "Yogyakarta, Indonesia",

  photo: "assets/img/Profile-cutout.png",  // "" = pakai huruf awal saja
  photoAlt: "Portrait of Syalsa Muenwa Jadeita",
  avatarPhoto: "assets/img/Profile-avatar.png", // potongan persegi untuk avatar

  email: "syalsamuenwa089@gmail.com",
  phone: "+62 812-7680-3135",         // tampilan di halaman
  phoneRaw: "+6281276803135",         // untuk link telepon
  whatsapp: "6281276803135",          // angka saja, diawali 62

  github: "https://github.com/syalsamuenwa",
  gitlab: "https://gitlab.com/syalsamuenwa",
}
```

Foto dipakai dua kali: sebagai cover di kartu profil dan sebagai avatar bulat.
Untuk cover dipakai `Profile-cutout.png` — latar foto sudah dihapus sehingga
wajah menyatu dengan gradasi pink di belakangnya, tanpa kotak abu-abu. Untuk
avatar bulat dipakai `Profile-avatar.png`, potongan persegi dari foto yang sama.

Kalau salah satu file dihapus atau path-nya salah, website otomatis menampilkan
huruf awal nama. `Profile.jpg` tetap disimpan karena dipakai sebagai gambar
preview saat tautan dibagikan (meta OG).

Nama file foto **case-sensitive** di GitHub Pages (server Linux). Simpan sebagai
`Profile-cutout.png` dan `Profile-avatar.png`, sama seperti di `content.js`.

## 2. Menambah atau mengubah proyek

Di `content.js`, bagian `projects: [ ... ]`. Proyek dengan `featured: true`
tampil besar di atas grid; sisanya jadi kartu. Field yang dipakai:

```js
{
  id: "nama-unik",                 // dipakai tombol "Project details"
  index: "05",
  featured: false,
  kicker: "Course project",        // label kecil di atas judul
  title: "Nama proyek",
  subtitle: "Satu baris penjelasan",
  role: "Web developer",
  org: "Mata kuliah / organisasi",
  year: "2026",
  summary: "Ringkasan singkat untuk kartu.",
  description: "Penjelasan lengkap di popup.",
  highlights: ["Yang dikerjakan", "Hasilnya"],
  modules: ["Modul A", "Modul B"], // opsional
  stack: ["Laravel", "MySQL"],
  repo: "https://github.com/...",  // opsional
  demo: "https://...",             // opsional
  repos: [                         // opsional, untuk proyek dengan banyak repo
    { label: "Repo 1", url: "https://...", note: "Keterangan" },
  ],
  note: "Catatan tambahan.",       // opsional
}
```

## 3. Menambah tugas baru

Bagian `assignments: [ ... ]` di `content.js`. Copy satu blok, taruh di paling
atas supaya jadi tugas terbaru, lalu ubah isinya.

```js
{
  number: 3,
  course: "Video Coursework",
  title: "Tugas 3 — Judul",
  semester: 7,
  added: "2026-11-20",             // format YYYY-MM-DD
  status: "Submitted",             // "Graded" | "Submitted" | "In progress"
  summary: "Deskripsi singkat.",
  highlights: ["Hal pertama", "Hal kedua"],
  tags: ["Video", "Coursework"],
  files: [
    {
      label: "Tugas 3.mp4",
      href: "tugas/Tugas 3/tugas 3.mp4",   // spasi boleh ditulis biasa
      type: "video",                        // video = pemutar di popup
      note: "Opsional",
    },
  ],
}
```

Jumlah tugas, mata kuliah, dan tulisan "Latest assignment" dihitung otomatis.
File bertipe `video` (atau berakhiran `.mp4`, `.webm`, `.mov`, `.m4v`) tampil
dengan pemutar di popup; file lain tampil sebagai tombol buka/unduh.

### Video Tugas 2

Rekaman asli `tugas/Tugas 2/IMG_4320.MOV` berukuran 207 MB, melebihi batas
100 MB GitHub, jadi file itu **tidak** di-commit (lihat `.gitignore`). Yang
dipakai website adalah `tugas/Tugas 2/tugas 2.mp4` — hasil kompresi 1280×720,
30 fps, durasi tetap 2:14, ukuran 6,4 MB. Kalau ingin mengganti video, kompres
dulu ke bawah 100 MB dan simpan dengan nama yang sama.

### Berkas UTS

Tugas UTS ada di `tugas/UTS/` dan terdiri dari dua file: video presentasi
(`Presentasi UTS_2300018324.mp4`, 3:49, 35,1 MB) dan surat lamaran pekerjaan
(`Surat Lamaran Pekerjaan_2300018324.pdf`, 1 halaman). Keduanya tampil sebagai
satu kartu "UTS — Job Application Letter & Presentation": video bisa diputar
langsung di popup, PDF terbuka di tab baru.

## 4. Menambah sertifikat

1. Simpan file asli di `assets/img/Sertifikat/`.
2. Buat thumbnail (lebar maksimal 1200 px, JPG) di
   `assets/img/Sertifikat/thumbs/`.
3. Tambahkan entri di `certificates: [ ... ]`:

```js
{
  id: "nama-unik",
  title: "Judul sertifikat",
  organizer: "Penyelenggara",
  year: "2026",
  category: "Organization",   // Organization | Training | Competition
                              // Community | Campus | Event
  role: "Participant",
  description: "Penjelasan singkat.",
  preview: "assets/img/Sertifikat/thumbs/nama-file.jpg",
  files: [
    { label: "Certificate (PDF)", href: "assets/img/Sertifikat/nama-file.pdf", type: "pdf" },
  ],
}
```

File duplikat di folder sudah digabung jadi satu entri (misalnya
`16. Syalsa Muenwa Jadeita` = `Syalsa_NMCC.png`, dan
`p2k_uad_2300018324.png` = `sertifikat_p2k.png`). Filter kategori muncul
otomatis dari data.

## 5. Mengubah warna

Semua warna ada di bagian atas `assets/css/style.css`:

```css
:root {
  --cream: #fdf8f9;         /* latar halaman */
  --surface: #ffffff;       /* latar kartu */
  --sand: #fbeaef;          /* pink sangat lembut */
  --accent: #c4657f;        /* rose (tombol, aksen) */
  --accent-strong: #a74964; /* rose tua (judul kecil, link) */
  --ink: #33222a;           /* warna teks */
  --muted: #7d6671;         /* teks sekunder */
  --plum: #2c1a22;          /* footer */
}
```

## Fitur

- Foto profil sebagai cover + avatar (fallback huruf awal)
- Hero dengan statistik otomatis: proyek, sertifikat, tugas
- Skill yang disertai bukti (proyek/repo/sertifikat)
- Kartu proyek + popup studi kasus (role, stack, modul, link repo)
- Galeri sertifikat dengan filter kategori dan preview
- Pencarian judul, mata kuliah, dan tag tugas
- Filter tugas per mata kuliah dan semester
- Popup detail tugas dengan pemutar video dan daftar file
- Tombol copy email & nomor HP, link WhatsApp, form kontak via email
- Responsif (HP, tablet, desktop), bisa di-print, mendukung reduced motion

## Catatan proyek SIMONEV-SIKEP

`assets/SIMONEV-SIKEP/` adalah checkout proyek magang (Laravel 11). Folder ini
**tidak ikut di-commit** karena berisi `.env`, folder `vendor`, dan log — dan
karena sistemnya internal. Di website, SIMONEV tampil sebagai kartu proyek yang
menunjuk ke repositori GitHub publiknya.

## Publikasi

Website ini sudah dipublikasikan lewat **GitHub Pages**:
<https://syalsamuenwa.github.io/portofolio-chaca/>

Setiap kali `main` di-push, GitHub Pages memperbarui situs dalam beberapa menit.
Alternatif lain: drag & drop folder ini ke Netlify atau Vercel (tanpa build).
