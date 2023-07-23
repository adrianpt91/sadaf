const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const main = document.querySelector('main');
const logoWhite = document.querySelector('.white');
const logoBlack = document.querySelector('.black');
const mouse = document.querySelector('.mouse');

menuIcon.addEventListener('click', function() {
	menuIcon.classList.toggle('rotate');
	menu.classList.toggle('show');
	
    if (menu.classList.contains('show')) {
      logoWhite.style.display = 'block';
      logoBlack.style.display = 'none'; 
    }else {
      logoWhite.style.display = 'none'; 
      logoBlack.style.display = 'block';
    }	
});