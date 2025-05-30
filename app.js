const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

// Create server rack blocks with blinking lights

class ServerBlock {
  constructor(x, y, w, h, lightColors) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lightColors = lightColors;
    this.lights = [];
    for(let i = 0; i < 5; i++) {
      this.lights.push({
        x: this.x + 10 + i * 12,
        y: this.y + this.h / 2 + Math.sin(Math.random()*10)*3,
        radius: 4,
        color: this.lightColors[Math.floor(Math.random() * this.lightColors.length)],
        on: Math.random() > 0.5
      });
    }
  }
  draw(ctx) {
    // Rack body
    ctx.fillStyle = '#111827';
    ctx.shadowColor = '#00ffea88';
    ctx.shadowBlur = 8;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.shadowBlur = 0;
    // Lights
    for(let light of this.lights) {
      ctx.beginPath();
      ctx.fillStyle = light.on ? light.color : '#0f0f0f';
      ctx.shadowColor = light.on ? light.color : 'transparent';
      ctx.shadowBlur = light.on ? 8 : 0;
      ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }
  update() {
    for(let light of this.lights) {
      if (Math.random() > 0.98) {
        light.on = !light.on;
      }
    }
  }
}

const racks = [];
for(let i = 0; i < 15; i++) {
  let x = (i % 5) * 140 + 50;
  let y = Math.floor(i / 5) * 120 + 50;
  racks.push(new ServerBlock(x, y, 100, 80, ['#00ffea', '#0ff', '#0fa']));
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for(let rack of racks) {
    rack.update();
    rack.draw(ctx);
  }
  requestAnimationFrame(animate);
}
animate();
