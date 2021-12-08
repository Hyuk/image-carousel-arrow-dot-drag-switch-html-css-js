var slideIndex = 1;
var sliding = startClientX = startPixelOffset = pixelOffset = presentSlide = 0;
var slideCount = document.getElementsByClassName("slide").length; // 슬라이드 갯수 확인

document.querySelector('.slide').addEventListener('mousedown touchstart', slideStart);
document.querySelector('.slide').addEventListener('mousedown touchstart', slideStart);
document.querySelector('.slide').addEventListener('mousedown touchstart', slideStart);

console.log("slideIndex: " + slideIndex); // console.log
autoSlides();
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  console.log(n < 1 ? "left clicked" : "right clicked") // console.log
  console.log("plusSlides: " + n) // console.log
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  console.log(n + " clicked"); // console.log
  console.log("currentSlides: " + n) // console.log
  showSlides(slideIndex = n);
}
function autoSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex++;
  console.log("slideIndex: " + slideIndex)
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(autoSlides, 4000); // Change image every 2 seconds
}

function showSlides(n) {
  console.log("showSlides: " + n); // console.log
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
    console.log("slideIndex: " + slideIndex); // console.log
  }
  if (n < 1) {
    slideIndex = slides.length;
    console.log("slideIndex: " + slideIndex); // console.log
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"
  dots[slideIndex-1].className += " active";

  // setTimeout(showSlides(n+1), 2000);
}