const navItems = [...document.querySelectorAll('.nav__item')];
navItems.forEach((item,i) => {
    item.style.animationDelay = `${i * 100}ms`;
    item.classList.add('slideDown');
});

document.querySelector('.nav__logo').classList.add('fadeIn');

const homeSubtext = document.querySelector('.home__subtext');
[...document.querySelectorAll('.home__heading span'),homeSubtext].forEach((item,i) => {
    item.style.animationDelay = `${700 + i * 100}ms`;
    item.classList.add('slideUp');
});

document.querySelector('.sideline').style.animationDelay = `${parseInt(homeSubtext.style.animationDelay.slice(0,-2)) + 600}ms`;
document.querySelector('.sideline').classList.add('fadeIn');

let prevTop = 0;
const root = document.documentElement;

const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if(window.scrollY >= window.innerHeight) {
        sidebar.classList.add('sidebar--fixed');
    }else{
        sidebar.classList.remove('sidebar--fixed');
    }
};

const toggleNav = () => {
    const nav = document.querySelector('nav');
    if(window.scrollY < prevTop){
        nav.classList.add('is-showing');
    }else{
        nav.classList.remove('is-showing');
    }
    if(window.scrollY === 0){
        nav.classList.add('hide-boxshadow')
    }else{
        nav.classList.remove('hide-boxshadow')
    }
    prevTop = window.scrollY;
};

const fadeInItems = () => {
    const about = document.querySelector('.about');
    if(window.scrollY + window.innerHeight > about.offsetTop + 400){
        root.style.setProperty('--slide-distance','60px');
        about.classList.add('slideUp')
    }

    const workCards = [...document.querySelectorAll('.work-card')];
    workCards.forEach(card => {
        if(window.scrollY + window.innerHeight > getDistanceFromTop(card) + 50){
            root.style.setProperty('--slide-distance','30px');
            card.classList.add('slideUp')
        }
    })
};

window.addEventListener('scroll',() => {
    toggleSidebar();
    toggleNav();
    fadeInItems();
});

const getDistanceFromTop = (element,current = 0) => element.parentElement ? getDistanceFromTop(element.parentElement,element.offsetTop + current) : current;

const lastDropdown = document.querySelector('.dropdown:last-of-type .dropdown__button');
const sideLine = document.querySelector('.sideline');

sideLine.style.width = `${getDistanceFromTop(lastDropdown) + 45 - (sideLine.offsetTop + 10)}px`;

document.querySelectorAll('.dropdown').forEach(dropdown => {
   const button = dropdown.querySelector('.dropdown__button');
   const content = dropdown.querySelector('.dropdown__content');
   button.addEventListener('click', () => {
       if(content.classList.contains('is-active')){
           content.classList.remove('is-active');
       }else{
           content.classList.add('is-active');
       }
       const activeDropdownContents = [...document.querySelectorAll('.dropdown__content.is-active')].length;
       sideLine.style.width = `${getDistanceFromTop(lastDropdown) + 45 - (sideLine.offsetTop + 10) + (activeDropdownContents * 300)}px`;
   })
});