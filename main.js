// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('mobile-menu');
hamburger?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});

// Simple stat counter animation (for 80,000 / 30+)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    if (!target) { observer.unobserve(el); return; }

    let current = 0;
    const step = Math.max(1, Math.round(target / 80));
    const tick = () => {
      current += step;
      if (current >= target) { current = target; }
      el.textContent = target >= 1000 ? current.toLocaleString() : current;
      if (current < target) { requestAnimationFrame(tick); } else { observer.unobserve(el); }
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => observer.observe(el));

// Quote form (frontend only)
const form = document.getElementById('quote-form');
const status = document.getElementById('form-status');
const success = document.getElementById('success');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    status.textContent = 'Please fill in all required fields.';
    return;
  }
  status.textContent = '';
  success.hidden = false;
  form.reset();
  // Smooth scroll to success
  success.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Make "Home" always scroll to the very top
document.querySelectorAll('a[href="#home"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // keep the URL hash consistent (optional)
    if (history.replaceState) history.replaceState(null, '', '#home');
  });
});
