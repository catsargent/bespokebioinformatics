/* Bespoke Bioinformatics — small enhancements. The site works without JavaScript. */
(function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Testimonials (arrows are hidden automatically when there is only one)
  document.querySelectorAll('.testimonials').forEach(function (box) {
    var slides = box.querySelectorAll('.testimonial');
    if (slides.length < 2) { box.classList.add('single'); return; }
    var i = 0;
    function show(n) {
      slides[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
    }
    box.querySelector('.t-prev').addEventListener('click', function () { show(i - 1); });
    box.querySelector('.t-next').addEventListener('click', function () { show(i + 1); });
  });

  // Contact form: send in the background and show a confirmation message
  document.querySelectorAll('form.form').forEach(function (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      if (!window.fetch) return;           // fall back to normal submission
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true; status.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.ok) { form.reset(); status.textContent = 'Thanks for submitting!'; }
          else { status.textContent = 'Sorry, that did not send. Please email me directly.'; }
        })
        .catch(function () { status.textContent = 'Sorry, that did not send. Please email me directly.'; })
        .then(function () { btn.disabled = false; });
    });
  });
})();
