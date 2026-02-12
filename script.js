// Theme toggle (TOP RIGHT) — whole page + saves preference
(() => {
  const body = document.body;
  const btn = document.getElementById("themeBtn");

  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
  } else {
    body.classList.add("theme-dark");
  }

  btn?.addEventListener("click", () => {
    const isLight = body.classList.toggle("theme-light");
    body.classList.toggle("theme-dark", !isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
})();

// Get a Quote does nothing
document.getElementById("quoteBtn")?.addEventListener("click", (e) => e.preventDefault());
document.querySelectorAll(".hero-cta").forEach(btn => btn.addEventListener("click",(e)=>e.preventDefault()));

// Reveal animation (first time only)
(() => {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -12% 0px" });

  let i = 0;
  els.forEach((el) => {
    el.style.transitionDelay = (i % 10) * 45 + "ms";
    i++;
    io.observe(el);
  });
})();
