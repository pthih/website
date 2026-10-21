/* Click or keyboard-activate the footer Camry for a single drive around the scene. */
(() => {
  const car = document.querySelector('#car-travel');
  const body = document.querySelector('#car-suspension');
  const svg = document.querySelector('.footer-scene-art');
  if (!car || !body || !svg) return;

  const wheels = [...document.querySelectorAll('.drive-wheel')];
  const dust = document.querySelector('#car-dust');
  const beam = document.querySelector('#headlight-beam');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Measure while the beam is display:none so it cannot alter the driving distance.
  const bounds = car.getBBox();
  const radius = 76 * 1.495 * 0.1496470588235294;
  const puffs = [];
  let running = false;
  let previous = 0;
  let distance = 0;
  let lastDust = 0;
  beam.style.display = 'inline';

  function puff(x, now) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    element.setAttribute('d', 'M-8 0Q-13-3-8-7Q-7-14 0-12Q7-14 9-7Q16-4 10 1');
    dust.append(element);
    puffs.push({ element, x, born: now });
  }

  function updateDust(now) {
    for (let i = puffs.length - 1; i >= 0; i--) {
      const p = puffs[i];
      const t = (now - p.born) / 1050;
      if (t >= 1) {
        p.element.remove();
        puffs.splice(i, 1);
        continue;
      }
      p.element.setAttribute('transform', `translate(${p.x - t * 32} ${247 - t * 23}) scale(${0.4 + t * 1.4})`);
      p.element.setAttribute('opacity', String(0.55 * (1 - t) ** 2));
    }
  }

  function drive() {
    if (running) return;
    running = true;
    beam.style.opacity = '1';
    if (reducedMotion.matches) {
      setTimeout(() => {
        beam.style.opacity = '0';
        running = false;
      }, 800);
      return;
    }

    const box = svg.getBoundingClientRect();
    const inverse = car.parentNode.getScreenCTM().inverse();
    const left = new DOMPoint(0, box.top).matrixTransform(inverse).x;
    const right = new DOMPoint(document.documentElement.clientWidth, box.top).matrixTransform(inverse).x;
    const out = right - bounds.x + bounds.width + 70;
    const enter = left - bounds.x - bounds.width - 70;
    let start;
    previous = 0;
    distance = 0;
    lastDust = 0;

    function tick(now) {
      if (start === undefined) start = now;
      const t = now - start;
      let x = 0;
      let pitch = 0;
      let pivot = 316;
      if (t < 1900) {
        const u = t / 1900;
        x = out * u * u;
        pitch = 2.8 * Math.sin(Math.PI * Math.min(1, u / 0.55));
        if (t - lastDust > 65 && t > 140 && t < 1400) {
          puff(bounds.x + bounds.width * 0.25 + x, now);
          lastDust = t;
        }
      } else if (t < 2200) {
        x = out;
      } else if (t < 5900) {
        const u = (t - 2200) / 3700;
        // Hold the approach speed briefly, then ease into the same parking spot.
        const brakeStart = 0.72;
        const remaining = u < brakeStart
          ? 1 - 2 * u / (1 + brakeStart)
          : (1 - u) ** 2 / (1 - brakeStart ** 2);
        x = enter * remaining;
        if (u > brakeStart) {
          const b = (u - brakeStart) / (1 - brakeStart);
          pitch = -2.5 * Math.sin(Math.PI * b);
          pivot = 937;
        }
      } else {
        const u = (t - 5900) / 650;
        pitch = u < 1 ? 0.45 * Math.sin(u * Math.PI * 2) * (1 - u) : 0;
        pivot = 937;
      }

      // Re-enter from the left without counting the offscreen teleport as wheel travel.
      if (t >= 2200 && previous > out * 0.8) previous = x;
      distance += Math.max(0, x - previous);
      previous = x;
      car.setAttribute('transform', `translate(${x} 0)`);
      body.setAttribute('transform', `rotate(${pitch} ${pivot} 445)`);
      const slip = t < 550 ? (1 - t / 550) * t * 0.45 : 0;
      const angle = -(distance / radius * 180 / Math.PI + slip);
      for (const wheel of wheels) {
        wheel.setAttribute('transform', `rotate(${angle} ${wheel.dataset.cx} 445)`);
      }
      updateDust(now);
      if (t < 6600 || puffs.length) {
        requestAnimationFrame(tick);
      } else {
        car.removeAttribute('transform');
        body.removeAttribute('transform');
        beam.style.opacity = '0';
        running = false;
      }
    }
    setTimeout(() => requestAnimationFrame(tick), 420);
  }

  car.addEventListener('click', drive);
  car.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      drive();
    }
  });
})();
