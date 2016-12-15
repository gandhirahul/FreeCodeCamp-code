var initialValue = 0,timer, breakMinValue = 1,sessionMinValue = 1,heightCircle = 300;
var timerValue = 1500; // Default value for session timer
var breakInputValue = 300; // Default value for break timer
var heightIncrmnt = 100 / timerValue;
var breakHeightIncrmt = 100 / breakInputValue;
var isStarted = false;

window.onload = function() {

  registerEvents();
  document.querySelector('#timer-value').innerHTML = convertSecToMin(timerValue);
  document.querySelector('#timer-text').innerHTML = 'Session !!!';

}

function registerEvents() {
  document.querySelector('#break-value-minus').addEventListener('click', breakValueChange, false);
  document.querySelector('#break-value-plus').addEventListener('click', breakValueChange, false);
  document.querySelector('#session-value-minus').addEventListener('click', sessionValueChange, false);
  document.querySelector('#session-value-plus').addEventListener('click', sessionValueChange, false);
  document.querySelector('#start').addEventListener('click', startClock, false);
  document.querySelector('#reset').addEventListener('click', stopClock, false);
}
// On click callbacks
function breakValueChange() {
  if (isStarted) {
    return;
  }
  var breakValue = parseInt(document.querySelector('#break-value').value);
  var newValue;
  if (this.value == '-') {
    newValue = breakValue - 1;
  } else {
    newValue = breakValue + 1;
  }
  if (newValue < breakMinValue) {
    newValue = breakMinValue
  }
  breakInputValue = newValue * 60;
  document.querySelector('#break-value').value = newValue;
}

function sessionValueChange() {
  if (isStarted) {
    return;
  }
  var sessionValue = parseInt(document.querySelector('#session-value').value);
  var newValue;
  if (this.value == '-') {
    newValue = sessionValue - 1;
  } else {
    newValue = sessionValue + 1;
  }
  if (newValue < sessionMinValue) {
    newValue = sessionMinValue
  }
  timerValue = newValue * 60;
  heightIncrmnt = 100 / timerValue;
  document.querySelector('#session-value').value = newValue;
  document.querySelector('#timer-value').innerHTML = newValue + ":00";
}

function startClock() {
  if (isStarted) {
    return;
  }
  isStarted = true;
  showAnimation();
  toggleDisable(true);
}

  
function stopClock() {
  if (timer)
    clearInterval(timer);
  timerValue = 1500; // Default value for session timer
  breakInputValue = 300; // Default value for break timer
  document.querySelector('#session-value').value = timerValue / 60;
  document.querySelector('#break-value').value = breakInputValue / 60;

  document.querySelector('#timer-value').innerHTML = convertSecToMin(timerValue);
  document.querySelector('#timer-text').innerHTML = 'Session !!!';
  initialValue = 0;
  var innerCircle = document.querySelector('.inner-circle');
  
  innerCircle.style.height = initialValue + "%";
  innerCircle.style.background = '#27ae60';
  
  heightIncrmnt = 100 / timerValue;
  isStarted = false;
  toggleDisable(false);
}

function toggleDisable(add) {
  var inputs = document.querySelectorAll('.input-control');
  if (add) {
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains('disable')) {
        // inputs[i].classList.remove('disable');
      } else {
        inputs[i].classList.add('disable');
      }
    }
  } else {
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains('disable')) {
        inputs[i].classList.remove('disable');
      } else {
        // inputs[i].classList.add('disable');
      }
    }
  }
}

function showAnimation() {
  document.querySelector('#timer-value').innerHTML = convertSecToMin(timerValue);
  document.querySelector('#timer-text').innerHTML = 'Session !!!';
  
  timer = setInterval(startSessionTimer, 1000);
}

function startSessionTimer() {
  timerValue = timerValue - 1;
  document.querySelector('#timer-value').innerHTML = convertSecToMin(timerValue);
  initialValue += heightIncrmnt;
  var innerCircle = document.querySelector('.inner-circle');
  innerCircle.style.height = initialValue + "%";
  innerCircle.style.background = '#27ae60';
  
  if (Math.floor(initialValue) >= 100) {
    clearInterval(timer);
    timer = null;
    initialValue =0;
    breakHeightIncrmt = 100 / breakInputValue;
    document.querySelector('#timer-value').innerHTML = convertSecToMin(breakInputValue);
    document.querySelector('#timer-text').innerHTML = 'Break !!!';
    timer = setInterval(startBreakTimer, 1000);
  }
}

function startBreakTimer (){
  breakInputValue = breakInputValue - 1;
  document.querySelector('#timer-value').innerHTML = convertSecToMin(breakInputValue);
  initialValue += breakHeightIncrmt;
  var innerCircle = document.querySelector('.inner-circle');
  innerCircle.style.height = initialValue + "%";
  innerCircle.style.background = '#e67e22';
  
  if (Math.floor(initialValue) >= 100 || breakInputValue <= 0) {
    clearInterval(timer);
    timer = null;
  }
}


function convertSecToMin(sec) {
  var min = Math.floor(sec / 60);
  var secs = sec % 60;
  if (secs < 10) {
    secs = '0' + secs;
  }
  var retrValue = min + ":" + secs;
  return retrValue;
}