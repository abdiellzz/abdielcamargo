/* ==========================================================================
   Abdiel Camargo — Portafolio
   Interacciones: navegación, terminal, galería de capturas y contacto
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CONFIGURACIÓN RÁPIDA
   -------------------------------------------------------------------------- */
const SITE = {
  email: 'camargoabdiel015@gmail.com',
  whatsapp: '50767862691'   // sin +, sin espacios, sin guiones
};

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* ------------------------------------------------------------------------
     Año dinámico
     ------------------------------------------------------------------------ */
  $$('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ------------------------------------------------------------------------
     Navegación: fondo al hacer scroll + barra de progreso
     ------------------------------------------------------------------------ */
  const nav = $('[data-nav]');
  const progress = $('[data-progress]');

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('is-scrolled', y > 16);

    if (progress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      progress.style.width = pct + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------------
     Menú móvil
     ------------------------------------------------------------------------ */
  const menuToggle = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');

  function closeMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    mobileMenu.hidden = true;
    if (nav) nav.classList.remove('is-open');
  }

  function openMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');
    mobileMenu.hidden = false;
    if (nav) nav.classList.add('is-open');
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    $$('a', mobileMenu).forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ------------------------------------------------------------------------
     Animaciones de entrada
     ------------------------------------------------------------------------ */
  const revealItems = $$('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    const groups = new Map();
    revealItems.forEach((el) => {
      const parent = el.parentElement;
      const index = groups.get(parent) || 0;
      groups.set(parent, index + 1);
      el.style.setProperty('--d', Math.min(index * 70, 280) + 'ms');
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach((el) => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     Enlace activo según la sección visible
     ------------------------------------------------------------------------ */
  const navAnchors = $$('.nav-links a');
  const sections = ['sobre', 'stack', 'proyectos', 'trayectoria']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const visible = new Map();

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let bestId = null;
      let bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });

      navAnchors.forEach((a) => {
        const target = a.getAttribute('href').replace('#', '');
        a.classList.toggle('is-active', target === bestId);
      });
    }, { threshold: [0.15, 0.4, 0.7] });

    sections.forEach((section) => spy.observe(section));
  }

  /* ------------------------------------------------------------------------
     Terminal animada del hero
     ------------------------------------------------------------------------ */
  const terminal = $('[data-terminal]');

  const TERMINAL_LINES = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', html: 'abdiel_camargo · <span class="hl">sistemas + desarrollo</span>' },
    { type: 'cmd', text: 'cat enfoque.txt' },
    { type: 'out', html: 'web · IA aplicada · <span class="hl">ciberseguridad</span>' },
    { type: 'cmd', text: 'ls proyectos/' },
    { type: 'out', html: '<span class="ok">faction-vault/</span> <span class="ok">iamed/</span> <span class="ok">allen/</span>' },
    { type: 'cmd', text: 'status --now' },
    { type: 'out', html: 'aprendiendo · construyendo · iterando' }
  ];

  function makeLine() {
    const line = document.createElement('div');
    line.className = 'tl-line';
    terminal.appendChild(line);
    return line;
  }

  function addCursor(parent) {
    const caret = document.createElement('span');
    caret.className = 'tl-cursor';
    parent.appendChild(caret);
    return caret;
  }

  function removeCursors() {
    $$('.tl-cursor', terminal).forEach((el) => el.remove());
  }

  function renderStatic() {
    TERMINAL_LINES.forEach((item) => {
      const line = makeLine();
      if (item.type === 'cmd') {
        line.innerHTML = '<span class="prompt">$ </span><span class="cmd">' + item.text + '</span>';
      } else {
        line.innerHTML = '<span class="out">' + item.html + '</span>';
      }
    });
    addCursor(makeLine());
  }

  async function typeTerminal() {
    if (!terminal) return;
    if (reduceMotion) { renderStatic(); return; }

    await sleep(650);

    for (const item of TERMINAL_LINES) {
      const line = makeLine();

      if (item.type === 'cmd') {
        line.innerHTML = '<span class="prompt">$ </span>';
        const cmd = document.createElement('span');
        cmd.className = 'cmd';
        line.appendChild(cmd);
        const caret = addCursor(line);

        for (const char of item.text) {
          cmd.textContent += char;
          await sleep(34 + Math.random() * 40);
        }
        caret.remove();
        addCursor(line);
        await sleep(260);
      } else {
        line.innerHTML = '<span class="out">' + item.html + '</span>';
        removeCursors();
        addCursor(line);
        await sleep(420);
      }
    }
  }

  if (terminal) {
    if ('IntersectionObserver' in window) {
      const terminalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          terminalObserver.disconnect();
          typeTerminal();
        });
      }, { threshold: 0.2 });
      terminalObserver.observe(terminal);
    } else {
      renderStatic();
    }
  }

  /* ------------------------------------------------------------------------
     Luz que sigue al cursor en el hero
     ------------------------------------------------------------------------ */
  const spotlight = $('[data-spotlight]');
  const hero = $('.hero');

  if (spotlight && hero && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    let raf = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      if (!raf) {
        currentX = targetX;
        currentY = targetY;
        const loop = () => {
          currentX += (targetX - currentX) * 0.12;
          currentY += (targetY - currentY) * 0.12;
          spotlight.style.transform = `translate3d(${currentX - 310}px, ${currentY - 310}px, 0)`;
          raf = Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5
            ? requestAnimationFrame(loop)
            : null;
        };
        raf = requestAnimationFrame(loop);
      }
    });
  }

  /* ------------------------------------------------------------------------
     Visor de capturas (lightbox)
     ------------------------------------------------------------------------ */
  const shots = $$('.shot[data-full]');
  const lightbox = $('[data-lightbox]');
  const lbImg = $('[data-lb-img]');
  const lbCap = $('[data-lb-caption]');
  const lbCounter = $('[data-lb-counter]');
  const lbClose = $('[data-lb-close]');
  const lbPrev = $('[data-lb-prev]');
  const lbNext = $('[data-lb-next]');
  let currentShot = 0;
  let lastFocused = null;

  function showShot(index) {
    if (!shots.length) return;
    currentShot = (index + shots.length) % shots.length;
    const shot = shots[currentShot];
    const img = shot.querySelector('img');
    lbImg.src = shot.dataset.full;
    lbImg.alt = img ? img.alt : '';
    if (lbCap) lbCap.textContent = shot.dataset.caption || '';
    if (lbCounter) lbCounter.textContent = (currentShot + 1) + ' / ' + shots.length;
  }

  function openLightbox(index) {
    if (!lightbox) return;
    lastFocused = shots[index];
    showShot(index);
    lightbox.hidden = false;
    document.documentElement.classList.add('is-locked');
    if (lbClose) lbClose.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.documentElement.classList.remove('is-locked');
    if (lastFocused) lastFocused.focus({ preventScroll: true });
  }

  if (lightbox) {
    shots.forEach((shot, index) => {
      shot.addEventListener('click', () => openLightbox(index));
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', () => showShot(currentShot - 1));
    if (lbNext) lbNext.addEventListener('click', () => showShot(currentShot + 1));

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (lightbox.hidden) {
        if (event.key === 'Escape') closeMenu();
        return;
      }
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') showShot(currentShot + 1);
      if (event.key === 'ArrowLeft') showShot(currentShot - 1);
    });

    // Deslizar en móvil
    let touchStartX = null;
    lightbox.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (event) => {
      if (touchStartX === null) return;
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 55) showShot(currentShot + (delta < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Copiar correo
     ------------------------------------------------------------------------ */
  const copyBtn = $('[data-copy-email]');
  const copyLabel = $('[data-copy-label]');

  if (copyBtn && SITE.email) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(SITE.email);
        if (copyLabel) copyLabel.textContent = '¡Copiado!';
        copyBtn.classList.add('is-copied');
      } catch (error) {
        window.location.href = 'mailto:' + SITE.email;
      }
      setTimeout(() => {
        if (copyLabel) copyLabel.textContent = 'Copiar correo';
        copyBtn.classList.remove('is-copied');
      }, 2200);
    });
  }
})();
