// Mobile menu toggle
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("mobileMenu");

toggle.onclick = () => {
  menu.classList.toggle("show");
};

// Close menu on link click
menu.querySelectorAll("a").forEach(a=>{
  a.onclick=()=>menu.classList.remove("show");
});

// Drag to scroll (Delivery Snapshot)
document.querySelectorAll(".snapScroller").forEach(scroller=>{
  let down=false,startX,scrollLeft;

  scroller.addEventListener("mousedown",e=>{
    down=true;
    startX=e.pageX;
    scrollLeft=scroller.scrollLeft;
  });
  scroller.addEventListener("mouseup",()=>down=false);
  scroller.addEventListener("mouseleave",()=>down=false);
  scroller.addEventListener("mousemove",e=>{
    if(!down)return;
    e.preventDefault();
    scroller.scrollLeft=scrollLeft-(e.pageX-startX);
  });
});
