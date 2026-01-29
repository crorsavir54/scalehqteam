// Minimal JS: mobile menu + smooth anchor focus

(function () {
  const menuBtn = document.querySelector('[data-menu-button]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.getAttribute('aria-hidden') === 'false';
      mobileNav.setAttribute('aria-hidden', String(isOpen));
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('open', !isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Highlight active section in desktop nav
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { root: null, threshold: 0.25 }
    );

    sections.forEach((s) => io.observe(s));
  }
})();
