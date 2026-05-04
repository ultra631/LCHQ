/* ============================================================
   LCHQ — ANIMATIONS ENGINE
   - Scroll reveal (IntersectionObserver)
   - Stagger automatique sur grilles
   - Compteurs count-up sur stats
   - Tilt 3D au hover sur cards
   - Particules canvas (rondelles de hockey + lueurs)
   - Confetti sur événements (optionnel)
   - Respecte prefers-reduced-motion
   ============================================================ */

(function () {
  'use strict';

  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. SCROLL REVEAL ---------- */
  const REVEAL_SELECTORS = [
    '.section-title',
    '.card',
    '.team-card',
    '.match-card',
    '.division-banner',
    '.leader-row',
    '.team-header'
  ];

  function initReveal() {
    if (REDUCE_MOTION) return;

    const all = document.querySelectorAll(REVEAL_SELECTORS.join(','));
    all.forEach((el) => {
      // Ne pas appliquer reveal aux .leader-row (déjà visibles dès le départ)
      // mais bien aux cards/match-card/team-card
      if (
        el.classList.contains('card') ||
        el.classList.contains('team-card') ||
        el.classList.contains('match-card')
      ) {
        el.classList.add('reveal-init');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger basé sur la position dans la grille parente
            const parent = entry.target.parentElement;
            const siblings = parent
              ? Array.from(parent.children).filter((c) =>
                  c.matches(REVEAL_SELECTORS.join(','))
                )
              : [];
            const idx = siblings.indexOf(entry.target);
            const delay = Math.min(idx * 60, 400); // max 400ms

            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    all.forEach((el) => observer.observe(el));
  }

  // Re-observer quand on change de page (les .page.active changent)
  function reobserveAfterPageChange() {
    if (REDUCE_MOTION) return;

    // Patch léger : observer les changements de classe .active sur les .page
    const pages = document.querySelectorAll('.page');
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (
          m.attributeName === 'class' &&
          m.target.classList.contains('active')
        ) {
          // re-init reveal pour les nouveaux éléments
          setTimeout(initReveal, 50);
          setTimeout(initCountUp, 100);
        }
      });
    });
    pages.forEach((p) =>
      mutationObserver.observe(p, { attributes: true, attributeFilter: ['class'] })
    );
  }

  /* ---------- 2. COUNT-UP SUR STATS ---------- */
  function animateNumber(el, target, duration = 1000) {
    if (REDUCE_MOTION) {
      el.textContent = target;
      return;
    }
    const start = 0;
    const startTime = performance.now();
    const isFloat = String(target).includes('.');

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      el.textContent = isFloat ? current.toFixed(2) : Math.round(current);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  function initCountUp() {
    if (REDUCE_MOTION) return;

    // Cible les stat-block-value et leader-stat dans les sections visibles
    const targets = document.querySelectorAll(
      '.stat-block-value, .leader-stat'
    );
    targets.forEach((el) => {
      if (el.dataset.lchqCounted) return;

      const txt = el.textContent.trim();
      const num = parseFloat(txt.replace(',', '.'));
      if (isNaN(num)) return;

      // S'assurer que l'élément est dans une page active ou visible
      const page = el.closest('.page');
      if (page && !page.classList.contains('active')) return;

      el.dataset.lchqCounted = '1';
      el.dataset.lchqOriginal = txt;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateNumber(entry.target, num, 900);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
    });
  }

  /* ---------- 3. TILT 3D AU HOVER (cards d'équipe) ---------- */
  function initTilt() {
    if (REDUCE_MOTION) return;
    if (window.matchMedia('(hover: none)').matches) return; // skip mobile

    document.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.team-card, .card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const intensity = card.classList.contains('team-card') ? 8 : 4;

      card.style.transform = `
        translateY(-6px)
        scale(1.01)
        rotateY(${x * intensity}deg)
        rotateX(${-y * intensity}deg)
      `;
    });

    document.addEventListener('mouseout', (e) => {
      const card = e.target.closest('.team-card, .card');
      if (card && !card.contains(e.relatedTarget)) {
        card.style.transform = '';
      }
    });
  }

  /* ---------- 4. PARTICULES CANVAS (rondelles + glow) ---------- */
  function initParticles() {
    if (REDUCE_MOTION) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'lchq-particles';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    let particles = [];
    const PARTICLE_COUNT = window.innerWidth < 768 ? 18 : 35;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function spawn() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.4 + 0.15,
        type: Math.random() < 0.18 ? 'puck' : 'glow',
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01
      };
    }

    function init() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(spawn());
    }

    function step() {
      ctx.clearRect(0, 0, W, H);

      // Lignes connectives entre particules proches
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(230, 57, 70, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        // wrap autour
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        if (p.type === 'puck') {
          // Mini rondelle
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = `rgba(20, 20, 25, ${p.opacity * 1.5})`;
          ctx.strokeStyle = `rgba(230, 57, 70, ${p.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 2.5, p.r * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        } else {
          // Glow rouge
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          grad.addColorStop(0, `rgba(230, 57, 70, ${p.opacity})`);
          grad.addColorStop(1, 'rgba(230, 57, 70, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(step);
    }

    resize();
    init();
    step();
    window.addEventListener('resize', () => {
      resize();
      init();
    });
  }

  /* ---------- 5. RIPPLE EFFECT (boutons) ---------- */
  function initRipple() {
    if (REDUCE_MOTION) return;

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn, .nav-btn, .row-action-btn');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.cssText = `
        position: absolute;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.35);
        pointer-events: none;
        transform: scale(0);
        animation: lchq-ripple 0.6s ease-out;
      `;

      const oldPos = getComputedStyle(btn).position;
      if (oldPos === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

    // Inject keyframe une seule fois
    if (!document.getElementById('lchq-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'lchq-ripple-style';
      style.textContent = `
        @keyframes lchq-ripple {
          to { transform: scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ---------- 6. PARALLAX SUR HERO ---------- */
  function initParallax() {
    if (REDUCE_MOTION) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const banners = document.querySelectorAll('.hero-banner');
    if (!banners.length) return;

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      banners.forEach((b) => {
        b.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
        b.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  /* ---------- 7. CONFETTI (utilitaire global) ---------- */
  window.lchqConfetti = function (x, y) {
    if (REDUCE_MOTION) return;

    const colors = ['#e63946', '#ffb81c', '#4ade80', '#5b9bd5', '#ff4757'];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'lchq-confetti-piece';
      piece.style.left = (x ?? window.innerWidth / 2) + 'px';
      piece.style.top = (y ?? 100) + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      const angle = (Math.random() - 0.5) * 200;
      piece.style.transform = `translateX(${angle}px) rotate(${Math.random() * 360}deg)`;
      piece.style.animationDelay = Math.random() * 0.3 + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3000);
    }
  };

  /* ---------- 8. SHINE SUR LOGO TABLE AU SCROLL ---------- */
  function initLogoShine() {
    if (REDUCE_MOTION) return;
    // Chaque fois qu'un tableau apparaît, faire un sweep léger sur les logos
    const tables = document.querySelectorAll('.table-wrap');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const logos = entry.target.querySelectorAll('.team-logo-table');
            logos.forEach((logo, i) => {
              logo.style.animation = `logo-spin 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 30}ms`;
              setTimeout(() => (logo.style.animation = ''), 800 + i * 30);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    tables.forEach((t) => observer.observe(t));
  }

  /* ---------- INIT ---------- */
  function start() {
    initParticles();
    initReveal();
    initCountUp();
    initTilt();
    initRipple();
    initParallax();
    initLogoShine();
    reobserveAfterPageChange();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
