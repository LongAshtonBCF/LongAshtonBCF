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

// Countdown to 4pm Saturday 26 September 2026
const TARGET = new Date('2026-09-26T16:00:00');
const cdDays  = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins  = document.getElementById('cd-mins');
const cdSecs  = document.getElementById('cd-secs');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = TARGET - Date.now();
  if (diff <= 0) {
    document.getElementById('countdown').remove();
    clearInterval(countdownInterval);
    return;
  }
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);
  cdDays.textContent  = days;
  cdHours.textContent = pad(hours);
  cdMins.textContent  = pad(mins);
  cdSecs.textContent  = pad(secs);
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Active nav link on scroll
const navHeight  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
const sections   = document.querySelectorAll('section[id], div[id="ciders"]');
const navAnchors = links.querySelectorAll('a[href^="#"]');

function updateActiveNav() {
  const trigger = window.scrollY + navHeight + 40;
  let activeId = null;

  sections.forEach(s => {
    if (s.offsetTop <= trigger) activeId = s.id;
  });

  // Only highlight if we've scrolled past the hero
  const heroBottom = document.getElementById('top').offsetTop + document.getElementById('top').offsetHeight;
  if (window.scrollY + navHeight < heroBottom - 80) activeId = null;

  navAnchors.forEach(a => {
    a.classList.toggle('is-active', activeId !== null && a.getAttribute('href') === `#${activeId}`);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
