const navMobile = document.querySelector('.nav__items');
const allNavItems = document.querySelectorAll('.nav__item');
const showNavBtn = document.querySelector('.nav__btn');
const closeNavBtn = document.querySelector('.close-btn');


const handleNav = () => {
    navMobile.classList.toggle('nav__items--active');
    
    allNavItems.forEach(item => {
        item.addEventListener('click', () => {
            navMobile.classList.remove('nav__items--active');
        })
    })
}
console.log(window.scrollY);

showNavBtn.addEventListener('click', handleNav);
closeNavBtn.addEventListener('click', handleNav);