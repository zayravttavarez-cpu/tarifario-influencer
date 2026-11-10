(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Interruptor Emprendedor / Empresa
  var tarifas = document.getElementById('tarifas');
  var seg = tarifas.querySelectorAll('.seg button');
  seg.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tarifas.setAttribute('data-tier', btn.getAttribute('data-set'));
      seg.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
    });
  });

  // Modo claro / oscuro
  document.querySelector('.theme').addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Aparición al hacer scroll
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Contadores de cifras
  function fmt(n, dec) {
    return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function count(el) {
    var to = parseFloat(el.dataset.to), dec = +el.dataset.dec;
    var pre = el.dataset.prefix, suf = el.dataset.suffix, t0 = null, dur = 1200;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(to * e, dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.stats b');
  if (!reduce && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { count(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { co.observe(n); });
  }

  // Menú hamburguesa (móvil)
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  document.querySelectorAll('.links a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', function (e) { if (!nav.contains(e.target)) setMenu(false); });

  // Botón de volver arriba
  var totop = document.querySelector('.totop');
  function onScroll() { totop.classList.toggle('show', window.scrollY > 600); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // PDF: abre todas las cláusulas para imprimir y las restaura después
  var closed = [];
  window.addEventListener('beforeprint', function () {
    closed = [];
    document.querySelectorAll('details').forEach(function (d) {
      if (!d.open) { closed.push(d); d.open = true; }
    });
  });
  window.addEventListener('afterprint', function () {
    closed.forEach(function (d) { d.open = false; });
  });
  document.getElementById('pdf').addEventListener('click', function () { window.print(); });
})();
