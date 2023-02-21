const box = document.getElementById('box');
const dot = document.getElementById('dot');
const Width = parseInt(getComputedStyle(box).width);
const dotWidth = parseInt(getComputedStyle(dot).width);
const boxWidth = parseInt(getComputedStyle(box).width) - (Width / dotWidth) * 2;
const boxHeight =
  parseInt(getComputedStyle(box).height) - (Width / dotWidth) * 2;
let dotLeft = parseInt(getComputedStyle(dot).left);
let dotBottom = parseInt(getComputedStyle(dot).bottom);
const timeInput = document.getElementById('time');
let timeValue = +timeInput.value;
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const restartBtn = document.getElementById('restart');
const loopBtn = document.getElementById('loop');
45;

let startTime, endTime;

// here dotWidth = dotHeight
const totalSteps =
  (boxWidth / dotWidth) * (boxHeight / dotWidth) + boxHeight / dotWidth;

console.log(totalSteps, boxWidth, boxHeight);

let flag; // to decide which direction dot need to move L/R

function populateUI(dotLeft, dotBottom) {
  dot.style.left = `${dotLeft}px`;
  dot.style.bottom = `${dotBottom}px`;
}

function storeLocation(dotLeft, dotBottom) {
  localStorage.setItem('dotLeftLocation', dotLeft);
  localStorage.setItem('dotBottomLocation', dotBottom);
}

function moveTheDot() {
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  restartBtn.disabled = false;
  //Check if the dot has touched the laft wall of the box
  if (dotLeft <= 0) {
    flag = true;
  }
  //Keep moving dot to the right if flag = true
  //Otherwise make the flag = false and move it to the left
  if (dotLeft < boxWidth && flag) {
    dotLeft += dotWidth;
    dot.style.left = `${dotLeft}px`;
  } else {
    flag = false;
    dotLeft -= dotWidth;
    dot.style.left = `${dotLeft}px`;
  }
  //If dot has touched the either side of the all move it 1 step upwards
  if (dotLeft == 0 || dotLeft >= boxWidth) {
    dotBottom += dotWidth;
    dot.style.bottom = `${dotBottom}px`;
  }

  //Restrat runnung the dot from the bottom
  if (dotBottom >= boxHeight && dotLeft >= boxWidth) {
    endTime = Date.now();
    console.log(`startTime: ${startTime} endTime: ${endTime}`);
    console.log(endTime - startTime);
    if (loopBtn.checked) {
      dotLeft = 0;
      dotBottom = 0;
      dot.style.left = `${dotLeft}px`;
      dot.style.bottom = `${dotBottom}px`;
    } else {
      clearInterval(myInterval);
      dotLeft = 0;
      dotBottom = 0;
      dot.style.left = `${dotLeft}px`;
      dot.style.bottom = `${dotBottom}px`;
      startBtn.disabled = false;
    }
  }
}

function pauseDot() {
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  storeLocation(dotLeft, dotBottom);
  clearInterval(myInterval);
  console.log(dotLeft, dotBottom);
}

function restartDot() {
  clearInterval(myInterval);
  localStorage.clear('dotLeftLocation', 'dotBottomLocation');
  dotLeft = 0;
  dotBottom = 0;
  dot.style.left = `${dotLeft}px`;
  dot.style.bottom = `${dotBottom}px`;
  runDot();
}
function runDot() {
  startTime = Date.now();
  startBtn.disabled = true;
  let smartInterval = Math.floor((timeValue * 1000) / totalSteps);
  myInterval = setInterval(moveTheDot, smartInterval);
}
function increaseTime() {
  if (timeValue < 51) {
    timeValue = timeValue + 1;
    timeInput.value = timeValue;
  }
}
function decreaseTime() {
  if (timeValue > 1) {
    timeValue = timeValue - 1;
    timeInput.value = timeValue;
  }
}
function chnageSpeed() {
  if (timeInput.value < 1 || timeInput.value > 50) {
    timeInput.value = 5;
  } else {
    timeValue = +timeInput.value; //manually gets input value from user
  }
}

startBtn.addEventListener('click', runDot);
pauseBtn.addEventListener('click', pauseDot);
restartBtn.addEventListener('click', restartDot);
timeInput.addEventListener('change', chnageSpeed);

window.onload = () => {
  dotLeft = JSON.parse(localStorage.getItem('dotLeftLocation')) || 0;
  dotBottom = JSON.parse(localStorage.getItem('dotBottomLocation')) || 0;
  populateUI(dotLeft, dotBottom);
  pauseBtn.disabled = true;
  restartBtn.disabled = true;
};
