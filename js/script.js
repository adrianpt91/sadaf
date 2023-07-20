const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const main = document.querySelector('main');
const logoWhite = document.querySelector('.white');
const logoBlack = document.querySelector('.black');
menuIcon.addEventListener('click', function() {
	menuIcon.classList.toggle('rotate');
	menu.classList.toggle('show');

	const isVisible = window.getComputedStyle(logoWhite).display !== 'none';

	if (isVisible) {
		logoWhite.style.display = 'none'; 
		logoBlack.style.display = 'block';
	} else {
		logoWhite.style.display = 'block'; 
		logoBlack.style.display = 'none'; 
	}
});

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleRadius = 3;
const particleCount = 500;
const circleRadius = 300;
const maxSpeed = 1;
const motionRadius = 80;

let particles = [];

function createParticle() {
  const angle = Math.random() * Math.PI * 2; // Random angle
  const x = canvas.width / 2 + (circleRadius - motionRadius) * Math.cos(angle);
  const y = canvas.height / 2 + (circleRadius - motionRadius) * Math.sin(angle);
  const speed = Math.random() * maxSpeed; // Random speed for each particle
  const dx = speed * Math.cos(angle);
  const dy = speed * Math.sin(angle);
  return { x, y, dx, dy };
}

function initializeParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];

    // Move the particle
    particle.x += particle.dx;
    particle.y += particle.dy;

    // Check if the particle is outside the motion area, then move it back inside
    const distanceFromCenter = Math.sqrt(
      (particle.x - canvas.width / 2) ** 2 + (particle.y - canvas.height / 2) ** 2
    );
    if (distanceFromCenter > circleRadius) {
      const angle = Math.atan2(particle.y - canvas.height / 2, particle.x - canvas.width / 2);
      particle.x = canvas.width / 2 + (circleRadius - motionRadius) * Math.cos(angle);
      particle.y = canvas.height / 2 + (circleRadius - motionRadius) * Math.sin(angle);
    }

    // Draw the particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fill();
    ctx.closePath();
  }

  requestAnimationFrame(animateParticles);
}

initializeParticles();
animateParticles();
