// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('is-open');
  toggle.classList.toggle('is-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when a link is tapped
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Subtly tint the nav background on scroll (already dark, just adds a border emphasis)
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 10
    ? 'rgba(237, 165, 27, 0.35)'
    : 'rgba(237, 165, 27, 0.2)';
}, { passive: true });

// Active nav link on scroll
const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
const sections  = document.querySelectorAll('section[id], div[id="ciders"]');
const navAnchors = links.querySelectorAll('a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
    });
  });
}, {
  rootMargin: `-${navHeight}px 0px -60% 0px`,
  threshold: 0,
});

sections.forEach(s => observer.observe(s));
