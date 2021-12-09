// .slideshow-container # it should be width 100% let say 1920px and overflow should be hidden
// .slideshow-container .slide-wrapper # it should be length of images times image width. Image should be responsive so it should be handled with javascript.
// .slideshow-container .slide-wrapper .slide -> slide images # it should be display inline-block
// .slideshow-container .prev -> arrow
// .slideshow-container .next -> arrow
// .slideshow-container .dots-container .dot -> dot

var slideshowContainer;
var slideWrapper; // # slide-wrapper element
var slideNumber; // # how many slide
var slideWidth; // # width value of slide
var slideWrapperWidth; // # slide-wrapper 가로값
var slideIndex = 1; // # slideIndex: 슬라이드 번호
// var sliding = startClientX = startPixelOffset = pixelOffset = presentSlide = 0;
// var slideCount = document.getElementsByClassName("slide").length; // 슬라이드 갯수 확인
var slideShowAuto;

slideshowContainer = document.querySelector('.slideshow-container'); // .slideshow-container element
slideWrapper = document.querySelector('.slide-wrapper'); // .slide-wrapper element
slideItem = document.querySelectorAll('.slide'); // .slide element
slideNumber = slideItem.length; // .slide 갯수
slideWidth = slideshowContainer.offsetWidth; // .slodeshow-container의 가로값

// 각 .slide 이미지 가로값을 상위 .slideshow-container의 가로값으로 지정
for (let i = 0; i < slideNumber; i++) {
  slideItem[i].style.width = slideWidth + 'px';
}

console.log("slideIndex: " + slideIndex); // console.log
// autoSlides();
// showSlides(slideIndex);
makeClone(); // 처음 이미지와 마지막 이미지 복수 함수
initSlides();

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
  // console.log("plusSlides: " + n) // console.log
  // //showSlides(slideIndex += 1);
  // console.log("slideIndex: " + slideIndex)
  // if (slideIndex == 1) {
  //   if (n == 1) {
  //     slideIndex += 1;
  //   }
  //   slideWrapper.style.left = 0 - slideWidth + 'px';
  //   console.log(slideWrapper.style.left);
  // }
  // if (slideIndex > 1) {
  //   slideWrapper.style.left = parseInt(document.querySelector('.slide-wrapper').style.left) - slideWidth + 'px';
  //   console.log(slideWrapper.style.left);
  // }
  // if (n > 0) {
  //   slideIndex += 1;
  //   console.log(parseInt(document.querySelector('.slide-wrapper').style.left) - slideWidth + 'px');
  //   slideWrapper.style.left = parseInt(document.querySelector('.slide-wrapper').style.left) - slideWidth + 'px';
  // } else {
  //   slideIndex -= 1;
  //   console.log(parseInt(document.querySelector('.slide-wrapper').style.left) - slideWidth + 'px');
  //   slideWrapper.style.left = parseInt(document.querySelector('.slide-wrapper').style.left) - slideWidth + 'px';
  // }
}

// Dots image controls
function currentSlide(n) {
  console.log(n + " clicked"); // console.log
  console.log("currentSlides: " + n) // console.log
  showSlides(slideIndex = n);
}
function autoSlides() {
  console.log("autoSlides function is fired")
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    // slides[i].style.display = "none";
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
  if (n > 0) {
    slideWrapper.style.left = -n * slideWidth + 'px';
  } else {
    slideWrapper.style.left = n * slideWidth + 'px';
  }
  console.log("showSlides: " + n);
  // var i;
  // var slides = document.getElementsByClassName("slide");
  // var dots = document.getElementsByClassName("dot");
  // if (n > slides.length) {
  //   slideIndex = 1
  //   console.log("slideIndex: " + slideIndex); // console.log
  // }
  // if (n < 1) {
  //   slideIndex = slides.length;
  //   console.log("slideIndex: " + slideIndex); // console.log
  // }
  // for (i = 0; i < slides.length; i++) {
  //   // slides[i].style.display = "none";
  // }
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  // slides[slideIndex-1].style.display = "block"
  // dots[slideIndex-1].className += " active";

  // setTimeout(showSlides(n+1), 2000);
}

// document.querySelector('.slide').addEventListener('mousedown touchstart', slideStart);
// document.querySelector('.slide').addEventListener('mouseup touchend', slideEnd);
// document.querySelector('.slide').addEventListener('mousemove touchmove', slide);

/**
/ Triggers when slide event started
*/
// function slideStart(event) {
//   console.log("slideStart event is fired");
//   // If it is mobile device redefine event to first touch point
//   if (event.originalEvent.touches)
//     event = event.originalEvent.touches[0];
//   // If sliding not started yet store current touch position to calculate distance in future.
//   if (sliding == 0) {
//     sliding = 1; // Status 1 = slide started.
//     startClientX = event.clientX;
//   }
// }

 /** Occurs when image is being slid.
*/
// function slide(event) {
//   console.log("slide event is fired");
//   event.preventDefault();
//   if (event.originalEvent.touches)
//     event = event.originalEvent.touches[0];
//   // Distance of slide.
//   var deltaSlide = event.clientX - startClientX;
//   // If sliding started first time and there was a distance.
//   if (sliding == 1 && deltaSlide != 0) {
//     sliding = 2; // Set status to 'actually moving'
//     startPixelOffset = pixelOffset; // Store current offset
//   }
  
//   //  When user move image
//   if (sliding == 2) {
//     // Means that user slide 1 pixel for every 1 pixel of mouse movement.
//     var touchPixelRatio = 1;
//     // Check for user doesn't slide out of boundaries
//     if ((currentSlide == 0 && event.clientX > startClientX) ||
//         (currentSlide == slideCount - 1 && event.clientX < startClientX))
//       // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
//       touchPixelRatio = 3;
//     // Calculate move distance.
//     pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
//     // Apply moving and remove animation class
//     document.querySelector('#slides').css('transform', 'translateX(' + pixelOffset + 'px').removeClass();
//   }
// }

/** When user release pointer finish slide moving.
*/
// function slideEnd(event) {
//   console.log("slideEnd event is fired");
//   if (sliding == 2){
//     // Reset sliding.
//     sliding = 0;
//     // Calculate which slide need to be in view.
//     currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide -1;
//     // Make sure that unexisting slides weren't selected.
//     currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
//     // Since in this example slide is full viewport width offset can be calculated according to it.
//     pixelOffset = currentSlide * -document.querySelector('body').width();
//     // Remove style from DOM (look below)
//     document.querySelector('#temp').remove();
//     // Add a translate rule dynamically and asign id to it
//     document.querySelector('<style id="temp">#slides.animate{transform:translateX(' + pixelOffset + 'px)}</style>').appendTo('head');
//     // Add animate class to slider and reset transform prop of this class.
//     document.querySelector('#slides').classList.add('animate').css('transform', '');
//   }
// }