const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const main = document.querySelector('main');
const logoWhite = document.querySelector('.white');
const logoBlack = document.querySelector('.black');
const mouse = document.querySelector('.mouse');

menuIcon.addEventListener('click', function() {
	menuIcon.classList.toggle('rotate');
	menu.classList.toggle('show');

	if (mouse.classList.contains('mouseActive')) {
    if (menu.classList.contains('show')) {
      logoWhite.style.display = 'block';
      logoBlack.style.display = 'none'; 
    }else {
      logoWhite.style.display = 'none'; 
      logoBlack.style.display = 'block';
    }		
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

//Change logo depending on my section
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');
  const logoWhite = document.querySelector('.white');
  const logoBlack = document.querySelector('.black');
  const main = document.querySelector('main');
  const mouse = document.querySelector('.mouse');
  const menuIcon = document.querySelector('.menu-icon svg');


  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function checkActiveSection() {
    let activeSection = null;

    sections.forEach(section => {
        if (isElementInViewport(section)) {
            activeSection = section;
        }
    });

    if (activeSection) {
      if(activeSection.classList.contains('home')) {
        logoWhite.style.display = 'block';
        logoBlack.style.display = 'none';
        mouse.classList.remove('mouseActive')
        menuIcon.classList.add('active')
      }else {
        logoWhite.style.display = 'none';
        logoBlack.style.display = 'block';
        mouse.classList.add('mouseActive')
        menuIcon.classList.remove('active')
      }
    }
  }

  // Initial check when the page loads
  checkActiveSection();

  // Check on scroll to update the active section
  main.addEventListener('scroll', checkActiveSection);
});

