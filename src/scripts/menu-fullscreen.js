const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuFullscreen = document.querySelector('.menu-fullscreen');
const menuFullscreenContainer = document.querySelector('.menu-fullscreen__container');

hamburgerMenu.addEventListener('click', () => {
   menuFullscreen.classList.add('menu-fullscreen--active');
});

menuFullscreenContainer.addEventListener('click', function(e) {
   if (e.target.closest('a')) {
      if (menuFullscreen.classList.contains('menu-fullscreen--active')) {
         menuFullscreen.classList.remove('menu-fullscreen--active');
      }
   }
});
