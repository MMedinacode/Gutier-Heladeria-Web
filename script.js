/* ============================================================
   GUTIER HELADERÍA ARTESANAL — datos y lógica
   ============================================================
   CARTA CON PRECIOS REALES (02-10-2026), leída de sus propias historias
   destacadas de Instagram:
   - «Carta»: su lista de precios (cafetería, heladería, pastelería por
     porción) y «Pastelería a pedido». Publicada el 18-09-2025: preguntar
     si los precios siguen vigentes.
   - «Catálogo»: tortas, kuchen, pie y tartaletas por encargo, publicado el
     03-08-2026. No trae precios: van en "Consultar".
   Los productos sin precio en ninguna fuente dicen "Consultar"; nunca se
   inventa un monto.
   ============================================================ */

const MENU = {
  helados: {
    label: 'Helados',
    items: [
      { n:'Helado simple', p:2500, d:'Artesanal, hecho en el local. Sabores como torta, yogurt con frutilla y menta' },
      { n:'Helado doble', p:3000 },
      { n:'Helado triple', p:3500 },
      { n:'Copa trisabor', p:4500 },
      { n:'Café helado', p:4500 },
      { n:'Chocolate helado', p:4500 },
      { n:'Milkshake', p:4990 },
      { n:'Helado 1/2 litro', p:4900, d:'Para llevar' },
      { n:'Helado 1 litro', p:8900, d:'Para llevar' },
    ]
  },
  pasteleria: {
    label: 'Pastelería',
    items: [
      { n:'Kuchen sureño', p:2500, d:'Por porción' },
      { n:'Torta tres leches', p:2900, d:'Por porción' },
      { n:'Panqueque chocolate', p:3500 },
      { n:'Streusel frutos rojos', p:2500 },
      { n:'Kuchen manzana', p:2500 },
      { n:'Pie de maracuyá', d:'Casero, con merengue italiano', img:'fotos/pie-maracuya.jpg' },
      { n:'Galletas New York', d:'Hechas a mano, en su envoltorio de papel kraft', img:'fotos/galletas-new-york.jpg' },
      { n:'Cheesecake', d:'Suave y cremoso' },
      { n:'Dulcecitos del día', d:'La vitrina cambia según lo que se hornea ese día' },
    ]
  },
  encargos: {
    label: 'Por encargo',
    items: [
      { n:'Torta tres leches', p:25000, d:'12 a 15 porciones' },
      { n:'Kuchen sureño', p:17500, d:'10 porciones' },
      { n:'Torta cuatro leches', d:'Bizcocho de vainilla remojado con tres leches y capas de manjar, con merengue suizo. 20 a 22 porciones', img:'fotos/producto4.jpg' },
      { n:'Torta piña, manjar y crema', d:'Bizcocho de vainilla con piña, manjar y crema chantilly. 20 a 22 porciones' },
      { n:'Torta durazno', d:'Bizcocho de vainilla con manjar, durazno y crema chantilly. 20 a 22 porciones' },
      { n:'Torta de chocolate Matilda', d:'Bizcocho húmedo de chocolate con crema de cacao. 15 porciones' },
      { n:'Torta Amor', d:'Hojarasca con frambuesa, chantilly, manjar y crema pastelera casera. 20 a 22 porciones' },
      { n:'Pompadour de plátano', d:'Hojarasca con crema de plátano natural y manjar. 20 a 22 porciones' },
      { n:'Torta chilena', d:'Hojarasca con manjar y nueces, cubierta de merengue suizo. 20 a 22 porciones' },
      { n:'Kuchen sureño de crema', d:'Entero, 12 a 16 porciones. Frutos rojos y crema pastelera gratinada' },
      { n:'Kuchen sureño de miga', d:'Entero, 12 a 16 porciones. Streusel con frutos rojos o durazno' },
      { n:'Kuchen sureño de manzana', d:'Entero, 12 a 16 porciones. Manzanas caramelizadas con crema horneada' },
      { n:'Pie de limón', d:'Entero, 12 a 16 porciones. Crema de limón y merengue suizo' },
      { n:'Tartaleta de chocolate', d:'Entera, 12 a 16 porciones. Crema de chocolate y chantilly' },
      { n:'Tartaleta de frutas', d:'Entera, 12 a 16 porciones. Crema pastelera y frutas de temporada' },
    ]
  },
  cafeteria: {
    label: 'Café y bebidas',
    items: [
      { n:'Espresso', p:1500 },
      { n:'Americano', p:1800 },
      { n:'Capuccino', p:2000 },
      { n:'Té variedades', p:1500 },
      { n:'Chocolate caliente', p:2900 },
      { n:'Bebidas', d:'Pregúntanos por las bebidas del día' },
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
    precio.textContent = item.p ? '$' + item.p.toLocaleString('es-CL') : 'Consultar';

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

// Marca en la lista de horario el día de hoy. La lista es estática en el
// HTML a propósito: si el JS falla, el horario igual se lee.
function marcarDiaDeHoy() {
  const hoy = new Date().getDay();
  document.querySelectorAll('.horario-semana li[data-dia]').forEach(function (li) {
    li.classList.toggle('hs-hoy', Number(li.dataset.dia) === hoy);
  });
}
marcarDiaDeHoy();
