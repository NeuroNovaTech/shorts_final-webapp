const ham = document.getElementById('hamburger');
const menu = document.getElementById('mobile-menu');
ham.onclick = e => {
  e.stopPropagation();
  ham.classList.toggle('active');
  menu.classList.toggle('active');
};
document.addEventListener('click', e => {
  if (!ham.contains(e.target) && !menu.contains(e.target)) {
    ham.classList.remove('active');
    menu.classList.remove('active');
  }
});