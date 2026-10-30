# College Portfolio & Assignment Archive

Website portofolio satu halaman untuk menyimpan semua tugas kuliah — dari tugas
pertama sampai tugas terbaru. Tema warna coklat pastel, bahasa Inggris.

## Struktur folder

```
Portofolio/
├─ index.html              ← halaman utama
├─ assets/
│  ├─ css/style.css        ← warna, font, layout
│  ├─ img/
│  │  └─ profile.jpg       ← foto profil (cover + avatar)
│  └─ js/
│     ├─ content.js        ← SEMUA data: nama, email, no HP, daftar tugas
│     └─ main.js           ← logika pencarian, filter, popup, tombol copy
├─ tugas/                  ← file tugas asli (video, PDF, DOCX, dll)
│  └─ Tugas 1/
│     └─ tugas 1.mp4
└─ README.md
```

## Cara membuka

Klik dua kali `index.html`. Website langsung jalan tanpa perlu install apa pun
(butuh koneksi internet hanya untuk font Google; kalau offline, font otomatis
memakai font bawaan sistem).

## 1. Ganti nama, foto, email, dan nomor HP

Buka `assets/js/content.js`, ubah bagian `profile`:

```js
profile: {
  name: "Chaca",
  initial: "C",                 // huruf cadangan kalau foto tidak ada
  role: "Informatics Student & Web Enthusiast",
  major: "Computer Science",
  university: "Nama Universitas",
  semester: 7,
  semesterLabel: "Semester 7",
  location: "Indonesia",

  photo: "assets/img/profile.jpg",   // "" = pakai huruf awal saja
  photoAlt: "Portrait of Chaca",     // teks alternatif untuk pembaca layar

  email: "emailkamu@gmail.com",
  phone: "+62 812-3456-7890",   // tampilan di halaman
  phoneRaw: "+6281234567890",   // untuk link telepon
  whatsapp: "6281234567890",    // angka saja, diawali 62
}
```

Foto dipakai dua kali: sebagai cover lebar di kartu profil dan sebagai avatar
bulat yang menumpuk di bawahnya. Kalau file foto dihapus atau path-nya salah,
website otomatis kembali menampilkan huruf awal nama.

## 2. Menambah tugas baru

Di file yang sama, di dalam `assignments: [ ... ]`, copy satu blok lalu ubah isinya.
Taruh blok baru di paling atas supaya jadi tugas terbaru:

```js
{
  number: 10,                                  // urutan tugas
  course: "Web Programming",                   // nama mata kuliah
  title: "Judul tugas",
  semester: 7,
  due: "2026-11-05",                           // format YYYY-MM-DD
  status: "In progress",                       // "Graded" | "Submitted" | "In progress"
  grade: null,                                 // angka 0-100, atau null kalau belum dinilai
  summary: "Deskripsi singkat tugasnya.",
  highlights: [
    "Hal pertama yang dikerjakan",
    "Hal kedua yang dikerjakan",
  ],
  tags: ["HTML", "CSS"],
  files: [],                                   // lihat langkah 3
},
```

Jumlah tugas, jumlah mata kuliah, rata-rata nilai, dan tulisan "Latest update"
di halaman dihitung otomatis. Filter mata kuliah dan semester juga otomatis muncul.

## 3. Melampirkan file tugas (folder `tugas/`)

File tugas disimpan di folder `tugas/`, mengikuti struktur yang sudah ada:

```
tugas/
└─ Tugas 1/
   └─ tugas 1.mp4
```

Lalu hubungkan ke data tugas. Spasi pada path ditulis `%20`:

```js
files: [
  {
    label: "Tugas 1.mp4",
    href: "tugas/Tugas%201/tugas%201.mp4",
    type: "video",              // video = otomatis muncul player di popup
  },
],
```

Contoh untuk PDF/DOCX:

```js
files: [
  { label: "Laporan.pdf", href: "tugas/Tugas%202/laporan.pdf" },
  { label: "Slide.pptx", href: "tugas/Tugas%202/slide.pptx" },
],
```

- File bertipe `video` (atau berakhiran `.mp4`, `.webm`, `.mov`, `.m4v`) akan
  tampil dengan pemutar video di dalam popup detail.
- File lain tampil sebagai tombol unduh/buka.
- Kalau `files` dibiarkan `[]`, popup menampilkan "Attachment coming soon."
- Jumlah file otomatis muncul di kartu tugas ("· 1 file").

Entri **No. 09 "Tugas 1 — Video Presentation"** sudah memakai video dari folder
`tugas/Tugas 1/`. Ganti `course`, `title`, `due`, dan `summary` sesuai mata
kuliah aslinya.

## 4. Mengubah warna

Semua warna ada di bagian paling atas `assets/css/style.css`:

```css
:root {
  --cream: #f8f1e7;         /* latar halaman */
  --surface: #fffdf9;       /* latar kartu */
  --sand: #efe0cf;          /* aksen lembut */
  --accent: #a6795a;        /* coklat utama (tombol) */
  --accent-strong: #8a5f42; /* coklat tua (judul kecil) */
  --ink: #3f2d22;           /* warna teks */
  --muted: #7f6656;         /* teks sekunder */
}
```

## Fitur

- Foto profil sebagai cover + avatar (dengan fallback huruf awal)
- Pencarian judul, mata kuliah, dan tag
- Filter per mata kuliah + per semester
- Popup detail tugas (status, deadline, nilai, ringkasan, pemutar video, file)
- Tombol copy email & nomor HP
- Form kontak yang membuka aplikasi email dengan pesan siap kirim
- Link WhatsApp langsung
- Responsif (HP, tablet, desktop), bisa di-print, dan mendukung reduced motion

## Publikasi (opsional)

Supaya bisa diakses online:

- **GitHub Pages** — upload folder ini ke repository, lalu aktifkan Pages di Settings.
- **Netlify / Vercel** — drag & drop folder ini ke dashboard mereka. Tidak perlu build.

Catatan: video 4 MB ikut ter-upload. Kalau terlalu besar untuk hosting gratis,
kompres videonya atau unggah ke YouTube/Drive lalu ganti `href` dengan link tersebut.
