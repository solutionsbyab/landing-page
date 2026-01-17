// Mobile menu
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobileMenu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  // Close menu on link click
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

// Demo contact form (replace with real endpoint)
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // OPTION 1 (simple): mailto (opens user's email client)
    // const data = new FormData(form);
    // const subject = encodeURIComponent("New enquiry — Solutions by AB");
    // const body = encodeURIComponent(
    //   `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\nMessage:\n${data.get("message")}`
    // );
    // window.location.href = `mailto:you@yourdomain.com?subject=${subject}&body=${body}`;

    // OPTION 2 (recommended): Formspree / Netlify Forms / your backend
    // - Formspree: add action="https://formspree.io/f/xxxxx" method="POST" to the form in HTML
    // - Netlify: add netlify attribute + hidden input name="form-name"
    // Then remove this preventDefault.

    if (formNote) {
      formNote.textContent = "Received (demo). Hook this form to Formspree/Netlify or your backend to make it live.";
    }
    form.reset();
  });
}
