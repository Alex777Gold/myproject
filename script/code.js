//Slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

//Menu
const toggleMenuButton = document.getElementById("menu-icon");
const mainMenu = document.querySelector(".list");
const logoImg = document.querySelector(".logo-img");
const closing = document.querySelector(".mobile");
const mobile_background = document.querySelector(".mobile_background");


toggleMenuButton.addEventListener("click", function () {
  mainMenu.style.display = "block";
  closing.style.display = "block";
  logoImg.style.display = "none";
  toggleMenuButton.style.display = "none";
  mobile_background.style.display = "block";
});

closing.addEventListener("click", function () {
  mainMenu.style.display = "none";
  logoImg.style.display = "block";
  toggleMenuButton.style.display = "block";
  mobile_background.style.display = "none";
});