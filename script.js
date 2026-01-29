const burgerBtn = document.getElementById("burgerBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const menuWrap = document.getElementById("menuWrap");

function lockScroll(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

function openDropdown() {
  burgerBtn.setAttribute("aria-expanded", "true");
  burgerBtn.classList.add("is-open");
  dropdownMenu.hidden = false;
  lockScroll(true);
}

function closeDropdown() {
  burgerBtn.setAttribute("aria-expanded", "false");
  burgerBtn.classList.remove("is-open");
  dropdownMenu.hidden = true;
  lockScroll(false);
}

if (burgerBtn && dropdownMenu && menuWrap) {
  burgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
    isOpen ? closeDropdown() : openDropdown();
  });

  // Close if user taps anywhere outside menu area
  document.addEventListener("click", (e) => {
    if (!menuWrap.contains(e.target)) closeDropdown();
  });

  // Close when clicking any link in dropdown
  dropdownMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeDropdown());
  });

  // Close on scroll / swipe (mobile)
  window.addEventListener("scroll", closeDropdown, { passive: true });
  window.addEventListener("touchmove", closeDropdown, { passive: true });
}

// Reveal animation
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

  revealEls.forEach((el) => obs.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Demo contact form
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formNote) formNote.textContent = "Received (demo). Connect to Formspree/Netlify/back-end to receive emails.";
    form.reset();
  });
}
