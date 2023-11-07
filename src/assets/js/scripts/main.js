const preloader = document.querySelector('.preloader');
const main = document.querySelector('.main');


document.addEventListener('DOMContentLoaded', function() {
  preloader.classList.add('close');
  main.classList.add('active');
}, false);

//scroll
const scrollContainer = document.querySelector('#scrollbar');

if (window.matchMedia('(max-height: 760px)').matches) {
  scrollContainer.style.height = `${window.innerHeight}px`;

}
window.addEventListener('resize', () => {
  scrollContainer.style.height = `${window.innerHeight}px`;
})


var Scrollbar = window.Scrollbar;
Scrollbar.init(document.querySelector('#scrollbar'), {});




//browser
const mainBrowserBox = document.querySelector('.main__browser-box');
const browserBoxCollapseBtn = document.querySelector('.browser-box__collapse-btn');
const browserBoxExpandBtn = document.querySelector('.browser-box__expand-btn');
const browserBoxCloseBbtn = document.querySelector('.browser-box__close-btn');
const logo = document.querySelector('.logo');
const footer = document.querySelector('.footer');


browserBoxCollapseBtn.addEventListener('click', () => {
  if (window.innerWidth > 1400 && window.innerHeight > 760) {
    mainBrowserBox.classList.add('_collapse');
    footer.classList.add('_collapse');
  }

})

browserBoxExpandBtn.addEventListener('click', () => {
  mainBrowserBox.classList.remove('_collapse');
  
})

browserBoxCloseBbtn.addEventListener('click', () => {
  if (window.innerWidth > 1400 && window.innerHeight > 760) {
    mainBrowserBox.classList.remove('_collapse');
    mainBrowserBox.classList.add('_close');
    logo.classList.add('_active');
  }
})

logo.addEventListener('click', () => {
  mainBrowserBox.classList.remove('_close');
  logo.classList.remove('_active');
})



