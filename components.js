(function () {
  function initNav() {
    // ===== SET ACTIVE NAV LINK =====
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    var page = filename.replace('.html', '') || 'index';

    document.querySelectorAll('.nav-link[data-page], .mobile-link[data-page]').forEach(function (link) {
      if (link.getAttribute('data-page') === page) {
        link.classList.add('active');
      }
    });

    // ===== NAVBAR SCROLL =====
    var navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      });
    }

    // ===== HAMBURGER MENU =====
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      });
      mobileMenu.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
        });
      });
    }
  }

  function loadPartial(placeholderId, url) {
    var el = document.getElementById(placeholderId);
    if (!el) return Promise.resolve();
    return fetch(url)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        var temp = document.createElement('div');
        temp.innerHTML = html;
        el.replaceWith(temp.firstElementChild);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
      loadPartial('nav-placeholder', 'partials/nav.html'),
      loadPartial('footer-placeholder', 'partials/footer.html')
    ]).then(initNav);
  });
})();
