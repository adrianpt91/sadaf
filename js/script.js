const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
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

const particleRadius = window.innerWidth < 500 ? 2 : 3;;
const particleCount = window.innerWidth < 500 ? 250 : 500; 
const circleRadius = window.innerWidth < 500 ? 200 : 300;
const maxSpeed = 1;
const motionRadius = window.innerWidth < 500 ? 40 : 80; 

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
  const mouse = document.querySelector('.mouse');
  const menuIcon = document.querySelector('.menu-icon svg');
  const sectionTitleDiv = document.querySelector('.section-title');
  const header = document.querySelector('header');
  const scrollWhite = document.querySelector('.white_scroll');
  const scrollBlack = document.querySelector('.black_scroll');


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
        scrollWhite.style.display = 'block';
        scrollBlack.style.display = 'none';
        mouse.style.display = 'flex'
        mouse.classList.remove('mouseActive')
        menuIcon.classList.add('active')
        sectionTitleDiv.innerHTML = '';
      }else {
        logoWhite.style.display = 'none';
        logoBlack.style.display = 'block';
        scrollWhite.style.display = 'none';
        scrollBlack.style.display = 'block';
        mouse.classList.add('mouseActive')
        menuIcon.classList.remove('active')
        const activeSectionId = activeSection.getAttribute('id')
        if (activeSectionId === 'footer') {
          header.style.display = 'none';
          mouse.style.display = 'none';
        }else {
          header.style.display = 'flex';
          mouse.style.display = 'flex';
        }

        if (activeSectionId === 'home2' || activeSectionId === 'home3') {
          sectionTitleDiv.textContent = 'HOME';
        }else if (activeSectionId === 'contactus') {          
          sectionTitleDiv.textContent = 'CONTACT US';
        }else if (activeSectionId === 'aboutus') {
          sectionTitleDiv.textContent = 'ABOUT US';
        }else {
          sectionTitleDiv.textContent = activeSectionId;
        }
      }
    }
  }

  // Initial check when the page loads
  checkActiveSection();

  // Check on scroll to update the active section
  window.addEventListener('scroll', checkActiveSection);
});

//carousel slider
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper .carousel__control");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

/*  Javascript filter
---------------------------------*/
// animate divs on start
var items = document.querySelectorAll('.filter-works img');
animate(items);

// filter on click
each('.filter-menu a', function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    filterLinks(el);
  });
});

// filter links functions
function filterLinks(element) {
  // get text 
  var el = element.className,
    // convert to lowercase
    linksTolowerCase = el.toLowerCase();
  // if all remove all elements
  if (el === 'All') {
    // first show all view class
    each('.view', function(e) {
      e.classList.remove('view');
    });
    // no show init animation
    animate(items);
  } else {
    // if not click all remove all elements
    each('.view', function(e) {
      e.classList.remove('view');
    });
  }
  // show animation for current elements
  animate(document.querySelectorAll('.' + linksTolowerCase));
};
// forech arrays
function each(el, callback) {
  var allDivs = document.querySelectorAll(el),
    alltoArr = Array.prototype.slice.call(allDivs);
  Array.prototype.forEach.call(alltoArr, function(selector, index) {
    if (callback) return callback(selector);
  });
};
// animate function
function animate(item) {
  (function show(counter) {
    setTimeout(function() {
      if (item[counter]) {
        item[counter].classList.add('view');
      }
      counter++;
      if (counter < item.length) show(counter);
    },50);
  })(0);
};

//Init Particle slider
var init = function(){
  var ps = new ParticleSlider({
    width: window.innerWidth,
    height: window.innerHeight
  });
  (window.addEventListener?window.addEventListener('click', function(){ps.init(true)}, false):window.onclick = function(){ps.init(true)});
}

var initParticleSlider = function(){
  var psScript = document.createElement('script');
  (psScript.addEventListener?psScript.addEventListener('load', init, false):psScript.onload = init);
  psScript.src = 'js/ps.js';
  psScript.setAttribute('type', 'text/javascript');
  document.body.appendChild(psScript);
}

(window.addEventListener?window.addEventListener('load', initParticleSlider,false):window.onload=initParticleSlider);

//Modal logic
const modal = document.getElementById("myModal");
const btnOpenModal = document.getElementById("openModalBtn");
const spanCloseModal = document.getElementsByClassName("close")[0];
const closeModalBtn = document.querySelector(".close-modal");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

btnOpenModal.addEventListener("click", openModal);

spanCloseModal.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("click", function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

//Animate on scroll
// const parallaxTitle = document.getElementById('parallax-text');
// const fadeIn = document.getElementById('fade_in');
// const fadeImg1 = document.getElementById('fade_img1');
// const fadeImg2 = document.getElementById('fade_img2');
// const home = document.getElementById('home')
// const home2 = document.getElementById('home2')

// main.addEventListener('scroll', () => {
//     const scrollMain = main.scrollTop;
//     const scrollHome = home.scrollHeight;
//     if (scrollMain > scrollHome) {
//       parallaxTitle.style.transform = `scale(1)`;
//       fadeIn.style.opacity = 1;
//       fadeIn.style.transform = `translateY(0)`
//     }else {
//       parallaxTitle.style.transform = `scale(1.3)`;
//       fadeIn.style.opacity = 0;
//       fadeIn.style.transform = `translateY(50px)`
//     }

//     if (scrollMain > scrollHome + 200) {
//       fadeImg1.style.opacity = 1;
//       fadeImg1.style.transform = `translateY(0)`
//       fadeImg2.style.opacity = 1;
//       fadeImg2.style.transform = `translateY(0)`
//     }
// });
