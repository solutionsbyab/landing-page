const burgerBtn = document.getElementById("burgerBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const menuWrap = document.getElementById("menuWrap");

function lockScroll(lock){ document.body.style.overflow = lock ? "hidden" : ""; }

function openDropdown(){
  if(!burgerBtn || !dropdownMenu) return;
  burgerBtn.setAttribute("aria-expanded","true");
  burgerBtn.classList.add("is-open");
  dropdownMenu.hidden = false;
  lockScroll(true);
}
function closeDropdown(){
  if(!burgerBtn || !dropdownMenu) return;
  burgerBtn.setAttribute("aria-expanded","false");
  burgerBtn.classList.remove("is-open");
  dropdownMenu.hidden = true;
  lockScroll(false);
}

if (burgerBtn && dropdownMenu && menuWrap){
  burgerBtn.addEventListener("click",(e)=>{
    e.stopPropagation();
    const open = burgerBtn.getAttribute("aria-expanded")==="true";
    open ? closeDropdown() : openDropdown();
  });

  document.addEventListener("click",(e)=>{
    if(!menuWrap.contains(e.target)) closeDropdown();
  });

  dropdownMenu.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click",()=>closeDropdown());
  });

  window.addEventListener("scroll", closeDropdown, {passive:true});
  window.addEventListener("touchmove", closeDropdown, {passive:true});
}

/* Drag-to-scroll: Delivery Snapshot */
document.querySelectorAll(".snapScroller").forEach(scroller => {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  scroller.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - scroller.offsetLeft;
    scrollLeft = scroller.scrollLeft;
  });

  scroller.addEventListener("mouseleave", () => { isDown = false; });
  scroller.addEventListener("mouseup", () => { isDown = false; });

  scroller.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scroller.offsetLeft;
    const walk = (x - startX) * 1.2;
    scroller.scrollLeft = scrollLeft - walk;
  });
});

/* Reveal */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  revealEls.forEach(el=>obs.observe(el));
}else{
  revealEls.forEach(el=>el.classList.add("is-visible"));
}

/* Contact form demo */
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
if(form){
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(formNote) formNote.textContent = "Received (demo). Connect this form to Formspree/Netlify to capture submissions.";
    form.reset();
  });
}
