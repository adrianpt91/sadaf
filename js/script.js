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