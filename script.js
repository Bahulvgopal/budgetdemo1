'use strict';

/* ══════════════════════════════════════
   FLOWER PETAL ANIMATION
══════════════════════════════════════ */
/*const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Petal shapes & colors
const PETAL_COLORS = [
  'rgba(201,150,44,0.75)',   // gold
  'rgba(232,201,122,0.65)',  // gold light
  'rgba(155,35,53,0.55)',    // crimson
  'rgba(253,248,238,0.5)',   // ivory
  'rgba(245,230,184,0.6)',   // pale gold
  'rgba(107,21,34,0.5)',     // maroon
];

class Petal {
  constructor() { this.reset(true); }

  reset(init = false) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height - canvas.height : -20;
    this.size = 6 + Math.random() * 10;
    this.speedY = 0.6 + Math.random() * 1.4;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.04;
    this.sway = Math.random() * 2;
    this.swaySpeed = 0.01 + Math.random() * 0.02;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    this.opacity = 0.3 + Math.random() * 0.5;
    this.shape = Math.floor(Math.random() * 3); // 0=ellipse, 1=teardrop, 2=petal
  }

  update(t) {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(t * this.swaySpeed + this.swayOffset) * this.sway * 0.3;
    this.rotation += this.rotSpeed;
    if (this.y > canvas.height + 30 || this.x < -50 || this.x > canvas.width + 50) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    if (this.shape === 0) {
      // Simple ellipse petal
      ctx.ellipse(0, 0, this.size * 0.4, this.size, 0, 0, Math.PI * 2);
    } else if (this.shape === 1) {
      // Teardrop petal
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.5, -this.size * 0.5, this.size * 0.4, this.size * 0.3, 0, this.size * 0.5);
      ctx.bezierCurveTo(-this.size * 0.4, this.size * 0.3, -this.size * 0.5, -this.size * 0.5, 0, -this.size);
    } else {
      // Rounded petal
      ctx.moveTo(0, -this.size * 0.8);
      ctx.bezierCurveTo(this.size * 0.6, -this.size * 0.5, this.size * 0.5, this.size * 0.4, 0, this.size * 0.6);
      ctx.bezierCurveTo(-this.size * 0.5, this.size * 0.4, -this.size * 0.6, -this.size * 0.5, 0, -this.size * 0.8);
    }
    ctx.fill();
    ctx.restore();
  }
}

// Create petals
const petals = Array.from({ length: 55 }, () => new Petal());
let animT = 0;

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animT++;
  petals.forEach(p => { p.update(animT); p.draw(); });
  requestAnimationFrame(animatePetals);
}
animatePetals();



/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
    }
  });
});
