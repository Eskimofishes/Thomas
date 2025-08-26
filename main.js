// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('mobile-menu');
hamburger?.addEventListener('click',()=>{
  const open = menu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});

// Simple testimonial slider
const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.dots button');
let idx = 0;
function go(i){
  idx = i;
  slides.style.transform = `translateX(${i * -100}%)`;
  dots.forEach((d,j)=>d.classList.toggle('active', j===i));
}
dots.forEach((d,i)=> d.addEventListener('click', ()=>go(i)));
setInterval(()=> go((idx+1)%dots.length), 6000);

// Contact form front-end stub
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(!form.checkValidity()){
    status.textContent = 'Please fill in the required fields.';
    return;
  }
  status.textContent = 'Thank you! Your message has been sent.';
  form.reset();
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
