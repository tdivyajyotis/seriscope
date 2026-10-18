const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

function setMenu(open) {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

toggle?.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

window.addEventListener(
  'scroll',
  () => header?.classList.toggle('is-scrolled', window.scrollY > 18),
  { passive: true },
);

const revealed = document.querySelectorAll('.reveal, .reveal-scale');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 },
);

revealed.forEach((element) => observer.observe(element));
