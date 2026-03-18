document.addEventListener('DOMContentLoaded', function () {
  // ===== SCROLL REVEAL (IntersectionObserver) =====
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          const delay = (Array.from(revealEls).indexOf(entry.target) % 2) * 100;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 64;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== FEATURE CARD TOGGLE =====
  var featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      featureCards.forEach(function (c) { c.classList.remove('feature-card--highlight'); });
      card.classList.add('feature-card--highlight');
    });
  });

  // ===== CONTACT FORM SUBMIT =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit-btn');
      btn.textContent = 'Sent!';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = 'Submit';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }
});
