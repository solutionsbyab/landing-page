// Mobile menu (iPhone-safe)
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobileMenu");
const menuOverlay = document.querySelector(".menuOverlay");

function openMenu() {
  if (!burger || !mobileMenu || !menuOverlay) return;
  burger.setAttribute("aria-expanded", "true");
  mobileMenu.hidden = false;
  menuOverlay.hidden = false;
}

function closeMenu() {
  if (!burger || !mobileMenu || !menuOverlay) return;
  burger.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
  menuOverlay.hidden = true;
}

if (burger && mobileMenu && menuOverlay) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Close when tapping outside the menu
  menuOverlay.addEventListener("click", closeMenu);

  // Close when clicking any link in the menu
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", closeMenu);
  });

  // Close if user swipes/scrolls anywhere (iOS reliable)
  window.addEventListener("touchmove", () => {
    if (burger.getAttribute("aria-expanded") === "true") closeMenu();
  }, { passive: true });
}

// Slide-in reveal on scroll
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => obs.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("is-visible"));
}

// Demo contact form (replace with Formspree/Netlify/backend)
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formNote) {
      formNote.textContent =
        "Received (demo). Connect this form to Formspree/Netlify or your backend to receive emails.";
    }
    form.reset();
  });
}
