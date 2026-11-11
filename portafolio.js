(function () {
  var B = 'portafolio-media/';
  var WA = 'https://wa.me/18298492470?text=Hola%20Zayra%2C%20quiero%20ver%20m%C3%A1s%20ejemplos%20de%20contenido.';
  var VIDEOS = {
    skincare: {
      featured: { id: 'skincare-rutina', title: 'Rutina de skincare', desc: 'Una rutina explicada paso a paso y en lenguaje simple, con el producto en mano y el orden en que se usa.', tag: 'Video completo' },
      others: [
        { id: 'skincare-manchas', title: 'Manchas en la piel · fragmento de 1:30' },
        { id: 'skincare-resenas', title: 'Reseñas para piel seca' }]
    },
    nutricion: {
      featured: { id: 'nutricion-supermercados', title: 'Recomendaciones de supermercados', desc: 'Qué comprar en el supermercado para cuidar la piel y la salud: producto real, ingredientes y precio para ayudar a decidir.', tag: 'Video completo' },
      others: [
        { id: 'nutricion-recorrido', title: 'Recorrido de supermercados · fragmento de 1:30' },
        { id: 'nutricion-suplementos-1', title: 'Suplementación, parte 1 · fragmento de 1:30' },
        { id: 'nutricion-suplementos-2', title: 'Suplementación, parte 2 · fragmento de 1:30' }]
    }
  };
  var SHOTS = [
    { id: 'captura-panel', t: 'Tu panel: 365,1 mil visualizaciones y 3,0 mil nuevos seguidores' },
    { id: 'captura-resumen', t: 'Resumen de 30 días: 365,120 visualizaciones y +3,047 seguidores netos' },
    { id: 'captura-interacciones', t: 'Interacciones por tipo de contenido y actividad del perfil' },
    { id: 'captura-seguidores', t: 'Seguidores: +70,2% de crecimiento desde el 11 de octubre' },
    { id: 'captura-audiencia', t: 'Público: género y rango de edad' }];
  var AGE = [['13–17', 0.3], ['18–24', 3.9], ['25–34', 31.9], ['35–44', 38.2], ['45–54', 18.8], ['55–64', 5.0], ['65+', 1.9]];
  var GEO = [['Mujeres', 77.7], ['Hombres', 22.3]];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var play = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var vid = function (id) { return B + id + '.mp4'; };
  var img = function (id) { return B + id + '.webp'; };

  // Barras de audiencia
  function bars(el, rows) {
    el.innerHTML = rows.map(function (r) {
      return '<div class="bar"><span>' + r[0] + '</span><i><b data-w="' + r[1] + '"></b></i><span>' + r[1] + '%</span></div>';
    }).join('');
  }
  bars($('#age'), AGE);
  bars($('#geo'), GEO);

  // Videos por nicho
  Object.keys(VIDEOS).forEach(function (n) {
    var d = VIDEOS[n], f = d.featured;
    var more = d.others.length
      ? '<div class="thumbs">' + d.others.map(function (o) {
          return '<button class="thumb" data-v="' + o.id + '" type="button" aria-label="Reproducir: ' + o.title + '"><img alt="" loading="lazy" width="480" height="854" src="' + img(o.id) + '"><span>' + o.title + '</span></button>';
        }).join('') + '</div>'
      : '<p class="empty">¿Quieres ver más ejemplos de este tema? <a href="' + WA + '" target="_blank" rel="noopener">Pídemelos por WhatsApp</a>.</p>';
    $('#f-' + n).innerHTML =
      '<button class="feature" data-v="' + f.id + '" type="button" aria-label="Reproducir: ' + f.title + '"><img alt="" width="480" height="854" src="' + img(f.id) + '"><span class="play">' + play + 'Ver video</span></button>' +
      '<div><span class="pill">Lo mejor · ' + f.tag + '</span><h3 class="ftitle">' + f.title + '</h3><p class="fdesc">' + f.desc + '</p>' + more + '</div>';
  });

  $('#shots').innerHTML = SHOTS.map(function (s, i) {
    return '<button class="shot" data-shot="' + i + '" type="button" aria-label="Ampliar: ' + s.t + '"><span class="phone"><img alt="" loading="lazy" width="352" height="715" src="' + img(s.id) + '"></span><span class="cap">' + s.t + '</span></button>';
  }).join('');

  // Odómetro de cifras
  function buildOdo(el) {
    var v = el.dataset.v;
    el.setAttribute('aria-label', v); el.setAttribute('role', 'img'); el.innerHTML = '';
    v.split('').forEach(function (ch) {
      if (/\d/.test(ch)) {
        var col = document.createElement('span'); col.className = 'col'; col.setAttribute('aria-hidden', 'true');
        var st = document.createElement('span'); st.className = 'strip'; st.dataset.d = ch;
        st.innerHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) { return '<span>' + n + '</span>'; }).join('');
        st.style.transform = 'translateY(-' + ch + 'em)'; col.appendChild(st); el.appendChild(col);
      } else {
        var s = document.createElement('span'); s.className = 'sym'; s.textContent = ch; s.setAttribute('aria-hidden', 'true'); el.appendChild(s);
      }
    });
  }
  $$('.odo').forEach(buildOdo);
  // Seguidores: toma el valor de stats.json (misma fuente que el tarifario)
  fetch('stats.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (s) {
    if (!s || !(s.followers > 0)) return;
    var el = $('.odo[data-stat="followers"]');
    el.dataset.v = Number(s.followers).toLocaleString('en-US');
    buildOdo(el);
  }).catch(function () {});
  function runOdo() {
    if (reduce) return;
    var strips = $$('.odo .strip');
    strips.forEach(function (st, i) {
      st.style.transition = 'none'; st.style.transform = 'translateY(0)';
      void st.offsetHeight;
      st.style.transition = '';
      setTimeout(function () { st.style.transform = 'translateY(-' + st.dataset.d + 'em)'; }, 60 + i * 35);
    });
  }
  function runBars() {
    $$('.bar b').forEach(function (b) {
      b.style.width = reduce ? b.dataset.w + '%' : '0';
      if (!reduce) requestAnimationFrame(function () { requestAnimationFrame(function () { b.style.width = b.dataset.w + '%'; }); });
    });
  }
  $$('.bar b').forEach(function (b) { b.style.width = b.dataset.w + '%'; });

  // Diapositivas
  var slides = $$('.slide'), track = $('#track'), names = slides.map(function (s) { return s.dataset.name; });
  var cur = 0, dots = $('#dots');
  slides.forEach(function (s, i) {
    var b = document.createElement('button');
    b.className = 'dot'; b.type = 'button'; b.setAttribute('aria-label', s.getAttribute('aria-label'));
    b.addEventListener('click', function () { go(i); });
    dots.appendChild(b);
  });
  function go(i, fromHash) {
    i = Math.max(0, Math.min(slides.length - 1, i)); cur = i;
    track.style.transform = 'translateX(-' + i * 100 + '%)';
    slides.forEach(function (s, k) { s.inert = k !== i; s.setAttribute('aria-hidden', String(k !== i)); });
    $$('.dot').forEach(function (d, k) { d.setAttribute('aria-current', String(k === i)); });
    $('#prev').disabled = i === 0; $('#next').disabled = i === slides.length - 1;
    slides[i].scrollTop = 0;
    try { if (!fromHash && location.hash !== '#' + names[i]) history.replaceState(null, '', '#' + names[i]); } catch (e) {}
    if (names[i] === 'logros') runOdo();
    if (names[i] === 'audiencia') runBars();
  }
  $('#prev').addEventListener('click', function () { go(cur - 1); });
  $('#next').addEventListener('click', function () { go(cur + 1); });
  addEventListener('hashchange', function () { var k = names.indexOf(location.hash.slice(1)); if (k >= 0) go(k, true); });

  // Ventana ampliada (video o imagen), con foco que vuelve al botón de origen
  var modal = $('#modal'), mbody = $('#mbody'), closeBtn = $('#close'), opener = null;
  function closeModal() {
    var v = $('video', mbody); if (v) v.pause();
    mbody.innerHTML = ''; modal.hidden = true; shotIdx = -1;
    if (opener) { opener.focus(); opener = null; }
  }
  function openModal(node) {
    opener = document.activeElement;
    mbody.innerHTML = ''; mbody.appendChild(node);
    modal.hidden = false; closeBtn.focus();
  }
  function openVideo(id) {
    var v = document.createElement('video');
    v.controls = true; v.playsInline = true; v.autoplay = true; v.preload = 'metadata';
    v.src = vid(id); v.poster = img(id);
    openModal(v);
  }
  // Visor de capturas con anterior / siguiente
  var shotIdx = -1;
  function showShot(i, dir) {
    shotIdx = (i + SHOTS.length) % SHOTS.length;
    var s = SHOTS[shotIdx];
    var w = document.createElement('div'); w.className = 'mshot';
    w.innerHTML = '<button class="mnav" data-dir="-1" type="button" aria-label="Captura anterior">‹</button>' +
      '<figure><img alt="' + s.t + '" src="' + img(s.id) + '"><figcaption>' + s.t + ' (' + (shotIdx + 1) + ' de ' + SHOTS.length + ')</figcaption></figure>' +
      '<button class="mnav" data-dir="1" type="button" aria-label="Captura siguiente">›</button>';
    if (modal.hidden) openModal(w); else { mbody.innerHTML = ''; mbody.appendChild(w); }
    if (dir) $('.mnav[data-dir="' + dir + '"]', mbody).focus();
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  document.addEventListener('click', function (e) {
    var v = e.target.closest('[data-v]'); if (v && v.tagName === 'BUTTON') { openVideo(v.dataset.v); return; }
    var sh = e.target.closest('[data-shot]'); if (sh) { showShot(+sh.dataset.shot); return; }
    var nv = e.target.closest('.mnav'); if (nv) { showShot(shotIdx + +nv.dataset.dir, nv.dataset.dir); return; }
    var c = e.target.closest('[data-copy]');
    if (c) {
      var t = c.dataset.copy, out = $('#copied');
      var ok = function () { out.textContent = 'Copiado: ' + t; };
      var sel = function () {
        var r = document.createRange(); r.selectNodeContents(c.previousElementSibling);
        var s = getSelection(); s.removeAllRanges(); s.addRange(r);
        out.textContent = 'Seleccionado: copia con Ctrl+C o mantén presionado.';
      };
      try { navigator.clipboard.writeText(t).then(ok, sel); } catch (_) { sel(); }
    }
  });

  // Teclado y gesto de deslizar
  addEventListener('keydown', function (e) {
    if (!modal.hidden) {
      if (e.key === 'Escape') closeModal();
      else if (shotIdx >= 0 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) showShot(shotIdx + (e.key === 'ArrowRight' ? 1 : -1), e.key === 'ArrowRight' ? '1' : '-1');
      else if (e.key === 'Tab') {
        var f = [closeBtn].concat($$('video, .mnav', mbody));
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
      }
      return;
    }
    if (e.target.closest && e.target.closest('.nav')) return;
    if (['ArrowRight', 'PageDown'].indexOf(e.key) >= 0 || (e.key === ' ' && !/BUTTON|A/.test(e.target.tagName))) { e.preventDefault(); go(cur + 1); }
    else if (['ArrowLeft', 'PageUp'].indexOf(e.key) >= 0) { e.preventDefault(); go(cur - 1); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(slides.length - 1);
  });
  var sx = 0, sy = 0, stage = $('.stage');
  stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });

  go(Math.max(0, names.indexOf(location.hash.slice(1))), true);
})();
