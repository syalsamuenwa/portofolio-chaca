/* ==========================================================================
   MAIN.JS — renders the portfolio and handles the interactions.
   You normally do not need to edit this file; edit content.js instead.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.PORTFOLIO || {};
  var profile = data.profile || {};
  var skills = (data.skills || []).slice();
  var projects = (data.projects || []).slice();
  var certificates = (data.certificates || []).slice();
  var assignments = (data.assignments || []).slice().sort(function (a, b) {
    return b.number - a.number;
  });

  /* ------------------------------ helpers ------------------------------ */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $all(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function pad(number) {
    return String(number).padStart(2, "0");
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function statusClass(status) {
    return "pill--" + String(status || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  function fileHref(path) {
    return encodeURI(String(path || "")).replace(/#/g, "%23");
  }

  var dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function formatDate(value) {
    if (!value) return "—";
    var parsed = new Date(value + "T00:00:00");
    return isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed);
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  var externalIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
  var downloadIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>';
  var arrowIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* --------------------------- profile details -------------------------- */
  $all("[data-profile]").forEach(function (node) {
    var key = node.getAttribute("data-profile");
    if (profile[key] != null && profile[key] !== "") {
      node.textContent = profile[key];
    }
  });

  if (profile.name) {
    document.title = profile.name + " — Informatics Portfolio";
  }

  $all("[data-link]").forEach(function (node) {
    var key = node.getAttribute("data-link");
    if (profile[key]) node.setAttribute("href", profile[key]);
  });

  /* ---------------------------- profile photo --------------------------- */
  var coverPhoto = $("#profilePhoto");
  var avatarPhoto = $("#profileAvatar");

  if (profile.photo) {
    var photoAlt = profile.photoAlt || "Portrait of " + (profile.name || "me");

    if (coverPhoto) {
      coverPhoto.alt = "";
      coverPhoto.addEventListener("load", function () {
        coverPhoto.hidden = false;
        var initials = $(".profile-card__initials");
        if (initials) initials.hidden = true;
      });
      coverPhoto.addEventListener("error", function () {
        coverPhoto.hidden = true;
      });
      coverPhoto.src = profile.photo;
    }

    if (avatarPhoto) {
      avatarPhoto.alt = photoAlt;
      avatarPhoto.addEventListener("load", function () {
        avatarPhoto.hidden = false;
        var initials = $(".avatar__initials");
        if (initials) initials.hidden = true;
      });
      avatarPhoto.addEventListener("error", function () {
        avatarPhoto.hidden = true;
      });
      avatarPhoto.src = profile.avatarPhoto || profile.photo;
    }
  }

  var emailEl = $("#contactEmail");
  if (emailEl && profile.email) {
    emailEl.textContent = profile.email;
    emailEl.setAttribute("href", "mailto:" + profile.email);
  }

  var phoneEl = $("#contactPhone");
  if (phoneEl && profile.phone) {
    phoneEl.textContent = profile.phone;
    var telTarget = String(profile.phoneRaw || profile.phone).replace(/[^\d+]/g, "");
    phoneEl.setAttribute("href", "tel:" + telTarget);
  }

  var waLink = $("#waLink");
  if (waLink && profile.whatsapp) {
    waLink.setAttribute("href", "https://wa.me/" + String(profile.whatsapp).replace(/\D/g, ""));
  }

  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------ statistics --------------------------- */
  function animateNumber(el, target, suffix) {
    if (!el) return;
    var end = Number(target);
    var tail = suffix || "";

    if (!isFinite(end)) {
      el.textContent = target;
      return;
    }

    if (prefersReducedMotion() || end === 0) {
      el.textContent = end + tail;
      return;
    }

    var start = null;
    var duration = 800;

    window.setTimeout(function () {
      el.textContent = end + tail;
    }, 1200);

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(end * eased) + tail;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  animateNumber($("#statProjects"), projects.length);
  animateNumber($("#statCertificates"), certificates.length);
  animateNumber($("#statAssignments"), assignments.length);

  $all('[data-stat="projects"]').forEach(function (el) {
    animateNumber(el, projects.length);
  });
  $all('[data-stat="certificates"]').forEach(function (el) {
    animateNumber(el, certificates.length);
  });
  $all('[data-stat="assignments"]').forEach(function (el) {
    animateNumber(el, assignments.length);
  });

  var latestNote = $("#latestNote");
  if (latestNote) {
    if (assignments.length) {
      latestNote.textContent =
        "Latest assignment — " + assignments[0].title + " · " +
        certificates.length + " certificates · " + projects.length + " projects.";
      latestNote.title = assignments[0].title;
    } else {
      latestNote.textContent =
        certificates.length + " certificates · " + projects.length + " projects.";
    }
  }

  /* ------------------------------- skills ------------------------------ */
  var skillsGrid = $("#skillsGrid");

  function skillTemplate(item, index) {
    var items = (item.items || [])
      .map(function (skill) {
        return '<span class="tag">' + escapeHtml(skill) + "</span>";
      })
      .join("");

    return (
      '<article class="skill-card">' +
        '<div class="skill-card__top">' +
          '<span class="skill-card__icon">' + pad(index + 1) + "</span>" +
          '<h3 class="skill-card__title">' + escapeHtml(item.title) + "</h3>" +
        "</div>" +
        '<p class="skill-card__summary">' + escapeHtml(item.summary) + "</p>" +
        '<div class="skill-card__items">' + items + "</div>" +
        '<p class="skill-card__proof"><span>Proof</span>' + escapeHtml(item.proof) + "</p>" +
      "</article>"
    );
  }

  if (skillsGrid) {
    skillsGrid.innerHTML = skills.map(skillTemplate).join("");
  }

  /* ------------------------------ projects ----------------------------- */
  var featuredContainer = $("#featuredProject");
  var projectGrid = $("#projectGrid");

  function projectTags(item, limit) {
    return (item.stack || [])
      .slice(0, limit || 5)
      .map(function (tag) {
        return '<span class="tag">' + escapeHtml(tag) + "</span>";
      })
      .join("");
  }

  function featuredProjectTemplate(item) {
    var repoLink = item.repo
      ? '<a class="btn btn--ghost btn--small" href="' + escapeHtml(item.repo) + '" target="_blank" rel="noopener">View repository' + externalIcon + "</a>"
      : "";

    return (
      '<article class="featured-project">' +
        '<div class="featured-project__body">' +
          '<div class="featured-project__top">' +
            '<span class="project-kicker">' + escapeHtml(item.kicker) + "</span>" +
            '<span class="project-index">' + escapeHtml(item.index) + "</span>" +
          "</div>" +
          '<h3 class="featured-project__title">' + escapeHtml(item.title) + "</h3>" +
          '<p class="featured-project__subtitle">' + escapeHtml(item.subtitle) + "</p>" +
          '<p class="featured-project__summary">' + escapeHtml(item.summary) + "</p>" +
          '<div class="project-tags">' + projectTags(item, 6) + "</div>" +
          '<div class="featured-project__meta">' +
            "<div><span>Role</span><strong>" + escapeHtml(item.role) + "</strong></div>" +
            "<div><span>Organisation</span><strong>" + escapeHtml(item.org) + "</strong></div>" +
            "<div><span>Year</span><strong>" + escapeHtml(item.year) + "</strong></div>" +
          "</div>" +
          '<div class="project-actions">' +
            '<button class="btn btn--primary btn--small" type="button" data-open="' + escapeHtml(item.id) + '" data-kind="project">Read case study' + arrowIcon + "</button>" +
            repoLink +
          "</div>" +
        "</div>" +
        '<div class="featured-project__visual" aria-hidden="true">' +
          '<div class="mock-window">' +
            '<div class="mock-window__bar"><span></span><span></span><span></span></div>' +
            '<div class="mock-window__body">' +
              '<p class="mock-window__label">SIMONEV · Dashboard</p>' +
              '<div class="mock-stats">' +
                "<div><span>Monitoring</span><strong>SIKEP</strong></div>" +
                "<div><span>Temuan</span><strong>Tindak lanjut</strong></div>" +
                "<div><span>Laporan</span><strong>Monev</strong></div>" +
              "</div>" +
              '<div class="mock-rows">' +
                '<span style="--w: 92%"></span>' +
                '<span style="--w: 78%"></span>' +
                '<span style="--w: 86%"></span>' +
                '<span style="--w: 64%"></span>' +
              "</div>" +
            "</div>" +
          "</div>" +
          '<p class="featured-project__visual-note">Laravel 11 · Blade · RBAC</p>' +
        "</div>" +
      "</article>"
    );
  }

  function projectCardTemplate(item) {
    var repoUrl = item.repo || (item.repos && item.repos[0] && item.repos[0].url) || profile.github;
    var repoLabel = item.repos ? "All repositories" : "Repository";

    return (
      '<article class="project-card">' +
        '<div class="project-card__top">' +
          '<span class="project-kicker">' + escapeHtml(item.kicker) + "</span>" +
          '<span class="project-index">' + escapeHtml(item.index) + "</span>" +
        "</div>" +
        '<h3 class="project-card__title">' + escapeHtml(item.title) + "</h3>" +
        '<p class="project-card__subtitle">' + escapeHtml(item.subtitle) + "</p>" +
        '<p class="project-card__summary">' + escapeHtml(item.summary) + "</p>" +
        '<div class="project-tags">' + projectTags(item, 5) + "</div>" +
        '<div class="project-card__foot">' +
          '<span class="project-card__year">' + escapeHtml(item.year) + "</span>" +
          '<span class="project-card__links">' +
            '<button class="link-btn" type="button" data-open="' + escapeHtml(item.id) + '" data-kind="project">Project details' + arrowIcon + "</button>" +
            (repoUrl
              ? '<a class="project-card__repo" href="' + escapeHtml(repoUrl) + '" target="_blank" rel="noopener">' + escapeHtml(repoLabel) + externalIcon + "</a>"
              : "") +
          "</span>" +
        "</div>" +
      "</article>"
    );
  }

  var featuredProjects = projects.filter(function (item) {
    return item.featured;
  });
  var otherProjects = projects.filter(function (item) {
    return !item.featured;
  });

  if (featuredContainer) {
    featuredContainer.innerHTML = featuredProjects.map(featuredProjectTemplate).join("");
  }

  if (projectGrid) {
    projectGrid.innerHTML = otherProjects.map(projectCardTemplate).join("");
  }

  /* ----------------------------- assignments --------------------------- */
  var grid = $("#assignmentGrid");
  var emptyState = $("#emptyState");
  var resultsCount = $("#resultsCount");
  var searchInput = $("#assignmentSearch");
  var semesterSelect = $("#semesterFilter");
  var courseFilters = $("#courseFilters");
  var resetButton = $("#resetFilters");

  var courses = [];
  assignments.forEach(function (item) {
    if (courses.indexOf(item.course) === -1) courses.push(item.course);
  });

  var semesters = [];
  assignments.forEach(function (item) {
    if (semesters.indexOf(item.semester) === -1) semesters.push(item.semester);
  });
  semesters.sort(function (a, b) {
    return b - a;
  });

  var state = {
    query: "",
    course: "all",
    semester: "all",
  };

  function cardTemplate(item) {
    var tags = (item.tags || [])
      .slice(0, 3)
      .map(function (tag) {
        return '<span class="tag">#' + escapeHtml(tag) + "</span>";
      })
      .join("");

    var fileCount = (item.files || []).length;
    var filesLabel = fileCount
      ? " · " + fileCount + (fileCount === 1 ? " file" : " files")
      : "";

    return (
      '<article class="card" data-id="' + item.number + '" data-open="' + item.number + '" data-kind="assignment">' +
        '<div class="card__top">' +
          '<span class="card__index">No. ' + pad(item.number) + "</span>" +
          '<span class="pill ' + statusClass(item.status) + '">' + escapeHtml(item.status) + "</span>" +
        "</div>" +
        '<p class="card__course">' + escapeHtml(item.course) + "</p>" +
        '<h3 class="card__title">' + escapeHtml(item.title) + "</h3>" +
        '<p class="card__summary">' + escapeHtml(item.summary) + "</p>" +
        '<div class="card__tags">' + tags + "</div>" +
        '<div class="card__foot">' +
          '<span class="card__date">Added ' + formatDate(item.added) + filesLabel + "</span>" +
          '<button class="link-btn" type="button" data-open="' + item.number + '" data-kind="assignment">View details' + arrowIcon + "</button>" +
        "</div>" +
      "</article>"
    );
  }

  function matches(item) {
    if (state.course !== "all" && item.course !== state.course) return false;
    if (state.semester !== "all" && String(item.semester) !== state.semester) return false;

    var query = state.query.trim().toLowerCase();
    if (!query) return true;

    var haystack = [item.title, item.course, item.summary, "no " + pad(item.number)]
      .concat(item.tags || [])
      .join(" ")
      .toLowerCase();

    return haystack.indexOf(query) !== -1;
  }

  function renderAssignments() {
    if (!grid) return;
    var visible = assignments.filter(matches);

    grid.innerHTML = visible.map(cardTemplate).join("");
    grid.hidden = visible.length === 0;
    if (emptyState) emptyState.hidden = visible.length !== 0;

    var noun = assignments.length === 1 ? "assignment" : "assignments";
    if (resultsCount) {
      resultsCount.textContent = visible.length === assignments.length
        ? "Showing all " + assignments.length + " " + noun + ", newest first."
        : "Showing " + visible.length + " of " + assignments.length + " " + noun + ".";
    }
  }

  function buildAssignmentFilters() {
    if (courseFilters) {
      var chips = ['<button class="filter-chip is-active" type="button" data-course="all" aria-pressed="true">All courses</button>'];

      courses.forEach(function (course) {
        chips.push(
          '<button class="filter-chip" type="button" data-course="' + escapeHtml(course) +
            '" aria-pressed="false">' + escapeHtml(course) + "</button>"
        );
      });

      courseFilters.innerHTML = chips.join("");
    }

    if (semesterSelect) {
      semesterSelect.innerHTML =
        '<option value="all">All semesters</option>' +
        semesters
          .map(function (semester) {
            return '<option value="' + semester + '">Semester ' + semester + "</option>";
          })
          .join("");
    }
  }

  /* ---------------------------- certificates --------------------------- */
  var certGrid = $("#certificateGrid");
  var certFilters = $("#certificateFilters");
  var certCount = $("#certificateCount");
  var categoryOrder = ["Organization", "Training", "Competition", "Community", "Campus", "Event"];

  var certCategories = [];
  certificates.forEach(function (item) {
    if (item.category && certCategories.indexOf(item.category) === -1) {
      certCategories.push(item.category);
    }
  });
  certCategories.sort(function (a, b) {
    var ia = categoryOrder.indexOf(a);
    var ib = categoryOrder.indexOf(b);
    if (ia === -1) ia = 99;
    if (ib === -1) ib = 99;
    return ia - ib;
  });

  var certState = { category: "all" };

  function certificateCardTemplate(item) {
    var meta = item.organizer || "";
    if (item.year) meta += (meta ? " · " : "") + item.year;

    return (
      '<article class="cert-card" data-open="' + escapeHtml(item.id) + '" data-kind="certificate" data-category="' + escapeHtml(item.category) + '" tabindex="0" role="button" aria-label="View certificate: ' + escapeHtml(item.title) + '">' +
        '<div class="cert-card__media">' +
          (item.preview
            ? '<img src="' + fileHref(item.preview) + '" alt="Preview of ' + escapeHtml(item.title) + '" loading="lazy" decoding="async" />'
            : "") +
          '<span class="cert-card__cat cat--' + slugify(item.category) + '">' + escapeHtml(item.category) + "</span>" +
        "</div>" +
        '<div class="cert-card__body">' +
          '<h3 class="cert-card__title">' + escapeHtml(item.title) + "</h3>" +
          '<p class="cert-card__meta">' + escapeHtml(meta) + "</p>" +
          '<p class="cert-card__role">' + escapeHtml(item.role) + "</p>" +
          '<span class="cert-card__more">View certificate' + arrowIcon + "</span>" +
        "</div>" +
      "</article>"
    );
  }

  function renderCertificates() {
    if (!certGrid) return;
    var visible = certificates.filter(function (item) {
      return certState.category === "all" || item.category === certState.category;
    });

    certGrid.innerHTML = visible.map(certificateCardTemplate).join("");

    $all(".cert-card__media img", certGrid).forEach(function (img) {
      img.addEventListener("error", function () {
        var media = img.closest(".cert-card__media");
        if (media) media.classList.add("is-missing");
        img.remove();
      });
    });

    if (certCount) {
      certCount.textContent = visible.length === certificates.length
        ? "Showing all " + certificates.length + " certificates."
        : "Showing " + visible.length + " of " + certificates.length + " certificates · " + certState.category + ".";
    }
  }

  function buildCertificateFilters() {
    if (!certFilters) return;

    var chips = ['<button class="filter-chip is-active" type="button" data-cert-category="all" aria-pressed="true">All certificates</button>'];
    certCategories.forEach(function (category) {
      chips.push(
        '<button class="filter-chip" type="button" data-cert-category="' + escapeHtml(category) +
          '" aria-pressed="false">' + escapeHtml(category) + "</button>"
      );
    });

    certFilters.innerHTML = chips.join("");
  }

  /* ------------------------------ events ------------------------------- */
  var searchTimer = null;
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      window.clearTimeout(searchTimer);
      var value = searchInput.value;
      searchTimer = window.setTimeout(function () {
        state.query = value;
        renderAssignments();
      }, 120);
    });
  }

  if (semesterSelect) {
    semesterSelect.addEventListener("change", function () {
      state.semester = semesterSelect.value;
      renderAssignments();
    });
  }

  if (courseFilters) {
    courseFilters.addEventListener("click", function (event) {
      var chip = event.target.closest("[data-course]");
      if (!chip) return;

      state.course = chip.getAttribute("data-course");
      $all(".filter-chip", courseFilters).forEach(function (button) {
        var active = button === chip;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      renderAssignments();
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      state.query = "";
      state.course = "all";
      state.semester = "all";
      if (searchInput) searchInput.value = "";
      if (semesterSelect) semesterSelect.value = "all";
      if (courseFilters) {
        $all(".filter-chip", courseFilters).forEach(function (button, index) {
          var active = index === 0;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });
      }
      renderAssignments();
      if (searchInput) searchInput.focus();
    });
  }

  if (certFilters) {
    certFilters.addEventListener("click", function (event) {
      var chip = event.target.closest("[data-cert-category]");
      if (!chip) return;

      certState.category = chip.getAttribute("data-cert-category");
      $all(".filter-chip", certFilters).forEach(function (button) {
        var active = button === chip;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      renderCertificates();
    });
  }

  /* ------------------------------- modal ------------------------------- */
  var modal = $("#detailModal");
  var modalBody = $("#modalBody");
  var lastFocused = null;

  function fileLinkTemplate(file, icon) {
    var note = file.note
      ? '<span class="file-link__note">' + escapeHtml(file.note) + "</span>"
      : "";

    return (
      '<li><a class="file-link" href="' + fileHref(file.href || file.url) + '" target="_blank" rel="noopener">' +
        '<span class="file-link__text">' +
          '<span class="file-link__label">' + escapeHtml(file.label) + "</span>" +
          note +
        "</span>" +
        (icon || downloadIcon) +
      "</a></li>"
    );
  }

  function assignmentModal(item) {
    var highlights = (item.highlights || [])
      .map(function (text) {
        return "<li>" + escapeHtml(text) + "</li>";
      })
      .join("");

    var tags = (item.tags || [])
      .map(function (tag) {
        return '<span class="chip">' + escapeHtml(tag) + "</span>";
      })
      .join("");

    var videos = (item.files || []).filter(function (file) {
      return file.type === "video" || /\.(mp4|webm|ogv|mov|m4v)$/i.test(file.href || "");
    });

    var videoBlock = videos.length
      ? "<h3>Video preview</h3>" +
        '<div class="video-frame">' +
          '<video controls preload="metadata" playsinline src="' + fileHref(videos[0].href) + '">' +
            "Your browser does not support embedded video. Open the file below instead." +
          "</video>" +
        "</div>" +
        (videos[0].note ? '<p class="modal__note">' + escapeHtml(videos[0].note) + "</p>" : "")
      : "";

    var files = (item.files || []).length
      ? '<ul class="modal__files">' +
          item.files.map(function (file) { return fileLinkTemplate(file); }).join("") +
        "</ul>"
      : '<p class="modal__empty-file">No file has been attached to this assignment yet.</p>';

    return (
      '<p class="modal__eyebrow">Assignment ' + pad(item.number) + " · " + escapeHtml(item.course) + "</p>" +
      '<h2 class="modal__title" id="modalTitle">' + escapeHtml(item.title) + "</h2>" +
      '<div class="modal__meta">' +
        "<div><span>Status</span><strong>" + escapeHtml(item.status) + "</strong></div>" +
        "<div><span>Added</span><strong>" + formatDate(item.added) + "</strong></div>" +
        "<div><span>Semester</span><strong>Semester " + escapeHtml(item.semester) + "</strong></div>" +
        "<div><span>Files</span><strong>" + (item.files || []).length + "</strong></div>" +
      "</div>" +
      '<p class="modal__desc">' + escapeHtml(item.summary) + "</p>" +
      videoBlock +
      (highlights ? "<h3>What I did</h3><ul>" + highlights + "</ul>" : "") +
      (tags ? '<h3>Topics</h3><div class="modal__tags">' + tags + "</div>" : "") +
      "<h3>Attachments</h3>" + files
    );
  }

  function certificateModal(item) {
    var files = (item.files || []).length
      ? '<ul class="modal__files">' +
          item.files.map(function (file) { return fileLinkTemplate(file); }).join("") +
        "</ul>"
      : '<p class="modal__empty-file">The original file is stored in the certificate folder.</p>';

    return (
      '<p class="modal__eyebrow">Certificate · ' + escapeHtml(item.category) + "</p>" +
      '<h2 class="modal__title" id="modalTitle">' + escapeHtml(item.title) + "</h2>" +
      '<div class="modal__meta">' +
        "<div><span>Organiser</span><strong>" + escapeHtml(item.organizer) + "</strong></div>" +
        (item.year ? "<div><span>Year</span><strong>" + escapeHtml(item.year) + "</strong></div>" : "") +
        "<div><span>Role</span><strong>" + escapeHtml(item.role) + "</strong></div>" +
        "<div><span>Category</span><strong>" + escapeHtml(item.category) + "</strong></div>" +
      "</div>" +
      '<p class="modal__desc">' + escapeHtml(item.description) + "</p>" +
      (item.preview
        ? '<div class="cert-preview"><img src="' + fileHref(item.preview) + '" alt="Preview of ' + escapeHtml(item.title) + '" /></div>'
        : "") +
      "<h3>Original file</h3>" + files
    );
  }

  function projectModal(item) {
    var highlights = (item.highlights || [])
      .map(function (text) {
        return "<li>" + escapeHtml(text) + "</li>";
      })
      .join("");

    var modules = (item.modules || [])
      .map(function (module) {
        return '<span class="chip">' + escapeHtml(module) + "</span>";
      })
      .join("");

    var stack = (item.stack || [])
      .map(function (tag) {
        return '<span class="chip">' + escapeHtml(tag) + "</span>";
      })
      .join("");

    var repos = (item.repos || []).length
      ? "<h3>Repositories</h3><ul class=\"modal__files\">" +
          item.repos.map(function (repo) {
            return fileLinkTemplate(
              { label: repo.label, url: repo.url, note: repo.note },
              externalIcon
            );
          }).join("") +
        "</ul>"
      : "";

    var actions = "";
    if (item.repo) {
      actions += '<a class="btn btn--primary btn--small" href="' + escapeHtml(item.repo) + '" target="_blank" rel="noopener">View repository' + externalIcon + "</a>";
    }
    if (item.demo) {
      actions += '<a class="btn btn--ghost btn--small" href="' + escapeHtml(item.demo) + '" target="_blank" rel="noopener">Open live site' + externalIcon + "</a>";
    }

    return (
      '<p class="modal__eyebrow">' + escapeHtml(item.kicker) + " · " + escapeHtml(item.index) + "</p>" +
      '<h2 class="modal__title" id="modalTitle">' + escapeHtml(item.title) + "</h2>" +
      '<p class="modal__subtitle">' + escapeHtml(item.subtitle) + "</p>" +
      '<div class="modal__meta">' +
        "<div><span>Role</span><strong>" + escapeHtml(item.role) + "</strong></div>" +
        "<div><span>Organisation</span><strong>" + escapeHtml(item.org) + "</strong></div>" +
        "<div><span>Year</span><strong>" + escapeHtml(item.year) + "</strong></div>" +
      "</div>" +
      '<p class="modal__desc">' + escapeHtml(item.description) + "</p>" +
      (highlights ? "<h3>What I worked on</h3><ul>" + highlights + "</ul>" : "") +
      (modules ? "<h3>Modules</h3><div class=\"modal__tags\">" + modules + "</div>" : "") +
      (stack ? "<h3>Stack</h3><div class=\"modal__tags\">" + stack + "</div>" : "") +
      repos +
      (item.note ? '<p class="modal__note">' + escapeHtml(item.note) + "</p>" : "") +
      (actions ? '<div class="modal__actions">' + actions + "</div>" : "")
    );
  }

  function openModal(kind, item) {
    if (!modal || !modalBody) return;

    lastFocused = document.activeElement;

    if (kind === "certificate") {
      modalBody.innerHTML = certificateModal(item);
    } else if (kind === "project") {
      modalBody.innerHTML = projectModal(item);
    } else {
      modalBody.innerHTML = assignmentModal(item);
    }

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }

    var panel = $(".modal__panel", modal);
    if (panel) panel.scrollTop = 0;
  }

  function closeModal() {
    if (!modal) return;
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function findItem(kind, id) {
    var collection = kind === "certificate" ? certificates : kind === "project" ? projects : assignments;
    return collection.find(function (entry) {
      return String(kind === "assignment" ? entry.number : entry.id) === String(id);
    });
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest("a")) return;

    var trigger = event.target.closest("[data-open]");
    if (!trigger) return;

    var kind = trigger.getAttribute("data-kind") || "assignment";
    var id = trigger.getAttribute("data-open");
    var item = findItem(kind, id);
    if (item) openModal(kind, item);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var target = event.target.closest('[data-open][role="button"]');
    if (!target) return;
    event.preventDefault();
    target.click();
  });

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    $all("[data-close-modal]", modal).forEach(function (button) {
      button.addEventListener("click", closeModal);
    });
  }

  /* ------------------------------- toast ------------------------------- */
  var toast = $("#toast");
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  /* --------------------------- copy contact ---------------------------- */
  function fallbackCopy(text) {
    try {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "-1000px";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(field);
      return ok;
    } catch (error) {
      return false;
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return fallbackCopy(text);
        }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  $all("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-copy");
      var value = key === "email" ? profile.email : profile.phone;
      if (!value) return;

      copyText(value).then(function (ok) {
        showToast(ok ? "Copied to clipboard — " + value : "Could not copy automatically. Please copy it manually.");
      });
    });
  });

  /* --------------------------- contact form ---------------------------- */
  var form = $("#contactForm");
  var formNote = $("#formNote");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = $("#senderName");
      var email = $("#senderEmail");
      var message = $("#senderMessage");

      [name, email, message].forEach(function (field) {
        field.classList.remove("is-invalid");
      });

      var invalid = [];
      if (!name.value.trim()) invalid.push(name);
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) invalid.push(email);
      if (!message.value.trim()) invalid.push(message);

      if (invalid.length) {
        invalid.forEach(function (field) {
          field.classList.add("is-invalid");
        });
        formNote.textContent = "Please fill in your name, a valid email, and a message.";
        formNote.classList.add("is-error");
        invalid[0].focus();
        return;
      }

      formNote.classList.remove("is-error");
      formNote.textContent = "Opening your email app…";

      var subject = "Portfolio message from " + name.value.trim();
      var body =
        message.value.trim() +
        "\n\n— " + name.value.trim() +
        "\nReply to: " + email.value.trim();

      window.location.href =
        "mailto:" + (profile.email || "") +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      showToast("Opening your email app…");
    });

    $all("input, textarea", form).forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("is-invalid");
      });
    });
  }

  /* ---------------------------- mobile nav ----------------------------- */
  var navToggle = $("#navToggle");
  var nav = $("#primaryNav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    $all("a", nav).forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) closeNav();
    });
  }

  /* -------------------------- reveal on scroll ------------------------- */
  var revealItems = $all(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion()) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ------------------------------- start ------------------------------- */
  buildAssignmentFilters();
  renderAssignments();
  buildCertificateFilters();
  renderCertificates();
})();
