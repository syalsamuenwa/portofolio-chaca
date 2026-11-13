/* ==========================================================================
   CONTENT.JS — edit this file only.
   Everything on the page (profile, skills, projects, assignments,
   certificates) is described here.
   ========================================================================== */

window.PORTFOLIO = {
  /* ------------------------------------------------------------------
     1. PROFILE & CONTACT
     ------------------------------------------------------------------ */
  profile: {
    name: "Syalsa Muenwa Jadeita",
    shortName: "Syalsa Jadeita",
    displayName: "Chaca",
    initial: "S",
    role: "Informatics Student · Web & Mobile Developer",
    major: "Informatics",
    university: "Universitas Ahmad Dahlan",
    semester: 7,
    semesterLabel: "Semester 7",
    location: "Yogyakarta, Indonesia",

    // Profile photo (leave "" to fall back to the initial letter)
    photo: "assets/img/Profile.jpg",
    photoAlt: "Portrait of Syalsa Muenwa Jadeita",

    email: "syalsamuenwa089@gmail.com",
    phone: "+62 812-7680-3135",
    phoneRaw: "+6281276803135",
    whatsapp: "6281276803135",

    github: "https://github.com/syalsamuenwa",
    gitlab: "https://gitlab.com/syalsamuenwa",
    githubLabel: "github.com/syalsamuenwa",
    gitlabLabel: "gitlab.com/syalsamuenwa",
    publicRepos: 9,
  },

  /* ------------------------------------------------------------------
     2. SKILLS — each group is backed by something in this portfolio.
     ------------------------------------------------------------------ */
  skills: [
    {
      title: "Web development",
      summary:
        "Building responsive pages and Laravel-backed applications, from database schema to the last form state.",
      items: ["HTML", "CSS", "JavaScript", "PHP", "Laravel 11", "Blade"],
      proof: "SIMONEV-SIKEP, Bersihin, and this portfolio",
    },
    {
      title: "Mobile development",
      summary:
        "Kotlin apps built in Android Studio, using modern Android building blocks and real data sources.",
      items: ["Kotlin", "Android Studio", "ViewBinding", "RecyclerView", "Room", "Retrofit", "Firebase"],
      proof: "6 Android practicum repositories on GitHub",
    },
    {
      title: "Data & databases",
      summary:
        "Modelling data, writing queries, and keeping changes traceable across an application.",
      items: ["MySQL", "MariaDB", "SQL", "SQLite / Room", "ERD", "Audit trail"],
      proof: "SIMONEV monitoring workflow, Bersihin schema, Posttest 4–5",
    },
    {
      title: "Tools & delivery",
      summary:
        "Shipping work with clear version history, sensible structure, and interfaces that hold up on small screens.",
      items: ["Git", "GitHub", "Composer", "REST APIs", "Responsive design", "Accessibility"],
      proof: "9 public repositories and a documented project archive",
    },
    {
      title: "Organization & communication",
      summary:
        "Working with committees and student organizations: coordination, treasury, and written reporting.",
      items: ["Event committees", "Treasury", "Documentation", "Coordination"],
      proof: "KPUMP Informatika 2024 (Bendahara) and Upgrading Ormawa (Bendahara 2)",
    },
  ],

  /* ------------------------------------------------------------------
     3. PROJECTS — the featured one is highlighted above the grid.
     ------------------------------------------------------------------ */
  projects: [
    {
      id: "simonev-sikep",
      index: "01",
      featured: true,
      kicker: "Internship project",
      title: "SIMONEV-SIKEP",
      subtitle: "Data quality monitoring & evaluation for employee data",
      role: "Web developer intern",
      org: "Mahkamah Agung Republik Indonesia",
      year: "2025–2026",
      summary:
        "An internal Laravel application that helps the data-quality team monitor SIKEP employee data, record findings, follow up on corrections, and generate official evaluation reports.",
      description:
        "Built with Laravel 11 and Blade during my internship. SIMONEV turns a manual monitoring process into a closed loop: checklist → finding → follow-up → verification → report. I worked on the interface and the monitoring workflow, including the different views used by administrators, HR officers, and reviewers.",
      highlights: [
        "Contributed role-based views for administrators, HR officers, and reviewers",
        "Built the monitoring checklist and the finding / follow-up screens",
        "Connected the dashboard, recap, and official report generator",
        "Mapped the monitoring dictionary into 5 groups and 35 sub-groups",
      ],
      modules: [
        "Dashboard KPI",
        "Data pegawai",
        "Monitoring SIKEP",
        "Temuan & tindak lanjut",
        "Pembaruan data",
        "Verifikasi pimpinan",
        "Rekapitulasi",
        "Generator laporan",
        "Kamus monitoring",
        "Pengguna & role",
        "Pengaturan",
      ],
      stack: ["Laravel 11", "PHP 8.2", "Blade", "MySQL", "RBAC"],
      repo: "https://github.com/erqyan/SIMONEV-SIKEP",
      note:
        "This is an internal government system. The public repository is linked here; no configuration, credentials, or operational data are republished in this portfolio.",
    },
    {
      id: "bersihin",
      index: "02",
      featured: false,
      kicker: "Group project · PKPL",
      title: "Bersihin",
      subtitle: "Multi-role service booking platform",
      role: "PHP developer",
      org: "Software Engineering (PKPL) group project",
      year: "2026",
      summary:
        "A PHP + MySQL web application for booking services, with separate flows for customers, service providers, and administrators.",
      description:
        "Built as a group project for the PKPL course. The application covers registration and login, service search, order creation, order history, provider profiles, and an admin dashboard for managing users and providers.",
      highlights: [
        "Designed the MySQL schema and seeded it with init.sql",
        "Built customer flows for search, booking, and order history",
        "Added provider pages for managing services and incoming orders",
        "Created an admin dashboard for user and provider management",
      ],
      stack: ["PHP", "MySQL", "PDO", "Session auth", "HTML/CSS"],
      repo: "https://github.com/syalsamuenwa/Bersihin_PKPL",
    },
    {
      id: "pmob-labs",
      index: "03",
      featured: false,
      kicker: "Practicum · 6 repositories",
      title: "Android Mobile Programming Labs",
      subtitle: "Kotlin apps built week by week",
      role: "Android developer",
      org: "Mobile Programming practicum",
      year: "2025",
      summary:
        "A set of Kotlin / Android Studio exercises covering layouts, intents, Room, RecyclerView, REST APIs, and Firebase.",
      description:
        "Each post-test is a small but complete Android app. Together they trace my progress from a first layout exercise to applications with local databases, API calls, image loading, and cloud-backed data.",
      highlights: [
        "Built a Firebase Realtime Database task manager with add, complete, and delete actions",
        "Consumed a book REST API with Retrofit, Gson, Glide, and a detail screen",
        "Created a social feed with posts, stories, and a Room local database",
        "Practised ViewBinding, RecyclerView, intents, validation, and material UI",
      ],
      stack: ["Kotlin", "Android Studio", "ViewBinding", "Room", "Retrofit", "Firebase"],
      repos: [
        {
          label: "prak8-pmob — Firebase task manager",
          url: "https://github.com/syalsamuenwa/prak8-pmob",
          note: "Task list with add, complete, and delete actions; Firebase Realtime Database.",
        },
        {
          label: "PostTest-Pmob07 — book catalog API client",
          url: "https://github.com/syalsamuenwa/PostTest-Pmob07",
          note: "Retrofit + Gson + Glide, RecyclerView, and a book detail screen.",
        },
        {
          label: "Posttest5_Syalsa — social feed",
          url: "https://github.com/syalsamuenwa/Posttest5_Syalsa",
          note: "Posts, stories, and a Room local database with Coil image loading.",
        },
        {
          label: "Posttest4_Chaca — citizen data list",
          url: "https://github.com/syalsamuenwa/Posttest4_Chaca",
          note: "Room + RecyclerView + ViewBinding for a simple CRUD-style list.",
        },
        {
          label: "Pmob_PostTest3 — registration form",
          url: "https://github.com/syalsamuenwa/Pmob_PostTest3",
          note: "Form validation and an intent-based result screen.",
        },
        {
          label: "Pmob_PostTest2 — first layout exercise",
          url: "https://github.com/syalsamuenwa/Pmob_PostTest2",
          note: "The starting point: a basic Android layout and activity.",
        },
      ],
      note:
        "PostTest3Syalsa is an empty placeholder repository; the working Posttest 3 app is Pmob_PostTest3.",
    },
    {
      id: "portfolio",
      index: "04",
      featured: false,
      kicker: "Personal project",
      title: "Portfolio & Assignment Archive",
      subtitle: "The site you are reading",
      role: "Designer & developer",
      org: "Personal project",
      year: "2026",
      summary:
        "A single-page portfolio and coursework archive built with vanilla HTML, CSS, and JavaScript — no framework and no build step.",
      description:
        "The site combines a project showcase, a searchable assignment archive, and a certificate gallery. It includes responsive navigation, accessible modal dialogs, client-side filtering, and a data file that keeps all content in one place.",
      highlights: [
        "Designed the white-and-pink visual system and responsive layouts",
        "Built search, course/semester filters, and a certificate category filter",
        "Added accessible dialogs for assignments, projects, and certificates",
        "Published the site with GitHub Pages",
      ],
      stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      repo: "https://github.com/syalsamuenwa/portofolio-chaca",
      demo: "https://syalsamuenwa.github.io/portofolio-chaca/",
    },
  ],

  /* ------------------------------------------------------------------
     4. ASSIGNMENTS — files live in the tugas/ folder.
     ------------------------------------------------------------------ */
  assignments: [
    {
      number: 2,
      course: "Video Coursework",
      title: "Tugas 2 — Video Assignment",
      semester: 7,
      added: "2026-11-13",
      status: "Submitted",
      summary:
        "The second video assignment from the tugas folder. The original recording was 207 MB, so I compressed it to 6.4 MB for the web while keeping the full two-minute duration.",
      highlights: [
        "Recorded and submitted the second video assignment",
        "Compressed the 207 MB HEVC original into a 6.4 MB web-friendly MP4",
        "Kept the 1280×720, 30 fps version in tugas/Tugas 2/tugas 2.mp4",
      ],
      tags: ["Video", "Coursework"],
      files: [
        {
          label: "Tugas 2.mp4 (6.4 MB)",
          href: "tugas/Tugas 2/tugas 2.mp4",
          type: "video",
          note: "Compressed from the 207 MB original recording.",
        },
      ],
    },
    {
      number: 1,
      course: "Video Coursework",
      title: "Tugas 1 — Video Assignment",
      semester: 7,
      added: "2026-10-30",
      status: "Submitted",
      summary:
        "The first video assignment stored in the tugas folder. Press play to watch it here, or open the original file in a new tab.",
      highlights: [
        "Recorded the video for the first assignment",
        "Stored the final file in tugas/Tugas 1/tugas 1.mp4",
        "Added the video to this archive so it is easy to revisit",
      ],
      tags: ["Video", "Coursework"],
      files: [
        {
          label: "Tugas 1.mp4 (4.0 MB)",
          href: "tugas/Tugas 1/tugas 1.mp4",
          type: "video",
        },
      ],
    },
  ],

  /* ------------------------------------------------------------------
     5. CERTIFICATES — duplicates in the folder are merged into one entry.
     ------------------------------------------------------------------ */
  certificates: [
    {
      id: "kpump-2024",
      title: "KPUMP Informatika 2024 — Bendahara",
      organizer: "KPU Mahasiswa Prodi Informatika, UAD",
      year: "2024",
      category: "Organization",
      role: "Bendahara (Treasurer)",
      description:
        "Served as treasurer of the 2024 Informatics Student Election Commission (KPUMP). Certificate No. 010/SEKRE/A/KPUMP-IF/UAD/XII/2024.",
      preview: "assets/img/Sertifikat/thumbs/kpump-2024.jpg",
      files: [
        { label: "Certificate (PDF)", href: "assets/img/Sertifikat/SERTIF KPU-1.pdf", type: "pdf" },
      ],
    },
    {
      id: "literasi-mendeley-2026",
      title: "Literasi Informasi: Mendeley",
      organizer: "Perpustakaan UAD",
      year: "2026",
      category: "Training",
      role: "Participant",
      description:
        "Training on using Mendeley for reference management, held by the UAD Library on 26 May 2026.",
      preview: "assets/img/Sertifikat/thumbs/literasi-mendeley-2026.jpg",
      files: [
        {
          label: "Certificate (PDF)",
          href: "assets/img/Sertifikat/Sertifikat Literasi_2300018324.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "nmcc",
      title: "NMCC",
      organizer: "Universitas Ahmad Dahlan",
      category: "Competition",
      role: "Participant",
      description: "Certificate for taking part in NMCC.",
      preview: "assets/img/Sertifikat/thumbs/nmcc.jpg",
      files: [
        { label: "Certificate image (PNG)", href: "assets/img/Sertifikat/Syalsa_NMCC.png", type: "image" },
        { label: "Certificate (PDF)", href: "assets/img/Sertifikat/Sertifikat NMCC.pdf", type: "pdf" },
      ],
    },
    {
      id: "menarik-season-3",
      title: "Menarik Season 3",
      organizer: "Informatics student event",
      category: "Event",
      role: "Participant",
      description: "Certificate from Menarik Season 3, an Informatics student event.",
      preview: "assets/img/Sertifikat/thumbs/menarik-season-3.jpg",
      files: [
        {
          label: "Certificate image (PNG)",
          href: "assets/img/Sertifikat/28. Syalsa Muenwa Jadeita_ MENARIK SEASON 3.png",
          type: "image",
        },
        {
          label: "Certificate (PDF)",
          href: "assets/img/Sertifikat/28. Syalsa_Sertifikat Menarik Season 3.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "kongres-informatika",
      title: "Kongres Informatika",
      organizer: "Program Studi Informatika, UAD",
      category: "Organization",
      role: "Participant",
      description: "Participation certificate for the Informatics Congress.",
      preview: "assets/img/Sertifikat/thumbs/kongres-informatika.jpg",
      files: [
        {
          label: "Certificate image (JPG)",
          href: "assets/img/Sertifikat/Sertifikat KONGRES INFOR.jpg",
          type: "image",
        },
        {
          label: "Certificate (PDF)",
          href: "assets/img/Sertifikat/Sertifikat Kongres Informatika.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "kpump-2023",
      title: "KPUMP Informatika 2023",
      organizer: "KPU Mahasiswa Prodi Informatika, UAD",
      year: "2023",
      category: "Organization",
      role: "Committee",
      description: "Committee certificate for the 2023 Informatics Student Election Commission.",
      preview: "assets/img/Sertifikat/thumbs/kpump-2023.jpg",
      files: [
        {
          label: "Certificate image (JPG)",
          href: "assets/img/Sertifikat/Sertifikat KPUM Syalsa Muenwa J.jpg",
          type: "image",
        },
        {
          label: "Certificate (PDF)",
          href: "assets/img/Sertifikat/Sertifikat KPUMP Informatika 2023.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "upgrading-ormawa",
      title: "Upgrading Ormawa",
      organizer: "Student organization (Ormawa)",
      category: "Organization",
      role: "Bendahara 2",
      description:
        "Committee certificate for the student-organization upgrading program, serving as Deputy Treasurer (Bendahara 2).",
      preview: "assets/img/Sertifikat/thumbs/upgrading-ormawa.jpg",
      files: [
        {
          label: "Certificate (PDF)",
          href: "assets/img/Sertifikat/Sertfikat Panitia UPGRADING ORMAWA.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "p2k-2023",
      title: "P2K UAD 2023",
      organizer: "Universitas Ahmad Dahlan",
      year: "2023",
      category: "Campus",
      role: "Participant",
      description:
        "Pengenalan Kehidupan Kampus (P2K) orientation program for new UAD students in 2023.",
      preview: "assets/img/Sertifikat/thumbs/p2k-2023.jpg",
      files: [
        {
          label: "Certificate image (PNG)",
          href: "assets/img/Sertifikat/p2k_uad_2300018324.png",
          type: "image",
        },
      ],
    },
    {
      id: "dahlan-muda-mengabdi-2023",
      title: "Dahlan Muda Mengabdi 2023",
      organizer: "Universitas Ahmad Dahlan",
      year: "2023",
      category: "Community",
      role: "Participant",
      description:
        "Certificate for participating in Dahlan Muda Mengabdi, UAD's community service program, in 2023.",
      preview: "assets/img/Sertifikat/thumbs/dahlan-muda-mengabdi-2023.jpg",
      files: [
        {
          label: "Certificate (PDF)",
          href: "assets/img/Sertifikat/SYALSA MUENWA JADEITA _Sertifikat Dahlan Muda Mengabdi 2023.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "orientasi-2023",
      title: "Orientasi Kemahasiswaan dan Alumni",
      organizer: "Universitas Ahmad Dahlan",
      year: "2023",
      category: "Campus",
      role: "Participant",
      description: "Certificate for the student and alumni orientation programme in 2023.",
      preview: "assets/img/Sertifikat/thumbs/orientasi-kemahasiswaan-2023.jpg",
      files: [
        {
          label: "Certificate (PDF)",
          href: "assets/img/Sertifikat/SYALSA MUENWA JADEITA_Sertifikat Orientasi Kemahasiswaan dan Alumni.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "library-orientation-2023",
      title: "Library Orientation 2023/2024",
      organizer: "Perpustakaan UAD",
      year: "2023",
      category: "Campus",
      role: "Participant",
      description:
        "Library orientation for new students, held by the UAD Library on 19 September 2023.",
      preview: "assets/img/Sertifikat/thumbs/library-orientation-2023.jpg",
      files: [
        { label: "Certificate (PDF)", href: "assets/img/Sertifikat/SERTIFIKAT  LO.pdf", type: "pdf" },
      ],
    },
    {
      id: "soft-skill-uad",
      title: "Soft Skill Training",
      organizer: "Universitas Ahmad Dahlan",
      category: "Training",
      role: "Participant",
      description: "Certificate for the UAD soft-skill training programme.",
      preview: "assets/img/Sertifikat/thumbs/soft-skill-uad.jpg",
      files: [
        {
          label: "Certificate image (JPG)",
          href: "assets/img/Sertifikat/soft_skill_uad_2300018324.jpg",
          type: "image",
        },
      ],
    },
    {
      id: "paradoks",
      title: "Paradoks",
      organizer: "Universitas Ahmad Dahlan",
      category: "Event",
      role: "Participant",
      description: "Certificate for taking part in Paradoks.",
      preview: "assets/img/Sertifikat/thumbs/paradoks.jpg",
      files: [
        { label: "Certificate image (PNG)", href: "assets/img/Sertifikat/Sertifikat PARADOKS.png", type: "image" },
      ],
    },
    {
      id: "committee-certificates",
      title: "Committee Certificates",
      organizer: "Various UAD events",
      category: "Organization",
      role: "Committee",
      description:
        "A four-page collection of committee certificates from campus events.",
      preview: "assets/img/Sertifikat/thumbs/kepanitiaan.jpg",
      files: [
        { label: "Committee certificates (PDF, 4 pages)", href: "assets/img/Sertifikat/Kepanitiaan Syalsa.pdf", type: "pdf" },
      ],
    },
  ],
};
