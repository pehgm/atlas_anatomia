(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hdr = document.getElementById('hdr');
  var hero = document.getElementById('hero');

  /* vaga-lumes e parallax */
  if (!reduce) {
    var box = document.getElementById('fireflies');
    for (var i = 0; i < 14; i++) {
      var f = document.createElement('span');
      var s = 3 + Math.random() * 3;
      f.className = 'fly';
      f.style.left = (Math.random() * 96) + '%';
      f.style.top = (10 + Math.random() * 70) + '%';
      f.style.width = f.style.height = s + 'px';
      f.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
      f.style.setProperty('--dy', (Math.random() * -50 - 10) + 'px');
      f.style.setProperty('--t', (7 + Math.random() * 7) + 's');
      f.style.setProperty('--dl', (Math.random() * 8) + 's');
      box.appendChild(f);
    }

    var raf = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 2 - 1;
      var y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        hdr.style.setProperty('--mx', (-x).toFixed(3));
        hdr.style.setProperty('--my', (-y).toFixed(3));
      });
    });
    hero.addEventListener('pointerleave', function () {
      hdr.style.setProperty('--mx', 0);
      hdr.style.setProperty('--my', 0);
    });
  }

  /* ===== SEÇÕES E LINKS ===== */
  var sections = [
    { name: 'Início',                            url: '/index.html' },
    { name: 'Artrologia',                        url: '/artrologia.html' },
    { name: 'Articulações Sinoviais',            url: '/art_sinoviais.html' },
    { name: 'Articulações dos Membros Pélvicos', url: '/art_pelvicos.html' }
  ];

  var btn   = document.getElementById('menuBtn');
  var panel = document.getElementById('panel');
  var label = document.getElementById('label');
  var count = document.getElementById('count');
  var prev  = document.getElementById('prev');
  var next  = document.getElementById('next');

  /* descobre em qual página você está */
  var cur = sections.findIndex(function (s) {
    return location.pathname.endsWith(s.url);
  });
  if (cur < 0) cur = 0;

  /* itens do menu: links de verdade */
  sections.forEach(function (s) {
    var a = document.createElement('a');
    a.href = s.url;
    a.setAttribute('role', 'menuitem');
    a.textContent = s.name;
    panel.appendChild(a);
  });

  function render() {
    label.textContent = sections[cur].name;
    panel.querySelectorAll('a').forEach(function (a, i) {
      if (i === cur) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    count.textContent = (cur + 1) + ' de ' + sections.length;
    prev.disabled = cur === 0;
    next.disabled = cur === sections.length - 1;
  }

  function openMenu() { panel.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
  function closeMenu(focusBtn) {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (focusBtn) btn.focus();
  }

  btn.addEventListener('click', function () { panel.hidden ? openMenu() : closeMenu(false); });
  prev.addEventListener('click', function () { if (cur > 0) location.href = sections[cur - 1].url; });
  next.addEventListener('click', function () { if (cur < sections.length - 1) location.href = sections[cur + 1].url; });
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) closeMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) closeMenu(true);
  });

  render();
})();