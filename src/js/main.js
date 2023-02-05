const navMobile = document.querySelector('.nav__items');
const allNavItems = document.querySelectorAll('.nav__item');
const showNavBtn = document.querySelector('.nav__btn');
const closeNavBtn = document.querySelector('.close-btn');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__window--btn');
const showPopup = document.querySelector('.contact--btn');


const handleNav = () => {
    navMobile.classList.toggle('nav__items--active');
    
    allNavItems.forEach(item => {
        item.addEventListener('click', () => {
            navMobile.classList.remove('nav__items--active');
        })
    })
}

const handlePopup = () => {
    popup.classList.toggle('popup__close');
}

showNavBtn.addEventListener('click', handleNav);
closeNavBtn.addEventListener('click', handleNav);
closePopup.addEventListener('click', handlePopup);
showPopup.addEventListener('click', handlePopup);