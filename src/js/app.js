// .slideshow-container - it should be width 100% let say 1920px and overflow should be hidden
// .slideshow-container .slide-wrapper - it should be length of images times image width. Image width should be responsive so it should be handled with javascript.
// .slideshow-container .slide-wrapper .slide -> slide images - it should be float: left
// .slideshow-container .prev -> arrow
// .slideshow-container .next -> arrow
// .slideshow-container .dots-container .dot -> dot

var slideshowContainer; // slideshow-conatainer element
var slideWrapper; // slide-wrapper element
var slideNumber; // how many slide
var slideWidth; // width value of each slide
var slideIndex = 1; // slideIndex: 슬라이드 번호
var slideShowAuto; // clearTimeout을 사용하기 위해 setTimeout을 저장할 변수 선언
var dots;

slideshowContainer = document.querySelector('.slideshow-container'); // .slideshow-container element
slideWrapper = document.querySelector('.slide-wrapper'); // .slide-wrapper element
slideItem = document.querySelectorAll('.slide'); // .slide element
slideNumber = slideItem.length; // .slide 갯수
slideWidth = slideshowContainer.offsetWidth; // .slodeshow-container의 가로값
dots = document.querySelectorAll('.dot');

let isMouseDown = false; // 마우스 클릭 상태 기본값
let startX; // 마우스 클릭한 X 좌표

// 각 .slide 이미지 가로값을 상위 .slideshow-container의 가로값으로 지정
for (let i = 0; i < slideNumber; i++) {
  slideItem[i].style.width = slideWidth + 'px';
}

console.log("slideIndex: " + slideIndex);
makeClone(); // 처음 이미지와 마지막 이미지 복사 함수
initSlides();
autoSlides();


function makeClone() { // 처음 이미지를 슬라이드 이미지 맨 마지막 노드에 붙이고 마지막 이미지를 슬라이드 첫째 이미지 노드 이전에 복사한다.
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
  dots[0].classList.add('active');
}


// Next/previous controls
function plusSlides(n) {
  clearTimeout(slideShowAuto); // 슬라이드 이동시 autoSlide의 setTimeout 초기화
  // console.log(n < 1 ? "left clicked" : "right clicked");
  // 왼쪽 arrow 클릭시, 이미지 인덱스가 1 이상이면, 이전슬라이드로 이동하고, 이미지 인덱스가 0이면 이미지 인덱스 값을 5로 변경한다.
  // 오른쪽 arrow 클릭시, 이미지 인덱스가 7보다 작으면, 다음 슬라이드로 이동하고, 이미지 인덱스가 7이면 이미지 인덱스 값을 1로 변경한다.
  n < 1 ? slideIndex > 0 ? slideIndex -= 1: slideIndex = 5 : slideIndex < 7 ? slideIndex += 1 : slideIndex = 1;
  for (let i = 0; i < dots.length; i++) { // 모든 dot에서 active 클래스를 지운다.
    dots[i].classList.remove('active');
  }
  if (slideIndex >= 1 && slideIndex <= 5) { 
    // 슬라이드 인덱스가 0과 같거나 크고 5보다 작거나 같으면 슬라이드 인덱스에서 1을 뺀 dot에 active 클래스를 추가한다.
    dots[slideIndex - 1].classList.add('active');
  }
  if (slideIndex == 6) { // 슬라이드 인덱스가 6일때, 처음 dot에 active 클래스를 추가한다.
    dots[0].classList.add('active');
  }
  if (slideIndex == 0) { // 슬라이드 인덱스가 0일때, 마지막 dot에 active 클래스를 추가한다.
    dots[4].classList.add('active');
  }
  // console.log("slideIndex: " + slideIndex);
  // 이미지 가로값에 이미지 인덱스 값을 마이너스한 값을 곱해서 'px'를 붙여 슬라이드 전체 이미지의 left 값을 조정한다.
  // css에 .slide-wrapper에 transition 값에 따라 전환 효과가 적용된다. 
  slideWrapper.style.left = -(slideIndex) * slideWidth + 'px';
  // console.log(slideWrapper.style.left);
  if (n < 1 && slideIndex === 0) { 
    // 슬라이드 인덱스가 0일때 왼쪽 arrow를 클릭하면 슬라이드 인덱스를 5로 바꿔주고 0.5 초 지연 후 0초 동안 5번째 슬라이드로 위치 조정한다.
    // console.log("n: " + n);
    // console.log("slideIndex: " + slideIndex);
    setTimeout(function() {
      console.log("setTimeout is fired!");
      slideWrapper.style.transition = `${0}s ease-out`;
      slideIndex = 5;
      slideWrapper.style.left = -slideIndex * slideWidth + 'px';
      
    }, 500);
  } else {
    // console.log("n: " + n);
    // console.log("slideIndex: " + slideIndex);
    // 그 외의 경우에는 0.5 초동안 슬라이드 전환 효과를 적용한다.
    slideWrapper.style.transition = `${0.5}s ease-out`;
  }
  if (n >= 1 && slideIndex === 6) {
    // 슬라이드 인덱스가 6일때 오른쪽 arrow를 클릭하면 슬라이드 인덱스를 1로 바꿔주고 0.5 초 지연 후 0초 동안 1번째 슬라이드로 위치 조정한다.
    // console.log("n: " + n);
    // console.log("slideIndex: " + slideIndex);
    setTimeout(function() {
      // console.log("setTimeout is fired!");
      slideIndex = 1;
      slideWrapper.style.left = -(slideIndex) * slideWidth + 'px';
      slideWrapper.style.transition = `${0}s ease-out`;
      // console.log(slideWrapper.style.left);
    }, 500);
  } else {
    // console.log("n: " + n);
    // console.log("slideIndex: " + slideIndex);
    slideWrapper.style.transition = `${0.5}s ease-out`;
  }
}

// Dots image controls
function currentSlide(n) {
  clearTimeout(slideShowAuto); // setTimeout을 초기화 한다.
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  dots[n-1].classList.add('active');
  // console.log(n + " clicked");
  // console.log("currentSlides: " + n);
  showSlides(slideIndex = n); // showSlides 함수 호출한다.
}

function showSlides(n) {
  // console.log("showSlides: " + n);
  // dot를 클릭하면 slide-wrapper의 left 값을 각 슬라이드 가로값 곱하기 dot의 n 값을 곱해서 이동한다. 
  slideWrapper.style.left = -n * slideWidth + 'px';
}

function autoSlides() {
  // clearTimeout을 위한 변수에 setTimeout을 추가해주고 4초 후 슬라이드 쇼를 시작한다.
  slideShowAuto = setTimeout(function() {plusSlides(1)}, 4000); 
  // 오른쪽으로 슬라이드가 넘어가면서 다시 autoSlides 함수를 다시 콜백한다.
  setTimeout(autoSlides, 4000);
}

slideWrapper.addEventListener('mousedown', (e) => {
  // console.log("mousedown event is fired!");
  isMouseDown = true;
  startX = e.pageX;
  // console.log("startX: " + startX);
});

slideWrapper.addEventListener('mouseleave', (e) => {
  // console.log("mouseleave event is fired!");
  isMouseDown = false;
});

slideWrapper.addEventListener('mouseup', (e) => {
  // console.log("mouseup event is fired!");
  isMouseDown = false;
  // console.log("e.pageX: " + e.pageX);
  if (startX - e.pageX < 0) { // 오른쪽으로 드래그한 경우
    plusSlides(-1);
  } else if (startX - e.pageX > 0) { // 왼쪽으로 드래그한 경우
    plusSlides(1); 
  }
});

slideWrapper.addEventListener('mousemove', (e) => {
  if (isMouseDown) { // 마우스를 클릭했을때
    e.preventDefault(); // 기본 이벤트를 방지한다.
  } else return;
});