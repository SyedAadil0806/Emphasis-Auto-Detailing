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
if (savedTheme === "theme-light" || savedTheme === "theme-dark") setTheme(savedTheme);
else setTheme("theme-dark");

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
  a.addEventListener("click", () => closeDropdown());
});

// ---------- Quote buttons: scroll to pricing ----------
document.querySelectorAll(".js-quote").forEach((btn) => {
  btn.addEventListener("click", () => {
    const el = document.getElementById("pricing");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    closeDropdown();
  });
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