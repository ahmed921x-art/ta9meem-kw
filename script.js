/* ═══════════════════════════════════════
   ta9meem.kw — Main Script
   ═══════════════════════════════════════ */

// ─── Hamburger menu ───────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ─── Smooth scroll ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.getElementById('navbar').offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Order Form ───────────────────────
const orderForm = document.getElementById('orderForm');
const toast = document.getElementById('toast');

orderForm.addEventListener('submit', e => {
  e.preventDefault();

  const btn = orderForm.querySelector('.btn-submit');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const name    = orderForm.querySelector('input[type="text"]').value;
  const phone   = orderForm.querySelector('input[type="tel"]').value;
  const type    = orderForm.querySelector('select').value;
  const details = orderForm.querySelector('textarea').value;

  const msg = encodeURIComponent(
    `Hello! I'd like to place an order.\n` +
    `Name: ${name}\n` +
    `Order type: ${type}\n` +
    `Details: ${details}\n` +
    `My number: ${phone}`
  );

  setTimeout(() => {
    window.open(`https://wa.me/96500000000?text=${msg}`, '_blank');
    orderForm.reset();
    btn.disabled = false;
    btn.innerHTML = 'Send Order <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }, 600);
});

// ─── Fade-in on scroll ────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.col-card, .product-card, .strip-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 80}ms, transform 0.5s ease ${(i % 4) * 80}ms`;
  fadeObserver.observe(el);
});
