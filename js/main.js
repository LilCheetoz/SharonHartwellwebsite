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
