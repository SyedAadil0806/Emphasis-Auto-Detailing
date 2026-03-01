// script.js

// ---------- Theme Toggle (persist) ----------
const root = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  root.classList.remove("theme-dark", "theme-light");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "theme-light" || savedTheme === "theme-dark") {
  setTheme(savedTheme);
} else {
  setTheme("theme-dark"); // default
}

toggleBtn?.addEventListener("click", () => {
  const next = root.classList.contains("theme-dark") ? "theme-light" : "theme-dark";
  setTheme(next);
});

// ---------- Mobile Dropdown ----------
const dropdown = document.getElementById("servicesDropdown");
const dropbtn = document.getElementById("dropbtn");
const menu = document.getElementById("dropdownMenu");

function openDropdown() {
  if (!dropdown || !dropbtn) return;
  dropdown.classList.add("open");
  dropbtn.setAttribute("aria-expanded", "true");
}

function closeDropdown() {
  if (!dropdown || !dropbtn) return;
  dropdown.classList.remove("open");
  dropbtn.setAttribute("aria-expanded", "false");
}

function isDropdownOpen() {
  return dropdown?.classList.contains("open");
}

dropbtn?.addEventListener("click", (e) => {
  e.preventDefault();
  if (isDropdownOpen()) closeDropdown();
  else openDropdown();
});

// close on outside click
document.addEventListener("click", (e) => {
  if (!dropdown) return;
  if (!dropdown.contains(e.target)) closeDropdown();
});

// close on escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDropdown();
});

// close on selection
menu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    closeDropdown();
  });
});

// ---------- Quote buttons: scroll to GET A QUOTE form ----------
function goToQuoteForm() {
  const section = document.getElementById("contact");
  const firstInput = document.getElementById("qName");

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Focus after scroll (small delay)
  window.setTimeout(() => {
    firstInput?.focus({ preventScroll: true });
  }, 450);

  closeDropdown();
}

document.querySelectorAll(".js-quote").forEach((btn) => {
  btn.addEventListener("click", goToQuoteForm);
});

// ---------- Quote form (temporary - until email sending is connected) ----------
const quoteForm = document.getElementById("quoteForm");
const formNote = document.getElementById("formNote");

quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("qName")?.value?.trim();
  const phone = document.getElementById("qPhone")?.value?.trim();
  const email = document.getElementById("qEmail")?.value?.trim();
  const vehicle = document.getElementById("qVehicle")?.value?.trim();
  const pkg = document.getElementById("qPackage")?.value?.trim();
  const msg = document.getElementById("qMessage")?.value?.trim();

  if (!name || !phone || !email || !vehicle || !pkg || !msg) {
    if (formNote) formNote.textContent = "Please fill in all fields before submitting.";
    return;
  }

  if (formNote) {
    formNote.textContent =
      "Saved! Next step: connect this form to email (Netlify Forms / EmailJS / Formspree).";
  }

  quoteForm.reset();
});

// ---------- Reveal animation (once) ----------
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((el) => io.observe(el));