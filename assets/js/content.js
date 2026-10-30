/* ==========================================================================
   CONTENT.JS — edit this file only.
   Everything on the page (name, contacts, assignment list) comes from here.
   ========================================================================== */

window.PORTFOLIO = {
  /* ------------------------------------------------------------------
     1. PROFILE & CONTACT — change these to your real details
     ------------------------------------------------------------------ */
  profile: {
    name: "Chaca",
    initial: "C",
    role: "Informatics Student & Web Enthusiast",
    major: "Computer Science",
    university: "Your University",
    semester: 7,
    semesterLabel: "Semester 7",
    location: "Indonesia",

    // Profile photo (leave "" to fall back to the initial letter)
    photo: "assets/img/profile.jpg",
    photoAlt: "Portrait of Chaca",

    email: "chaca@example.com",
    // Shown on the page:
    phone: "+62 812-3456-7890",
    // Used for the tel: link and WhatsApp (digits only, with country code):
    phoneRaw: "+6281234567890",
    whatsapp: "6281234567890",
  },

  /* ------------------------------------------------------------------
     2. ASSIGNMENTS — newest first.
     Copy one block and change the values to add the next task.

     status : "Graded" | "Submitted" | "In progress"
     grade  : number (0-100) or null
     files  : [{ label: "Report.pdf", href: "files/assignment-01/report.pdf" }]
              Leave [] when there is no file yet.
     ------------------------------------------------------------------ */
  assignments: [
    {
      number: 9,
      // Uploaded from the "tugas/Tugas 1" folder.
      course: "Multimedia",
      title: "Tugas 1 — Video Presentation",
      semester: 7,
      due: "2026-10-30",
      status: "Submitted",
      grade: null,
      summary:
        "My first uploaded task: a short video presentation saved in the tugas folder. Press play to watch it right here, or open the original file in a new tab.",
      highlights: [
        "Recorded the video presentation for the first task",
        "Stored the final file in tugas/Tugas 1/tugas 1.mp4",
        "Added the video to this archive so it is easy to revisit",
      ],
      tags: ["Video", "Presentation"],
      files: [
        {
          label: "Tugas 1.mp4",
          href: "tugas/Tugas%201/tugas%201.mp4",
          type: "video",
        },
      ],
    },
    {
      number: 8,
      course: "Computer Networks",
      title: "Campus Network Topology Analysis",
      semester: 7,
      due: "2026-10-28",
      status: "In progress",
      grade: null,
      summary:
        "Mapping the campus network, identifying bottlenecks, and proposing a segmented topology with VLANs for each faculty.",
      highlights: [
        "Documented the existing backbone and access-layer devices",
        "Proposed VLAN segmentation per faculty building",
        "Compared star and mesh topologies using packet-tracer simulations",
      ],
      tags: ["Networking", "VLAN", "Cisco Packet Tracer"],
      files: [],
    },
    {
      number: 7,
      course: "Machine Learning",
      title: "Linear Regression with Scikit-learn",
      semester: 7,
      due: "2026-10-21",
      status: "Submitted",
      grade: null,
      summary:
        "Predicting student study hours from lifestyle data using a linear regression model, complete with feature scaling and error analysis.",
      highlights: [
        "Cleaned and normalised a 500-row survey dataset",
        "Trained and evaluated the model with MSE and R²",
        "Wrote a short report explaining each coefficient",
      ],
      tags: ["Python", "Pandas", "Scikit-learn"],
      files: [],
    },
    {
      number: 6,
      course: "Human-Computer Interaction",
      title: "UI/UX Case Study: Campus Food Delivery App",
      semester: 7,
      due: "2026-10-14",
      status: "Graded",
      grade: 90,
      summary:
        "A full design case study for a food-delivery app aimed at students, from user interviews to a clickable high-fidelity prototype.",
      highlights: [
        "Interviewed 8 students about ordering habits",
        "Built a user flow, wireframes, and a design system",
        "Ran a usability test with 5 participants and iterated",
      ],
      tags: ["Figma", "User Research", "Prototyping"],
      files: [],
    },
    {
      number: 5,
      course: "Operating Systems",
      title: "Process Scheduling Simulation",
      semester: 6,
      due: "2026-06-18",
      status: "In progress",
      grade: null,
      summary:
        "A simulator that compares First-Come-First-Serve, Shortest Job First, and Round Robin scheduling using average waiting time.",
      highlights: [
        "Implemented the three algorithms in Python",
        "Generated random process bursts for repeatable tests",
        "Visualised waiting and turnaround times in a comparison chart",
      ],
      tags: ["Python", "Algorithms", "Simulation"],
      files: [],
    },
    {
      number: 4,
      course: "Statistics",
      title: "Descriptive Statistics Report on Student Habits",
      semester: 6,
      due: "2026-05-30",
      status: "Graded",
      grade: 87,
      summary:
        "An analysis of sleep, study, and screen time among 120 students, presented with measures of central tendency and spread.",
      highlights: [
        "Collected data through an online questionnaire",
        "Calculated mean, median, variance, and standard deviation",
        "Presented findings with histograms and box plots",
      ],
      tags: ["Statistics", "Data Analysis", "SPSS"],
      files: [],
    },
    {
      number: 3,
      course: "Algorithms & Data Structures",
      title: "Implementing Dijkstra's Algorithm in Python",
      semester: 6,
      due: "2026-04-12",
      status: "Graded",
      grade: 95,
      summary:
        "A shortest-path implementation using a priority queue, tested on a small city map with weighted edges.",
      highlights: [
        "Built the graph with adjacency lists",
        "Used a heap-based priority queue for efficiency",
        "Compared runtime against a naive implementation",
      ],
      tags: ["Python", "Graphs", "Algorithms"],
      files: [],
    },
    {
      number: 2,
      course: "Database Systems",
      title: "Relational Database Design for a Campus Library",
      semester: 5,
      due: "2026-01-24",
      status: "Graded",
      grade: 88,
      summary:
        "An ER model and normalised schema for a library lending system, including queries for loans, fines, and availability.",
      highlights: [
        "Designed the ER diagram and converted it to 3NF tables",
        "Wrote 15 SQL queries for reporting and daily operations",
        "Added constraints and indexes to keep data consistent",
      ],
      tags: ["SQL", "ERD", "Normalisation"],
      files: [],
    },
    {
      number: 1,
      course: "Web Programming",
      title: "Personal Website with Semantic HTML",
      semester: 5,
      due: "2026-01-10",
      status: "Graded",
      grade: 92,
      summary:
        "The very first assignment in this archive: a personal profile page built with semantic HTML and a clean, responsive stylesheet.",
      highlights: [
        "Structured the page with header, nav, main, and footer",
        "Styled a responsive layout with Flexbox and Grid",
        "Checked accessibility with keyboard navigation and alt text",
      ],
      tags: ["HTML", "CSS", "Responsive"],
      files: [],
    },
  ],
};
