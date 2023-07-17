const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
menuIcon.addEventListener('click', function() {
	menuIcon.classList.toggle('rotate');
	menu.classList.toggle('show');
});