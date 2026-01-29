const burgerBtn = document.getElementById("burgerBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const menuWrap = document.getElementById("menuWrap");

function openDropdown() {
  burgerBtn.setAttribute("aria-expanded", "true");
  dropdownMenu.hidden = false;
}

function closeDropdown() {
  burgerBtn.setAttribute("aria-expanded", "false");
  dropdownMenu.hidden = true;
}

if (burgerBtn && dropdownMenu && menuWrap) {
  burgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
    isOpen ? closeDropdown() : openDropdown();
  });

  // Close if user clicks anywhere outside the dropdown
  document.addEventListener("click", (e) => {
    const clickedInside = menuWrap.contains(e.target);
    if (!clickedInside) closeDropdown();
  });

  // Close when user taps a dropdown link
  dropdownMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeDropdown());
  });

  // Close on scroll/touch move (mobile safari)
  window.addEventListener("scroll", closeDropdown, { passive: true });
  window.addEventListener("touchmove", closeDropdown, { passive: true });
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
  revealEls.forEach((el) => obs.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
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
