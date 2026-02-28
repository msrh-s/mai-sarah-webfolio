// ===== Header effect on scroll (light theme) =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (!header) return;

  if (window.scrollY > 50) {
    header.style.background = "hsl(45, 35%, 92%)";
    header.style.boxShadow = "0 6px 18px rgba(0,0,0,0.06)";
    header.style.borderBottom = "1px solid hsla(38, 40%, 45%, 0.25)";
  } else {
    header.style.background = "hsl(45, 35%, 94%)";
    header.style.boxShadow = "none";
    header.style.borderBottom = "1px solid hsla(38, 40%, 45%, 0.2)";
  }
});

// ===== Ring rotates while scrolling =====
let scrollTimeout;

window.addEventListener(
  "scroll",
  () => {
    const ring = document.querySelector(".ring");
    if (!ring) return;

    // start spinning on scroll
    ring.classList.add("spin");

    // stop spinning shortly after scroll ends
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      ring.classList.remove("spin");
    }, 140);
  },
  { passive: true }
);

// ===== Education timeline reveal on scroll =====
document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector(".timeline");
  const items = document.querySelectorAll(".timeline-item");

  if (!timeline || items.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // animate the line once
          timeline.classList.add("is-visible");

          // reveal each item
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((item) => observer.observe(item));
});

// ===== Experience reveal on scroll (stagger) =====
document.addEventListener("DOMContentLoaded", () => {
  const expItems = document.querySelectorAll(".experience-item");
  if (expItems.length === 0) return;

  const expObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // stagger reveal: each card gets a small delay
        const index = [...expItems].indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 90}ms`;
        entry.target.classList.add("is-visible");

        // optional: stop observing once revealed
        expObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  expItems.forEach((item) => expObserver.observe(item));
});

/* ============================= */
/*  FLOATING CTA - CIRCULAR TEXT */
/* ============================= */

const ringSpan = document.querySelector(".floating-text > span");

if (ringSpan) {
  const text = ringSpan.textContent.trim();
  ringSpan.textContent = "";

  const radius = 68; // ajuste 62-74 selon rendu
  const chars = text.split("");
  const step = 360 / chars.length;

  chars.forEach((char, i) => {
    const letter = document.createElement("span");
    letter.textContent = char === " " ? "\u00A0" : char;

    // style inline pour être sûr que ça marche même si CSS manque
    letter.style.position = "absolute";
    letter.style.left = "50%";
    letter.style.top = "50%";
    letter.style.transformOrigin = "0 0";

    // 1) place la lettre sur le cercle
    // 2) rotate(90deg) pour la rendre lisible autour
    letter.style.transform = `rotate(${i * step}deg) translate(${radius}px) rotate(90deg)`;

    ringSpan.appendChild(letter);
  });
}

/* ============================= */
/*  AUTO YEAR (footer)           */
/* ============================= */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ============================= */
/*  SMOOTH SCROLL (anchor links) */
/* ============================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


/* ============================= */
/*  AUTO YEAR IN FOOTER          */
/* ============================= */

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ============================= */
/*  PAGE TRANSITION (SLIDE)      */
/* ============================= */

window.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("page-wrapper");
  if (wrapper) wrapper.classList.add("is-loaded");
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) return;

  // ignore external / mail / new tab / same-page anchors
  if (href.startsWith("http")) return;
  if (href.startsWith("mailto:")) return;
  if (href.startsWith("#")) return;
  if (link.target === "_blank") return;

  // Only animate for page navigations (html files)
  const isPageNav = href.includes(".html");
  if (!isPageNav) return;

  const transition = document.getElementById("page-transition");
  if (!transition) return;

  e.preventDefault();
  transition.classList.add("is-active");

  setTimeout(() => {
    window.location.href = href;
  }, 420);
});