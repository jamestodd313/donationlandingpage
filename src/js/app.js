const menuBtn = document.querySelectorAll('button.burger')[0]
const menu = document.querySelectorAll('nav')[0]

const toggleMenu = () => {
if(menu.classList.contains('active')) menu.classList.remove('active')
else menu.classList.add('active')
}
menuBtn.addEventListener('click', toggleMenu)