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

toggleBtn.addEventListener("click", () => {
  const next = root.classList.contains("theme-dark") ? "theme-light" : "theme-dark";
  setTheme(next);
});

// ---------- Dropdown: hover desktop, tap mobile ----------
const dropdown = document.getElementById("servicesDropdown");
const dropbtn = document.getElementById("dropbtn");
const menu = document.getElementById("dropdownMenu");

function openDropdown() {
  dropdown.classList.add("open");
  dropbtn.setAttribute("aria-expanded", "true");
}
function closeDropdown() {
  dropdown.classList.remove("open");
  dropbtn.setAttribute("aria-expanded", "false");
}

dropbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (dropdown.classList.contains("open")) closeDropdown();
  else openDropdown();
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) closeDropdown();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDropdown();
});

menu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    closeDropdown();
  });
});

// ---------- Reveal animation (once) ----------
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

reveals.forEach(el => io.observe(el));