'use strict';

// ===== DATA =====
const destinations = [
  { id: 1, name: 'Santorini', country: 'Griekenland', region: 'europa', emoji: '🌅', gradient: 'linear-gradient(135deg,#667eea,#764ba2)', price: 'v.a. €649', rating: '4.9', category: 'Eiland' },
  { id: 2, name: 'Bali', country: 'Indonesië', region: 'azie', emoji: '🌴', gradient: 'linear-gradient(135deg,#11998e,#38ef7d)', price: 'v.a. €799', rating: '4.8', category: 'Tropisch' },
  { id: 3, name: 'Parijs', country: 'Frankrijk', region: 'europa', emoji: '🗼', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)', price: 'v.a. €349', rating: '4.7', category: 'Stad' },
  { id: 4, name: 'New York', country: 'USA', region: 'amerika', emoji: '🗽', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)', price: 'v.a. €549', rating: '4.8', category: 'Stad' },
  { id: 5, name: 'Marrakech', country: 'Marokko', region: 'africa', emoji: '🕌', gradient: 'linear-gradient(135deg,#fa709a,#fee140)', price: 'v.a. €399', rating: '4.6', category: 'Cultuur' },
  { id: 6, name: 'Tokyo', country: 'Japan', region: 'azie', emoji: '⛩️', gradient: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', price: 'v.a. €899', rating: '4.9', category: 'Cultuur' },
  { id: 7, name: 'Barcelona', country: 'Spanje', region: 'europa', emoji: '🏖️', gradient: 'linear-gradient(135deg,#ffd89b,#19547b)', price: 'v.a. €299', rating: '4.7', category: 'Stad' },
];

const packages = [
  {
    title: 'Griekse Eilandhopping',
    dest: 'Santorini & Mykonos',
    duration: '10 dagen',
    emoji: '🌊',
    gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
    desc: 'Ontdek de magie van de Cycladen: blauwe koepels, kristalhelder water en heerlijke Griekse keuken.',
    includes: ['Vluchten v/n Brussel', '4-sterrens hotels', 'Ontbijt dagelijks', 'Rondvaart eilanden', 'Nederlandstalige gids'],
    price: '€1.249',
    per: '/p.p.',
    tags: ['Bestseller', 'Koppels'],
    featured: true,
  },
  {
    title: 'Bali Wellness Retreat',
    dest: 'Ubud & Seminyak',
    duration: '14 dagen',
    emoji: '🌺',
    gradient: 'linear-gradient(135deg,#11998e,#38ef7d)',
    desc: 'Een totale onthechting: yoga bij zonsopgang, rijstterrassen en traditionele Balinese massages.',
    includes: ['Vluchten v/n Amsterdam', 'Boutique villa\'s', 'Alle maaltijden', 'Dagelijkse yoga', 'Spa-behandelingen'],
    price: '€1.899',
    per: '/p.p.',
    tags: ['Wellness', 'Solo'],
    featured: false,
  },
  {
    title: 'New York City Break',
    dest: 'New York, USA',
    duration: '7 dagen',
    emoji: '🗽',
    gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)',
    desc: 'De stad die nooit slaapt: Broadway, Central Park, rooftop bars en de beste pizza van de wereld.',
    includes: ['Rechtstreekse vlucht', 'Hotel Manhattan', 'Ontbijt', 'City tour', 'MetroCard'],
    price: '€1.099',
    per: '/p.p.',
    tags: ['Steden', 'Groep'],
    featured: false,
  },
];

const testimonials = [
  {
    stars: '★★★★★',
    quote: '"Bledway Travel heeft onze huwelijksreis tot in de puntjes verzorgd. Elke dag was een verrassing. We droomden al jaren van Bali en het overtrof al onze verwachtingen!"',
    name: 'Sophie & Thomas V.',
    trip: 'Huwelijksreis Bali, 2025',
    emoji: '💑',
  },
  {
    stars: '★★★★★',
    quote: '"Als solo-reiziger was ik wat onzeker, maar het team van Bledway heeft me perfect begeleid. De groepsreis naar Japan was de beste beslissing van mijn leven!"',
    name: 'Marie-Laure D.',
    trip: 'Groepsreis Japan, 2025',
    emoji: '🌸',
  },
  {
    stars: '★★★★★',
    quote: '"Voor de derde keer op rij boek ik bij Bledway. De persoonlijke aanpak en de kennis van de reisadviseurs is echt uniek. Je voelt dat ze mee leven met je reis."',
    name: 'Kristof M.',
    trip: 'Griekenland & Spanje, 2024–2025',
    emoji: '☀️',
  },
];

// ===== RENDER DESTINATIONS =====
function renderDestinations(filter = 'all') {
  const grid = document.getElementById('destGrid');
  const filtered = filter === 'all' ? destinations : destinations.filter(d => d.region === filter);
  grid.innerHTML = filtered.map((d, i) => `
    <div class="dest-card" data-region="${d.region}" style="${i === 0 && filter === 'all' ? 'grid-row:span 2' : ''}">
      <div class="dest-card__img" style="width:100%;height:100%;background:${d.gradient};display:flex;align-items:center;justify-content:center;">
        <span class="dest-card__emoji">${d.emoji}</span>
      </div>
      <div class="dest-card__overlay"></div>
      <div class="dest-card__body">
        <span class="dest-card__tag">${d.category}</span>
        <div class="dest-card__name">${d.name}</div>
        <div class="dest-card__meta">
          <span>📍 ${d.country}</span>
          <span class="dest-card__price">${d.price}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== RENDER PACKAGES =====
function renderPackages() {
  const grid = document.getElementById('packagesGrid');
  grid.innerHTML = packages.map(p => `
    <div class="package-card ${p.featured ? 'package-card--featured' : ''}">
      ${p.featured ? '<span class="package-card__badge">Populairste Keuze</span>' : ''}
      <div class="package-card__img" style="background:${p.gradient}">
        <span>${p.emoji}</span>
      </div>
      <div class="package-card__body">
        <div class="package-card__tags">
          ${p.tags.map(t => `<span class="pkg-tag">${t}</span>`).join('')}
          <span class="pkg-tag">⏱ ${p.duration}</span>
        </div>
        <h3 class="package-card__title">${p.title}</h3>
        <p class="package-card__desc">${p.desc}</p>
        <div class="package-card__includes">
          ${p.includes.map(inc => `<span class="include-item">${inc}</span>`).join('')}
        </div>
        <div class="package-card__footer">
          <div>
            <div class="package-card__price-label">Vanaf</div>
            <div class="package-card__price">${p.price}<span>${p.per}</span></div>
          </div>
          <button class="btn btn--primary" onclick="bookPackage('${p.title}')">Meer Info</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== RENDER TESTIMONIALS =====
let currentSlide = 0;

function renderTestimonials() {
  const slider = document.getElementById('testimonialsSlider');
  const dots = document.getElementById('sliderDots');

  slider.innerHTML = testimonials.map((t, i) => `
    <div class="testimonial-slide ${i === 0 ? 'active' : ''}">
      <div class="testimonial-stars">${t.stars}</div>
      <p class="testimonial-quote">${t.quote}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.emoji}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-trip">${t.trip}</div>
        </div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = testimonials.map((_, i) => `
    <div class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>
  `).join('');
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = index;
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function autoSlide() {
  setInterval(() => {
    const next = (currentSlide + 1) % testimonials.length;
    goToSlide(next);
  }, 5000);
}

// ===== FILTER =====
function initFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDestinations(btn.dataset.filter);
    });
  });
}

// ===== STICKY HEADER =====
function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ===== ACTIVE NAV =====
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav__link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => observer.observe(s));
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / 60;
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString('nl-BE');
          if (current >= target) clearInterval(interval);
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== HANDLERS =====
function handleSearch() {
  const dest = document.getElementById('searchDest').value.trim();
  if (!dest) { showToast('Voer een bestemming in om te zoeken.'); return; }
  showToast(`✈ Op zoek naar reizen naar ${dest}…`);
  setTimeout(() => {
    document.getElementById('bestemmingen').scrollIntoView({ behavior: 'smooth' });
  }, 800);
}

function bookPackage(title) {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  showToast(`📋 Aanvraag voor "${title}" — vul het formulier in!`);
}

function handleContact(e) {
  e.preventDefault();
  showToast('✅ Aanvraag ontvangen! We contacteren je binnen 24u.');
  e.target.reset();
}

function handleNewsletter(e) {
  e.preventDefault();
  showToast('🎉 Ingeschreven! Welkom bij de Bledway-familie.');
  e.target.reset();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in { opacity: 0; transform: translateY(30px); transition: opacity .6s ease, transform .6s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.dest-card, .package-card, .feature, .contact-item').forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderDestinations();
  renderPackages();
  renderTestimonials();
  initFilter();
  initHeader();
  initMobileMenu();
  initActiveNav();
  initCounters();
  initScrollAnimations();
  autoSlide();
});
