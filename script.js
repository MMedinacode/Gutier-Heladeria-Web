/* ============================================================
   GUTIER HELADERÍA ARTESANAL — datos y lógica
   ============================================================
   ⚠️ SIN PRECIOS A PROPÓSITO. El local no publica carta con precios en
   ningún canal (ni Instagram, ni Google, ni agregadores). Todos los
   productos van sin precio y el carrito muestra "A consultar" en vez de
   inventar montos. Cuando el local facilite su carta, se agrega `p:` a
   cada ítem y todo lo demás funciona igual.

   Los productos listados están CONFIRMADOS por sus propias fotos de
   Instagram, su bio, y las reseñas reales de Google. No hay inventados.
   ============================================================ */

const MENU = {
  helados: {
    label: 'Helados',
    items: [
      { n:'Helado artesanal', d:'Hecho en el local. "Variedad de sabores" según sus reseñas reales' },
      { n:'Sabor torta',      d:'Con manjar — de los más nombrados en las opiniones de Google' },
      { n:'Yogurt con frutilla', d:'Mencionado por nombre en una reseña real del local' },
      { n:'Sabor menta',      d:'Aparece entre las palabras más repetidas de sus reseñas' },
    ]
  },
  pasteleria: {
    label: 'Pastelería',
    items: [
      { n:'Pie de maracuyá', d:'Casero, con merengue italiano', img:'fotos/pie-maracuya.jpg' },
      { n:'Galletas New York', d:'Hechas a mano, en su envoltorio de papel kraft', img:'fotos/galletas-new-york.jpg' },
      { n:'Dulcecitos del día', d:'La vitrina cambia según lo que se hornea ese día' },
    ]
  },
  cafeteria: {
    label: 'Café y bebidas',
    items: [
      { n:'Café', d:'"El café estaba delicioso, con un aroma…" — reseña real de Google' },
      { n:'Bebidas', d:'Ver la carta del local — tienen una sección propia de bebidas' },
    ]
  }
};

/* ---------- RENDER DE LA CARTA ---------- */
const tabsEl   = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');

Object.keys(MENU).forEach((key, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i === 0 ? ' active' : '');
  tab.type = 'button';
  tab.textContent = MENU[key].label;
  tab.dataset.key = key;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  tab.addEventListener('click', () => showTab(key));
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + key;

  const grid = document.createElement('div');
  grid.className = 'menu-grid';

  MENU[key].items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item reveal';

    if (item.img) {
      const foto = document.createElement('div');
      const im = document.createElement('img');
      im.src = item.img;
      im.alt = item.n;
      im.loading = 'lazy';
      im.style.cssText = 'width:58px;height:58px;object-fit:cover;border-radius:12px;';
      foto.appendChild(im);
      row.appendChild(foto);
    }

    const texto = document.createElement('div');
    texto.className = 'menu-item-text';

    const nombre = document.createElement('span');
    nombre.className = 'name';
    nombre.textContent = item.n;
    texto.appendChild(nombre);

    if (item.d) {
      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = item.d;
      texto.appendChild(desc);
    }

    // Sin precio publicado: se dice "Consultar", no se inventa un monto.
    const precio = document.createElement('div');
    precio.className = 'price';
    precio.textContent = 'Consultar';

    row.appendChild(texto);
    row.appendChild(precio);
    grid.appendChild(row);
  });

  panel.appendChild(grid);
  panelsEl.appendChild(panel);
});

function showTab(key) {
  document.querySelectorAll('.menu-tab').forEach(t => {
    const activo = t.dataset.key === key;
    t.classList.toggle('active', activo);
    t.setAttribute('aria-selected', activo ? 'true' : 'false');
  });
  document.querySelectorAll('.menu-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + key);
  });
  initScrollReveal();
}

/* ---------- NAVEGACIÓN POR PESTAÑAS ---------- */
const navLinks = document.getElementById('navLinks');

function goToTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.tabPanel === tabId);
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.tab === tabId);
  });
  navLinks.classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initScrollReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); goToTab(el.dataset.tab); });
});

document.getElementById('navToggle').addEventListener('click', function () {
  const abierto = navLinks.classList.toggle('open');
  this.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

/* ---------- INDICADOR ABIERTO / CERRADO ----------
   Horario CONFIRMADO en la bio de su Instagram (@gutier_heladeria):
   Martes a viernes 14:30–21:00 · Sábado y domingo 12:00–21:00.
   Lunes no aparece, se toma como cerrado. */
function horarioDeHoy() {
  const dia = new Date().getDay();          // 0=domingo … 6=sábado
  if (dia === 1) return null;               // lunes cerrado
  if (dia === 0 || dia === 6) return [12 * 60, 21 * 60];   // sáb y dom
  return [14 * 60 + 30, 21 * 60];           // martes a viernes
}

function actualizarEstado(dotId, textId) {
  const dot  = document.getElementById(dotId);
  const text = document.getElementById(textId);
  if (!dot || !text) return;

  const ahora   = new Date();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const h       = horarioDeHoy();
  const abierto = !!h && minutos >= h[0] && minutos < h[1];

  text.textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
  dot.classList.toggle('closed', !abierto);
}

actualizarEstado('statusDot', 'statusText');
actualizarEstado('statusDot2', 'statusText2');
actualizarEstado('statusDot3', 'statusText3');

/* ---------- SCROLL REVEAL (con red de seguridad) ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 6) * 55) + 'ms';
    io.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 1200);
}
initScrollReveal();

/* ---------- PANTALLA DE CARGA ---------- */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 320);
});
