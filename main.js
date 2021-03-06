// Start here by selecting elements

const form = document.querySelector('.form');
const theme = document.querySelector('#theme');
const filter = document.querySelector('.fixed-container-filter');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('.section-1');
const section2 = document.querySelector('.section-2');
const section3 = document.querySelector('.section-3');
const section4 = document.querySelector('.section-4');
const header = document.querySelector('.header');
const navList = document.querySelector('.nav-list');
const btnOrange = document.querySelector('.btn-orange');
const clients = document.querySelectorAll('.client');
const clientsNumbers = document.querySelectorAll('.client__number');
const arrowUp = document.querySelector('.arrow__up');



let themeType = 'light';
let logoThemeType = 'light';

let currentWidth = 1000;
let currentWidthNumber = 50;
let currentSlide = 0;


let autoPlayTimer;

// =========================================================

// ======================= FUNCTIONS =======================

// =========================================================

//  ================= Change theme ================

const changeTheme = () => {
    

    theme.removeAttribute('class');
    
    if(themeType === 'light') {
        document.documentElement.style.setProperty('--white', '#fff');
        document.documentElement.style.setProperty('--dark', '#000');
        document.documentElement.style.setProperty('--background-dark', '#222');
        document.documentElement.style.setProperty('--background-white', '#fff');
        document.documentElement.style.setProperty('--grey', '#f4f4f4');
        document.documentElement.style.setProperty('--orange', '#f0b10a');
        document.documentElement.style.setProperty('--dark-orange', '#e29608');
        document.documentElement.style.setProperty('--name-blue', '#474787');
        document.documentElement.style.setProperty('--border-grey', '#ddd');
        document.documentElement.style.setProperty('--copy-right-dark', '#222');
        theme.setAttribute( 'class',  'far fa-moon');
        filter.classList.add('hidden');
        changeLogo();
    }
    
    if(themeType === 'dark') {
        document.documentElement.style.setProperty('--white', '#000');
        document.documentElement.style.setProperty('--dark', '#fff');
        document.documentElement.style.setProperty('--background-dark', '#f3f3f3');
        document.documentElement.style.setProperty('--background-white', '#333');
        document.documentElement.style.setProperty('--grey', '#333');
        document.documentElement.style.setProperty('--orange', '#e29608');
        document.documentElement.style.setProperty('--dark-orange', '#f0b10a');
        document.documentElement.style.setProperty('--name-blue', '#3e3ec7');
        document.documentElement.style.setProperty('--border-grey', 'rgba(248, 236, 236, 0.6)');
        document.documentElement.style.setProperty('--copy-right-dark', '#fff');
        theme.setAttribute( 'class',  'fas fa-sun');
        filter.classList.remove('hidden');
        changeLogo();
    }
}

//  ================= load map into div function ================

const loadMap = () => {
    var map = L.map('map', { scrollWheelZoom: false}).setView([45.4494614, 28.0474952,15.75], 15);
    
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([45.4494614, 28.0474952,15.75]).addTo(map)
        .bindPopup('Come and visit us.')
        .openPopup();
}


//  ================= Smooth scroll function ================

const smoothScroll = (event) => {
    event.preventDefault();
    const clickedTab = event.target.closest('.nav-link');
     
    if(!clickedTab) return;

    if(clickedTab) {
      const href = clickedTab.getAttribute('href')
      const location = document.querySelector(href);

      if(location) {
          location.scrollIntoView({behavior:'smooth'})
      }
    }

}


//  ================= Change logo function ================

const changeLogo = () => {
    logoThemeType === 'light' ? logoThemeType = 'dark' : logoThemeType = 'light';

    if(logoThemeType === 'dark'){
        logo.setAttribute('src','./img/logo-dark.png');
        document.documentElement.style.setProperty('--nav-dark', '#000');
    }
    if(logoThemeType === 'light'){
        logo.setAttribute('src','./img/logo-light.png');
        document.documentElement.style.setProperty('--nav-dark', '#fff');
    }
};


//  ================= Section 1 show function ================

const showSection1 = (event) => {
    const [entry] = event;
    const sectionLeft = document.querySelector('.section-1__left');
    const sectionRight = document.querySelector('.section-1__right');
    if(entry.isIntersecting){
        sectionLeft.style.opacity = 1;
        sectionLeft.style.transform = 'translateX(0)';
        sectionRight.style.opacity = 1;
        sectionRight.style.transform = 'translateX(0)';

        observerSection1.unobserve(section1); 
    }
}


//  ================= Arrow show function ================

const showArrow = (event) => {
    const [entry] = event;
    const arrowUp = document.querySelector('.arrow__up');
    if(entry.isIntersecting){
        arrowUp.classList.add('arrow__hidden')
    }
    if(!entry.isIntersecting){
        arrowUp.classList.remove('arrow__hidden')
    }
}


//  ================= Section 2 show function ================

const showSection2 = (event) => {
    const [entry] = event;
    const sectionInfo1 = document.querySelector('.info-1');
    const sectionInfo2 = document.querySelector('.info-2');
    const sectionInfo3 = document.querySelector('.info-3');
    if(entry.isIntersecting){

        sectionInfo1.style.opacity = 1;
        sectionInfo1.style.transform = 'translateY(-100px)';
        sectionInfo2.style.opacity = 1;
        sectionInfo2.style.transform = 'translateY(-100px)';
        sectionInfo3.style.opacity = 1;
        sectionInfo3.style.transform = 'translateY(-100px)';

        observerSection2.unobserve(section2); 
    }
}

//  ================= Section 3 show function ================

const showSection3 = (event) => {
    const [entry] = event;
    const sectionRight = document.querySelectorAll('.section-3__right');
    const sectionLeft = document.querySelectorAll('.section-3__left');
    if(entry.isIntersecting){

        for (let i = 0; i < sectionLeft.length; i++) {
            setTimeout( () => {
                sectionRight[i].style.opacity = 1;
                sectionRight[i].style.transform = 'translateX(0)';
                sectionLeft[i].style.opacity = 1;
                sectionLeft[i].style.transform = 'translateX(0)';
            }, i*1000 + 300)
        }

        observerSection3.unobserve(section3); 
    }
}
//  ================= Section 4 show function ================

const showSection4 = (event) => {
    const [entry] = event;
    const window1 = document.querySelector('.window-1');
    const window2 = document.querySelector('.window-2');
    const window3 = document.querySelector('.window-3');
    if(entry.isIntersecting){

        window1.style.opacity = 1;
        window1.style.transform = 'translateX(0)';
        window2.style.opacity = 1;
        window2.style.transform = 'translateY(0)';
        window3.style.opacity = 1;
        window3.style.transform = 'translateX(0)';
          
        observerSection4.unobserve(section4); 
    }
}



//  ================= Testimaonials spread ================

const renderSlides = (currentSlide) => {
    clients.forEach( (client, index) => {
        client.style.transform = `translateX(${currentWidth * ( index - currentSlide)}px)`
    })
    clientsNumbers.forEach( (client, index) => {
        client.style.transform = `translateX(${currentWidthNumber * ( index - currentSlide)}px)`
    })
}

//  ================= Slide Right  ================

const slideRight = () => {
    currentSlide++;
    currentSlide > 2 ? currentSlide = 0 : null;
    renderSlides(currentSlide);
    resetTimer();
}

//  ================= Slide Left  ================

const slideLeft = () => {
    currentSlide--;
    currentSlide < 0 ? currentSlide = 2 : null;
    renderSlides(currentSlide);
    resetTimer();
}

//  ================= Timmer  ================
const resetTimer = () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval( autoPlay, 4000);
}

const autoPlay = () => {
    slideRight();
}


//  ================= Nav sticky on scroll observer ================


const addStickyNav = (event) => {
    const [entry] = event;
    if(!entry.isIntersecting) {
        nav.classList.add('nav-fixed');
        changeLogo();
    }
    
    if(entry.isIntersecting) {
        nav.classList.remove('nav-fixed');
        changeLogo();
    }
}

// =========================================================

// ======================= EVENT LISTENERS =======================

// =========================================================


//  ================= Remove spinner after load ================

window.addEventListener( 'load', () =>{  
    const spinner = document.querySelector('.spinner');
    spinner.classList.add('spinner__hidden');
    loadMap();
    
    if(window.pageYOffset > 938) {
        changeLogo();
    }
});

btnOrange.addEventListener( 'click', (e) => {
    e.preventDefault();
    const contactUs = document.querySelector('#contactUs');
    contactUs.scrollIntoView({behavior: 'smooth'});
})

//  ================= Change theme on click ================

theme.addEventListener( "click", (e) => {
    e.preventDefault();
    themeType === 'light' ? themeType = 'dark' : themeType = 'light';
    localStorage.clear();
    localStorage.setItem('themeType', themeType);
    changeTheme();
})


form.addEventListener( 'submit' , (e) => {
    e.preventDefault();
    alert('Message was sent! Thank you!');
    document.querySelector('.form__name').value = '';
    document.querySelector('.form__number').value = '';
    document.querySelector('.form__email').value = '';
    document.querySelector('.form__message').value = '';
})

//  ================= Scroll Up ================

arrowUp.addEventListener( "click", (e) => {
    e.preventDefault();
    header.scrollIntoView({behavior: 'smooth'});
})

//  ================= Smooth scroll event ================

navList.addEventListener('click', smoothScroll);


// =========================================================

// ======================= ADDING OBSERVERS =======================

// =========================================================


//  =================== All options for the observers ===============

const optionsNav = {
    root: null,
    threshold: 0,
    rootMargin: '-1px'
}

const optionsShowSections = {
    root: null,
    threshold: 0.5
}
const optionsShowSections2 = {
    root: null,
    threshold: 0.1
}
const optionsShowSections3 = {
    root: null,
    threshold: 0.4
}
const optionsShowSections4 = {
    root: null,
    threshold: 0.6
}
const optionsArrow = {
    root: null,
    threshold: 1,
    rootMargin: '60px'
}


// ===================  Creating all observers ==================== 

const observerNav = new IntersectionObserver( addStickyNav, optionsNav);
observerNav.observe(header)
const observerSection1 = new IntersectionObserver( showSection1, optionsShowSections);
observerSection1.observe(section1);
const observerSection2 = new IntersectionObserver( showSection2, optionsShowSections2);
observerSection2.observe(section2);
const observerSection3 = new IntersectionObserver( showSection3, optionsShowSections3);
observerSection3.observe(section3);
const observerSection4 = new IntersectionObserver( showSection4, optionsShowSections4);
observerSection4.observe(section4);
const observerArrow = new IntersectionObserver( showArrow, optionsArrow);
observerArrow.observe(header);



// Testimonials 


const clientButtonRight = document.querySelector('.client__button-right');
clientButtonRight.addEventListener('click', slideRight);

const clientButtonLeft = document.querySelector('.client__button-left');
clientButtonLeft.addEventListener('click', slideLeft);



function Init() {
    
    renderSlides(currentSlide);
    autoPlayTimer = setInterval( autoPlay, 4000);
    

    const localTheme = localStorage.getItem('themeType');
    if(localTheme === 'dark') {
        themeType = localTheme; 
        changeTheme();
    }
}

Init();