/* ==========================================================================
   MAIN.JS — renders the archive and handles the interactions.
   You normally do not need to edit this file; edit content.js instead.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.PORTFOLIO || {};
  var profile = data.profile || {};
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

  function statusClass(status) {
    return "pill--" + String(status || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
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

  /* --------------------------- profile details -------------------------- */
  $all("[data-profile]").forEach(function (node) {
    var key = node.getAttribute("data-profile");
    if (profile[key] != null && profile[key] !== "") {
      node.textContent = profile[key];
    }
  });

  if (profile.name) {
    document.title = profile.name + " — College Portfolio & Assignment Archive";
  }

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
      avatarPhoto.src = profile.photo;
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

  var graded = assignments.filter(function (item) {
    return typeof item.grade === "number";
  });
  var average = graded.length
    ? Math.round(
        graded.reduce(function (sum, item) {
          return sum + item.grade;
        }, 0) / graded.length
      )
    : null;

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

    // Safety net: if requestAnimationFrame is throttled (e.g. background tab),
    // the final value still appears shortly after.
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

  animateNumber($("#statAssignments"), assignments.length);
  animateNumber($("#statCourses"), courses.length);
  animateNumber($("#statAverage"), average === null ? "—" : average);

  $all('[data-stat="assignments"]').forEach(function (el) {
    animateNumber(el, assignments.length);
  });
  $all('[data-stat="courses"]').forEach(function (el) {
    animateNumber(el, courses.length);
  });
  $all('[data-stat="semesters"]').forEach(function (el) {
    animateNumber(el, semesters.length);
  });

  var latestNote = $("#latestNote");
  if (latestNote) {
    if (assignments.length) {
      var latest = assignments[0];
      latestNote.textContent = "Latest update — No. " + pad(latest.number) + " · " + latest.title;
      latestNote.title = latest.title;
    } else {
      latestNote.textContent = "No assignments added yet.";
    }
  }

  /* ------------------------------ rendering ---------------------------- */
  var grid = $("#assignmentGrid");
  var emptyState = $("#emptyState");
  var resultsCount = $("#resultsCount");
  var searchInput = $("#assignmentSearch");
  var semesterSelect = $("#semesterFilter");
  var courseFilters = $("#courseFilters");
  var resetButton = $("#resetFilters");

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
      '<article class="card" data-id="' + item.number + '">' +
        '<div class="card__top">' +
          '<span class="card__index">No. ' + pad(item.number) + "</span>" +
          '<span class="pill ' + statusClass(item.status) + '">' + escapeHtml(item.status) + "</span>" +
        "</div>" +
        '<p class="card__course">' + escapeHtml(item.course) + "</p>" +
        '<h3 class="card__title">' + escapeHtml(item.title) + "</h3>" +
        '<p class="card__summary">' + escapeHtml(item.summary) + "</p>" +
        '<div class="card__tags">' + tags + "</div>" +
        '<div class="card__foot">' +
          '<span class="card__date">Due ' + formatDate(item.due) + filesLabel + "</span>" +
          '<button class="link-btn" type="button" data-open="' + item.number + '">View details' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          "</button>" +
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

  function render() {
    var visible = assignments.filter(matches);

    grid.innerHTML = visible.map(cardTemplate).join("");
    grid.hidden = visible.length === 0;
    emptyState.hidden = visible.length !== 0;

    var noun = assignments.length === 1 ? "assignment" : "assignments";
    resultsCount.textContent = visible.length === assignments.length
      ? "Showing all " + assignments.length + " " + noun + ", newest first."
      : "Showing " + visible.length + " of " + assignments.length + " " + noun + ".";
  }

  function buildFilters() {
    var chips = ['<button class="filter-chip is-active" type="button" data-course="all" aria-pressed="true">All courses</button>'];

    courses.forEach(function (course) {
      chips.push(
        '<button class="filter-chip" type="button" data-course="' + escapeHtml(course) +
          '" aria-pressed="false">' + escapeHtml(course) + "</button>"
      );
    });

    courseFilters.innerHTML = chips.join("");

    semesterSelect.innerHTML =
      '<option value="all">All semesters</option>' +
      semesters
        .map(function (semester) {
          return '<option value="' + semester + '">Semester ' + semester + "</option>";
        })
        .join("");
  }

  /* ------------------------------ events ------------------------------- */
  var searchTimer = null;
  searchInput.addEventListener("input", function () {
    window.clearTimeout(searchTimer);
    var value = searchInput.value;
    searchTimer = window.setTimeout(function () {
      state.query = value;
      render();
    }, 120);
  });

  semesterSelect.addEventListener("change", function () {
    state.semester = semesterSelect.value;
    render();
  });

  courseFilters.addEventListener("click", function (event) {
    var chip = event.target.closest("[data-course]");
    if (!chip) return;

    state.course = chip.getAttribute("data-course");
    $all(".filter-chip", courseFilters).forEach(function (button) {
      var active = button === chip;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    render();
  });

  resetButton.addEventListener("click", function () {
    state.query = "";
    state.course = "all";
    state.semester = "all";
    searchInput.value = "";
    semesterSelect.value = "all";
    $all(".filter-chip", courseFilters).forEach(function (button, index) {
      var active = index === 0;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    render();
    searchInput.focus();
  });

  /* ------------------------------- modal ------------------------------- */
  var modal = $("#assignmentModal");
  var modalBody = $("#modalBody");
  var lastFocused = null;

  function modalTemplate(item) {
    var grade = typeof item.grade === "number" ? item.grade + " / 100" : "Not graded yet";

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
          '<video controls preload="metadata" playsinline src="' + escapeHtml(videos[0].href) + '">' +
            "Your browser does not support embedded video. Open the file below instead." +
          "</video>" +
        "</div>"
      : "";

    var files = (item.files || []).length
      ? '<ul class="modal__files">' +
          item.files
            .map(function (file) {
              return (
                '<li><a class="file-link" href="' + escapeHtml(file.href) + '" target="_blank" rel="noopener">' +
                  "<span>" + escapeHtml(file.label) + "</span>" +
                  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>' +
                "</a></li>"
              );
            })
            .join("") +
        "</ul>"
      : '<p class="modal__empty-file">Attachment coming soon. The file for this assignment has not been uploaded yet.</p>';

    return (
      '<p class="modal__eyebrow">Assignment ' + pad(item.number) + " · " + escapeHtml(item.course) + "</p>" +
      '<h2 class="modal__title" id="modalTitle">' + escapeHtml(item.title) + "</h2>" +
      '<div class="modal__meta">' +
        "<div><span>Status</span><strong>" + escapeHtml(item.status) + "</strong></div>" +
        "<div><span>Due date</span><strong>" + formatDate(item.due) + "</strong></div>" +
        "<div><span>Grade</span><strong>" + escapeHtml(grade) + "</strong></div>" +
        "<div><span>Semester</span><strong>Semester " + escapeHtml(item.semester) + "</strong></div>" +
      "</div>" +
      '<p class="modal__desc">' + escapeHtml(item.summary) + "</p>" +
      videoBlock +
      (highlights ? "<h3>What I did</h3><ul>" + highlights + "</ul>" : "") +
      (tags ? '<h3>Topics</h3><div class="modal__tags">' + tags + "</div>" : "") +
      "<h3>Attachments</h3>" + files
    );
  }

  function openModal(item) {
    lastFocused = document.activeElement;
    modalBody.innerHTML = modalTemplate(item);

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }

    var panel = $(".modal__panel", modal);
    if (panel) panel.scrollTop = 0;
  }

  function closeModal() {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  grid.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-open]");
    var id = trigger ? trigger.getAttribute("data-open") : null;

    if (!id) {
      var card = event.target.closest(".card");
      if (card) id = card.getAttribute("data-id");
    }

    if (!id) return;

    var item = assignments.find(function (entry) {
      return String(entry.number) === String(id);
    });
    if (item) openModal(item);
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  $all("[data-close-modal]", modal).forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

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
      if (window.innerWidth > 860) closeNav();
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
  buildFilters();
  render();
})();
