/**
 * Sand trail — fond de grains de sable interactif pour le hero.
 * Un mouvement rapide de la souris écarte les grains le long de la trajectoire
 * (sillon continu, grains accumulés sur les bords). La trace reste `hold` secondes,
 * puis les grains reviennent en place en `fade` secondes.
 *
 * Usage :
 *   import { initSandTrail } from './sand-trail.js';
 *   const destroy = initSandTrail(element, { color: '#FAF7F2' });
 */
export function initSandTrail(container, options = {}) {
  const o = {
    color: '#FAF7F2',      // couleur de fond du hero
    grainColor: '#BE9D6E', // teinte moyenne des grains
    width: 20,             // rayon du sillon (px)
    hold: 12,              // durée pendant laquelle la trace reste (s)
    fade: 4,               // durée du retour des grains (s)
    threshold: 8,          // vitesse min. (px/frame) pour démarrer un tracé
    spacing: 4,            // espacement des grains (px) — plus grand = plus léger
    opacity: 1,            // multiplicateur d'opacité des grains
    fadeTop: 140,          // hauteur (px) du fondu des grains en haut (sous le header)
    fadeBottom: 220,       // hauteur (px) du fondu en bas
    blendTo: null,         // couleur de la section suivante : le fond du hero s'y fond en bas
    ...options,
  };

  const noop = () => {};
  if (
    typeof window === 'undefined' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    matchMedia('(pointer: coarse)').matches
  ) return noop;

  const SP = o.spacing;
  let BG = hexToRgb(o.color);
  let GC = hexToRgb(o.grainColor);
  let BT = o.blendTo ? hexToRgb(o.blendTo) : null;
  let rowA; // opacité des grains par ligne (fondus haut/bas)

  if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
  container.style.isolation = 'isolate';
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  Object.assign(cv.style, {
    position: 'absolute', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '-1',
  });
  container.prepend(cv);
  const ctx = cv.getContext('2d');

  let W, H, cols, rows, n, hx, hy, ox, oy, tx, ty, age, sh, img, bgBuf;
  let mx = -1, my = -1, px = -1, py = -1, on = false;
  let active = false, still = 0, live = 1;
  let raf = 0, last = performance.now(), visible = true;

  const smooth = t => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

  // Fond pré-calculé : couleur du hero, qui glisse vers `blendTo` en bas.
  // rowA atténue les grains en haut et en bas pour éviter toute coupure nette.
  function fillBg() {
    bgBuf = new Uint8ClampedArray(W * H * 4);
    rowA = new Float32Array(H);
    for (let y = 0; y < H; y++) {
      const top = o.fadeTop > 0 ? smooth(y / o.fadeTop) : 1;
      const bot = o.fadeBottom > 0 ? smooth((H - 1 - y) / o.fadeBottom) : 1;
      rowA[y] = Math.min(top, bot);
      const m = BT ? 1 - bot : 0;
      const r = BG[0] + ((BT ? BT[0] : 0) - BG[0]) * m;
      const g = BG[1] + ((BT ? BT[1] : 0) - BG[1]) * m;
      const b = BG[2] + ((BT ? BT[2] : 0) - BG[2]) * m;
      for (let x = 0; x < W; x++) {
        const p = (y * W + x) * 4;
        bgBuf[p] = r; bgBuf[p + 1] = g; bgBuf[p + 2] = b; bgBuf[p + 3] = 255;
      }
    }
  }

  function resize() {
    const r = container.getBoundingClientRect();
    W = cv.width = Math.max(2, Math.round(r.width));
    H = cv.height = Math.max(2, Math.round(r.height));
    cols = Math.ceil(W / SP); rows = Math.ceil(H / SP); n = cols * rows;
    hx = new Float32Array(n); hy = new Float32Array(n);
    ox = new Float32Array(n); oy = new Float32Array(n);
    tx = new Float32Array(n); ty = new Float32Array(n);
    age = new Float32Array(n); sh = new Float32Array(n);
    for (let r2 = 0; r2 < rows; r2++) {
      for (let c = 0; c < cols; c++) {
        const i = r2 * cols + c;
        hx[i] = c * SP + Math.random() * (SP - 1);
        hy[i] = r2 * SP + Math.random() * (SP - 1);
        sh[i] = Math.random();
      }
    }
    img = ctx.createImageData(W, H);
    fillBg();
    live = 1;
  }

  // Écarte les grains situés à moins de R du segment [a, b]
  function push(ax, ay, bx, by) {
    const R = o.width, vx = bx - ax, vy = by - ay;
    const L = vx * vx + vy * vy || 1, len = Math.sqrt(L), M = R * 2.6;
    const c0 = Math.max(0, Math.floor((Math.min(ax, bx) - M) / SP));
    const c1 = Math.min(cols - 1, Math.ceil((Math.max(ax, bx) + M) / SP));
    const r0 = Math.max(0, Math.floor((Math.min(ay, by) - M) / SP));
    const r1 = Math.min(rows - 1, Math.ceil((Math.max(ay, by) + M) / SP));

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const i = r * cols + c;
        const cx = hx[i] + tx[i], cy = hy[i] + ty[i];
        let t = ((cx - ax) * vx + (cy - ay) * vy) / L;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const qx = ax + vx * t, qy = ay + vy * t;
        let dx = cx - qx, dy = cy - qy;
        const d = Math.hypot(dx, dy);
        if (d >= R) continue;
        if (d < 0.01) {
          const s = Math.random() < 0.5 ? -1 : 1;
          dx = (-vy / len) * s; dy = (vx / len) * s;
        } else { dx /= d; dy /= d; }
        const nd = R * (1 + Math.random() * 0.45); // grains accumulés sur le bord
        const drag = Math.random() * 2;            // léger entraînement dans le sens du geste
        tx[i] = qx + dx * nd + (vx / len) * drag - hx[i];
        ty[i] = qy + dy * nd + (vy / len) * drag - hy[i];
        age[i] = 0;
        live = 1;
      }
    }
  }

  function render(dt) {
    live = 0;
    const fk = Math.pow(0.02, dt / o.fade);
    const ease = Math.min(1, dt * 12);
    const d = img.data;
    d.set(bgBuf);

    for (let i = 0; i < n; i++) {
      if (tx[i] !== 0 || ty[i] !== 0 || ox[i] !== 0 || oy[i] !== 0) {
        age[i] += dt;
        if (age[i] > o.hold) {
          tx[i] *= fk; ty[i] *= fk;
          if (Math.abs(tx[i]) + Math.abs(ty[i]) < 0.05) { tx[i] = 0; ty[i] = 0; }
        }
        ox[i] += (tx[i] - ox[i]) * ease;
        oy[i] += (ty[i] - oy[i]) * ease;
        if (Math.abs(ox[i] - tx[i]) + Math.abs(oy[i] - ty[i]) < 0.02) { ox[i] = tx[i]; oy[i] = ty[i]; }
        live = 1;
      }
      const x = Math.round(hx[i] + ox[i]), y = Math.round(hy[i] + oy[i]);
      if (x < 0 || y < 0 || x >= W - 1 || y >= H - 1) continue;
      const s = sh[i];
      const a = (0.18 + s * 0.22) * o.opacity * rowA[y];
      if (a < 0.004) continue;
      const cr = GC[0] + (s - 0.5) * 40, cg = GC[1] + (s - 0.5) * 35, cb = GC[2] + (s - 0.5) * 30;
      for (let k = 0; k < 4; k++) {
        const p = ((y + (k >> 1)) * W + x + (k & 1)) * 4;
        d[p] += (cr - d[p]) * a;
        d[p + 1] += (cg - d[p + 1]) * a;
        d[p + 2] += (cb - d[p + 2]) * a;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;

    if (on && px >= 0) {
      const spd = Math.hypot(mx - px, my - py);
      if (!active && spd > o.threshold) active = true;
      if (active) {
        if (spd < 0.5) { still += dt; if (still > 0.25) active = false; }
        else { still = 0; push(px, py, mx, my); }
      }
    }
    px = on ? mx : -1; py = on ? my : -1;

    if (live) render(dt); // au repos : aucun calcul
  }

  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const r = container.getBoundingClientRect();
    mx = e.clientX - r.left; my = e.clientY - r.top; on = true;
  }
  function onLeave() { on = false; active = false; px = py = -1; }

  function start() { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  resize();
  const ro = new ResizeObserver(() => resize());
  ro.observe(container);
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); });
  io.observe(container);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);
  start();

  function destroy() {
    stop();
    ro.disconnect();
    io.disconnect();
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    cv.remove();
  }

  // Change les couleurs sans perdre les traces (ex. bascule mode sombre)
  destroy.setColors = ({ color, grainColor, blendTo } = {}) => {
    if (color) BG = hexToRgb(color);
    if (blendTo) BT = hexToRgb(blendTo);
    if (grainColor) GC = hexToRgb(grainColor);
    if (color || blendTo) fillBg();
    live = 1;
  };

  return destroy;
}

function hexToRgb(hex) {
  const v = hex.replace('#', '');
  const n = parseInt(v.length === 3 ? v.split('').map(c => c + c).join('') : v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
