/* ═══════════════════════════════════════
   تصميم KW — Main Script
   ═══════════════════════════════════════ */

// ─── Loader ───────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ─── Navbar scroll effect ─────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ─── Hamburger menu ───────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ─── Scroll Reveal ────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Stagger sibling reveals
document.querySelectorAll('.reveal').forEach((el, i) => {
  const parent = el.parentElement;
  const siblings = [...parent.querySelectorAll(':scope > .reveal')];
  const idx = siblings.indexOf(el);
  if (idx > 0) el.dataset.delay = idx * 100;
  revealObserver.observe(el);
});

// ─── Gallery Filter ───────────────────
const filterBtns = document.querySelectorAll('.gf-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.style.display = '';
        requestAnimationFrame(() => {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        });
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => item.style.display = 'none', 300);
      }
    });
  });
});

// ─── Smooth scroll for nav links ──────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Order Form ───────────────────────
const orderForm = document.getElementById('orderForm');
const toast = document.getElementById('toast');

orderForm.addEventListener('submit', e => {
  e.preventDefault();

  const btn = orderForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'جاري الإرسال...';

  // Collect form data
  const name = orderForm.querySelector('input[type="text"]').value;
  const phone = orderForm.querySelector('input[type="tel"]').value;
  const type = orderForm.querySelector('select').value;
  const details = orderForm.querySelector('textarea').value;

  // Build WhatsApp message
  const msg = encodeURIComponent(
    `مرحبا، أنا ${name}\n` +
    `نوع الطلب: ${type}\n` +
    `التفاصيل: ${details}\n` +
    `رقمي: ${phone}`
  );

  // Send to WhatsApp after small delay for UX
  setTimeout(() => {
    window.open(`https://wa.me/96500000000?text=${msg}`, '_blank');
    orderForm.reset();
    btn.disabled = false;
    btn.textContent = 'أرسل طلبك ✦';
    showToast();
  }, 800);
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ─── Floating Shapes Parallax ─────────
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('.shape').forEach((s, i) => {
    const factor = (i + 1) * 0.4;
    s.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
}, { passive: true });

// ─── Active nav link on scroll ────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── Hero cards subtle tilt ───────────
document.querySelectorAll('.hero-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

// ─── Gallery item: subtle tilt ────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    item.style.transform = `scale(1.02) rotateX(${-y}deg) rotateY(${x}deg)`;
    item.style.transition = 'transform 0.1s ease';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
    item.style.transition = 'transform 0.4s ease';
  });
});
