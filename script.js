const burgerBtn = document.getElementById("burgerBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const menuWrap = document.getElementById("menuWrap");

function lockScroll(lock){ document.body.style.overflow = lock ? "hidden" : ""; }

function openDropdown(){
  burgerBtn.setAttribute("aria-expanded","true");
  burgerBtn.classList.add("is-open");
  dropdownMenu.hidden = false;
  lockScroll(true);
}
function closeDropdown(){
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

// Reveal animations
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
