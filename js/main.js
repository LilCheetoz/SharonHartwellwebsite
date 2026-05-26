/* ============================================================
   SHARON HARTWELL MLA – MAIN JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  // ── Mobile Nav ───────────────────────────────────────────
  const navToggle  = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Active nav link ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Service Tabs ─────────────────────────────────────────
  const serviceTabs   = document.querySelectorAll('.service-tab');
  const servicePanels = document.querySelectorAll('.service-panel');

  serviceTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      serviceTabs.forEach((t) => t.classList.remove('active'));
      servicePanels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // ── Contact Form ─────────────────────────────────────────
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      // Simulate async send (replace with real endpoint integration)
      setTimeout(() => {
        contactForm.innerHTML = `
          <div class="form-success">
            <h3>Thank you for your message!</h3>
            <p>Our office will respond within 2–3 business days.<br>
            For urgent matters, please call us directly at the constituency office.</p>
          </div>`;
      }, 800);
    });
  }

  // ── Smooth scroll for in-page hash links ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id  = this.getAttribute('href').slice(1);
      const el  = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top  = el.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Transparent nav (home page hero) ─────────────────────
  const homeHero = document.querySelector('.home-hero');
  const siteHeader = document.querySelector('.site-header');
  if (homeHero && siteHeader) {
    siteHeader.classList.add('is-transparent');
    const onScroll = () => {
      const heroBottom = homeHero.getBoundingClientRect().bottom;
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 76;
      if (heroBottom <= navH + 40) {
        siteHeader.classList.remove('is-transparent');
      } else {
        siteHeader.classList.add('is-transparent');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Dark / Light mode toggle ─────────────────────────────
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.setAttribute('aria-label', 'Toggle dark mode');
  themeBtn.innerHTML = `
    <svg class="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    <svg class="icon-sun"  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
  `;

  const navInner = document.querySelector('.nav-inner');
  if (navInner) {
    const hamburger = navInner.querySelector('.nav-toggle');
    navInner.insertBefore(themeBtn, hamburger || null);
  }

  // Apply saved or system preference before first paint
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
  }

  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // ── Dismiss announcement bar ─────────────────────────────
  const announceClose = document.querySelector('.announce-close');
  if (announceClose) {
    announceClose.addEventListener('click', () => {
      const bar = document.querySelector('.announce-bar');
      if (bar) {
        bar.style.display = 'none';
        document.body.classList.remove('has-announce');
      }
    });
  }
})();
