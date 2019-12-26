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
const dropdowns = document.querySelectorAll('.dropdown');

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

    // const workCards = [...document.querySelectorAll('.work-card')];
    const fades = [...document.querySelectorAll('.work-card'),...dropdowns,document.querySelector('.contact')];
    // workCards.forEach(card => {
    fades.forEach(fades => {
        if(window.scrollY + window.innerHeight > getDistanceFromTop(fades) + 200){
            root.style.setProperty('--slide-distance','30px');
            fades.classList.add('slideUp')
        }
    })
};

const setActiveSidebarLink = () => {
    const activeSection = [...document.querySelectorAll('section')].filter(element => window.scrollY + window.innerHeight > element.offsetTop + 200).pop();
    if(activeSection){
        const sectionClasses = ['about','work','experience','contact'];
        const activeSectionIndex = sectionClasses.findIndex((className,idx) => activeSection.classList.contains(className))
        const activeLink = document.querySelector(`.sidebar__link:nth-of-type(${activeSectionIndex + 1})`);
        if(document.querySelector('.sidebar__link.is-active') && activeLink !== document.querySelector('.sidebar__link.is-active')){
            document.querySelector('.sidebar__link.is-active').classList.remove('is-active');
        }
        activeLink.classList.add('is-active');
    }
};

window.addEventListener('scroll',() => {
    toggleSidebar();
    toggleNav();
    fadeInItems();
    setActiveSidebarLink();
});

const getDistanceFromTop = (element,current = 0) => element.parentElement ? getDistanceFromTop(element.parentElement,element.offsetTop + current) : current;

const lastDropdownDistance = getDistanceFromTop(document.querySelector('.dropdown:last-of-type .dropdown__button'));
const sideLine = document.querySelector('.sideline');

sideLine.style.width = `${lastDropdownDistance + 45 - (sideLine.offsetTop + 10)}px`;

dropdowns.forEach((dropdown,idx) => {
   const button = dropdown.querySelector('.dropdown__button');
   const content = dropdown.querySelector('.dropdown__content');
   let active = false;
   button.addEventListener('click', () => {
       if(active){
           content.classList.remove('is-active');
           button.classList.remove('is-active');
       }else{
           content.classList.add('is-active');
           button.classList.add('is-active');
       }
       active = !active;
       if(idx !== dropdowns.length - 1){
           const activeDropdownContents = [...document.querySelectorAll('.dropdown__content.is-active')].length;
           sideLine.style.width = `${lastDropdownDistance + 45 - (sideLine.offsetTop + 10) + (activeDropdownContents * 300)}px`;
       }
   })
});

[...document.querySelectorAll('.sidebar__link'),...document.querySelectorAll('.nav__item')].forEach(button => {
   button.addEventListener('click',() => {
        document.querySelector(`.${button.dataset.target}`).scrollIntoView({
            behavior: 'smooth'
        });
   })
});

window.addEventListener('resize',_ => {
    sideLine.style.width = `${getDistanceFromTop(document.querySelector('.dropdown:last-of-type .dropdown__button')) + 45 - (sideLine.offsetTop + 10)}px`;
});