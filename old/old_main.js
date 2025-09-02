// // Mobile menu toggle
// const hamburger = document.getElementById('hamburger');
// const menu = document.getElementById('mobile-menu');
// hamburger?.addEventListener('click',()=>{
//   const open = menu.classList.toggle('open');
//   hamburger.setAttribute('aria-expanded', String(open));
// });

// // Simple testimonial slider (auto + dots)
// const slides = document.getElementById('slides');
// const dots = document.querySelectorAll('.dots button');
// let idx = 0;
// function go(i){
//   idx = i;
//   slides.style.transform = `translateX(${i * -100}%)`;
//   dots.forEach((d,j)=>d.classList.toggle('active', j===i));
// }
// dots.forEach((d,i)=> d.addEventListener('click', ()=>go(i)));
// setInterval(()=> go((idx+1)%dots.length), 6000);

// // Contact form stub
// const form = document.getElementById('contact-form');
// const status = document.getElementById('form-status');
// form?.addEventListener('submit', (e)=>{
//   e.preventDefault();
//   if(!form.checkValidity()){
//     status.textContent = 'Please fill in the required fields.';
//     return;
//   }
//   status.textContent = 'Thank you! Your message has been sent.';
//   form.reset();
// });

// // Year in footer
// document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('mobile-menu');

if (hamburger && menu) {
  const closeMenu = () => {
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Click outside closes
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== hamburger) closeMenu();
  });

  // Escape closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // If we cross to desktop breakpoint, ensure menu is closed
  const mq = window.matchMedia('(min-width: 992px)');
  const handleMQ = (e) => { if (e.matches) closeMenu(); };
  if (mq.addEventListener) mq.addEventListener('change', handleMQ);
  else mq.addListener(handleMQ);
}

/* =========================================================
   Testimonials Carousel
   - Supports structure:
     <div class="slider">
       <button class="arrow prev">‹</button>
       <div class="slides"> <article class="slide">…</article> … </div>
       <button class="arrow next">›</button>
       <div class="dots"></div>
     </div>
   - Also gracefully supports legacy #slides if present.
========================================================= */
document.querySelectorAll('.slider').forEach((slider) => {
  const track = slider.querySelector('.slides') || document.getElementById('slides');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.slide'));
  if (!slides.length) return;

  const prev = slider.querySelector('.arrow.prev');
  const next = slider.querySelector('.arrow.next');
  let dotsCt = slider.querySelector('.dots');

  // Create dots container if missing
  if (!dotsCt) {
    dotsCt = document.createElement('div');
    dotsCt.className = 'dots';
    slider.appendChild(dotsCt);
  }

  // Build dots
  dotsCt.innerHTML = '';
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dotsCt.appendChild(b);
  });

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsCt.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === index));
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  // Arrows
  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));

  // Keyboard navigation (focus the slider)
  slider.tabIndex = 0;
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  });

  // Basic touch swipe
  let startX = null;
  let dragging = false;

  const onStart = (x) => { startX = x; dragging = true; };
  const onMove = (x) => {
    if (!dragging || startX == null) return;
    const dx = x - startX;
    if (Math.abs(dx) > 50) {
      go(index + (dx < 0 ? 1 : -1));
      dragging = false;
      startX = null;
    }
  };
  const onEnd = () => { dragging = false; startX = null; };

  track.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchend', onEnd, { passive: true });

  // Autoplay (pause on hover/focus)
  let timer = setInterval(() => go(index + 1), 6000);
  const pause = () => { if (timer) { clearInterval(timer); timer = null; } };
  const resume = () => { if (!timer) timer = setInterval(() => go(index + 1), 6000); };

  slider.addEventListener('mouseenter', pause);
  slider.addEventListener('mouseleave', resume);
  slider.addEventListener('focusin', pause);
  slider.addEventListener('focusout', resume);

  update(); // init
});

// Contact form stub
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form && status) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in the required fields.';
      return;
    }
    status.textContent = 'Thank you! Your message has been sent.';
    form.reset();
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
