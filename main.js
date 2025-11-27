// main.js — footer year, mobile nav toggle, and SR2 scroll reveal (slide+fade variety)
document.addEventListener('DOMContentLoaded', function () {
  // set years in footers
  const y = new Date().getFullYear();
  ['year','year-about','year-projects','year-contact'].forEach(id=>{
    const el = document.getElementById(id); if(el) el.textContent = y;
  });

  // nav toggle for mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', ()=>{
      const isShown = getComputedStyle(nav).display !== 'none';
      nav.style.display = isShown ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
    });
  }

  // SR2: Slide + Fade Variety
  const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // optional direction variant
        const dir = el.getAttribute('data-direction') || 'up';
        // apply small transform based on direction before revealing
        switch(dir){
          case 'left':
            el.style.transform = 'translateX(-18px)';
            break;
          case 'right':
            el.style.transform = 'translateX(18px)';
            break;
          case 'up':
          default:
            el.style.transform = 'translateY(18px)';
        }
        // stagger children reveal if container has multiple immediate children
        const children = el.children.length ? Array.from(el.children) : [];
        if (children.length > 1) {
          children.forEach((child, i) => {
            setTimeout(()=> child.classList.add('visible'), i * 120);
            // also ensure each child gets the visible CSS
            child.style.transition = '1s cubic-bezier(.2,.9,.2,1)';
            child.style.opacity = 0;
            setTimeout(()=> { child.style.opacity = 1; }, i * 120 + 50);
          });
        }
        // reveal the element itself
        setTimeout(()=> {
          el.classList.add('visible');
          el.style.transform = 'translateY(0)';
        }, 60);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(r => observer.observe(r));
});
