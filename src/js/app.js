// .slideshow-container # it should be width 100% let say 1920px and overflow should be hidden
// .slideshow-container .slide-wrapper # it should be length of images times image width. Image should be responsive so it should be handled with javascript.
// .slideshow-container .slide-wrapper .slide -> slide images # it should be display inline-block
// .slideshow-container .prev -> arrow
// .slideshow-container .next -> arrow
// .slideshow-container .dots-container .dot -> dot

var slideshowContainer; // # slideshow-conatainer element
var slideWrapper; // # slide-wrapper element
var slideNumber; // # how many slide
var slideWidth; // # width value of slide
var slideWrapperWidth; // # slide-wrapper 가로값
var slideIndex = 1; // # slideIndex: 슬라이드 번호

// var sliding = startClientX = startPixelOffset = pixelOffset = presentSlide = 0;
// var slideCount = document.getElementsByClassName("slide").length; // 슬라이드 갯수 확인
var slideShowAuto; // # clearTimeout을 사용하기 위해 변수 선언

slideshowContainer = document.querySelector('.slideshow-container'); // .slideshow-container element
slideWrapper = document.querySelector('.slide-wrapper'); // .slide-wrapper element
slideItem = document.querySelectorAll('.slide'); // .slide element
slideNumber = slideItem.length; // .slide 갯수
slideWidth = slideshowContainer.offsetWidth; // .slodeshow-container의 가로값

let isMouseDown = false;
let startX, scrollLeft;

// 각 .slide 이미지 가로값을 상위 .slideshow-container의 가로값으로 지정
for (let i = 0; i < slideNumber; i++) {
  slideItem[i].style.width = slideWidth + 'px';
}

console.log("slideIndex: " + slideIndex); // console.log
// autoSlides();
// showSlides(slideIndex);
makeClone(); // 처음 이미지와 마지막 이미지 복수 함수
initSlides();
autoSlides();


function makeClone() {
  let cloneSlide_first = slideItem[0].cloneNode(true);
  let cloneSlide_last = slideWrapper.lastElementChild.cloneNode(true);
  slideWrapper.append(cloneSlide_first);
  slideWrapper.insertBefore(cloneSlide_last, slideWrapper.firstElementChild);
}

function initSlides() {
  // .slide-wrapper의 가로값을 .slide 이미지 가로값 곱하기 .slide 이미지 갯수로 연산하여 지정해준다.
  slideWrapper.style.width = parseInt(slideWidth * (slideNumber + 2)) + 'px';

  // 두번째 이미지를 첫번째 이미지로 설정한다.
  slideWrapper.style.left = -(slideWidth) + 'px';
}


// Next/previous controls
function plusSlides(n) {
  clearTimeout(slideShowAuto); // 슬라이드 이동시 autoSlide의 setTimeout 초기화
  console.log(n < 1 ? "left clicked" : "right clicked") // console.log
  n < 1 ? slideIndex > 0 ? slideIndex -= 1: slideIndex = 5 : slideIndex < 7 ? slideIndex += 1 : slideIndex = 1;
  console.log("slideIndex: " + slideIndex);
  slideWrapper.style.left = -(slideIndex) * slideWidth + 'px';
  console.log(slideWrapper.style.left);
  if (n < 1 && slideIndex === 0) {
    console.log("n: " + n);
    console.log("slideIndex: " + slideIndex);
    setTimeout(function() {
      console.log("setTimeout is fired!");
      slideWrapper.style.transition = `${0}s ease-out`;
      slideIndex = 5;
      slideWrapper.style.left = -slideIndex * slideWidth + 'px';
      
    }, 500);
  } else {
    console.log("n: " + n);
    console.log("slideIndex: " + slideIndex);
    slideWrapper.style.transition = `${0.5}s ease-out`;
  }
  if (n >= 1 && slideIndex === 6) {
    console.log("n: " + n);
    console.log("slideIndex: " + slideIndex);
    setTimeout(function() {
      console.log("setTimeout is fired!");
      slideIndex = 1;
      slideWrapper.style.left = -(slideIndex) * slideWidth + 'px';
      slideWrapper.style.transition = `${0}s ease-out`;
      console.log(slideWrapper.style.left);
    }, 500);
  } else {
    console.log("n: " + n);
    console.log("slideIndex: " + slideIndex);
    slideWrapper.style.transition = `${0.5}s ease-out`;
  }
}

// Dots image controls
function currentSlide(n) {
  clearTimeout(slideShowAuto);
  console.log(n + " clicked"); // console.log
  console.log("currentSlides: " + n) // console.log
  showSlides(slideIndex = n);
}
function autoSlides() {
  slideShowAuto = setTimeout(function() {plusSlides(1)}, 4000);
  setTimeout(autoSlides, 4000);
}

function showSlides(n) {
  console.log("showSlides: " + n); // console.log
  if (n > 0) {
    slideWrapper.style.left = -n * slideWidth + 'px';
  } else {
    slideWrapper.style.left = n * slideWidth + 'px';
  }
  console.log("showSlides: " + n);
}

slideWrapper.addEventListener('mousedown', (e) => {
  console.log("mousedown event is fired!");
  isMouseDown = true;
  slideWrapper.classList.add('active');
  startX = e.pageX;
  console.log("startX: " + startX);
});

slideWrapper.addEventListener('mouseleave', (e) => {
  console.log("mouseleave event is fired!");
  isMouseDown = false;
});

slideWrapper.addEventListener('mouseup', (e) => {
  console.log("mouseup event is fired!");
  isMouseDown = false;
  console.log("e.pageX: " + e.pageX);
  if (startX - e.pageX < 0) {
    plusSlides(-1);
  } else if (startX - e.pageX > 0) {
    plusSlides(1);
  }
});

slideWrapper.addEventListener('mousemove', (e) => {
  if (isMouseDown) { // # mousedown is true
    e.preventDefault();
  } else return;
});