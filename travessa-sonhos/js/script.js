(function () {
  'use strict';

  // Logo/nome do header sempre volta ao topo (âncora sozinha pode falhar
  // porque o header já é sticky e "parece" estar no topo em alguns navegadores)
  var brandLink = document.querySelector('.brand-mini');
  if (brandLink) {
    brandLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Menu mobile
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Animação de entrada das seções
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Ano do rodapé
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Carrossel de produtos
  var track = document.getElementById('carouselTrack');
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');

  if (track && prevBtn && nextBtn) {
    var slides = Array.prototype.slice.call(track.children);

    // Calcula o slide mais próximo do centro do viewport na hora do clique.
    function getCurrentIndex() {
      var viewportRect = track.parentElement.getBoundingClientRect();
      var viewportCenter = viewportRect.left + viewportRect.width / 2;
      var closest = 0;
      var closestDist = Infinity;
      slides.forEach(function (slide, i) {
        var rect = slide.getBoundingClientRect();
        var dist = Math.abs((rect.left + rect.width / 2) - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    }

    prevBtn.addEventListener('click', function () {
      var target = Math.max(getCurrentIndex() - 1, 0);
      slides[target].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });

    nextBtn.addEventListener('click', function () {
      var target = Math.min(getCurrentIndex() + 1, slides.length - 1);
      slides[target].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  }
})();
