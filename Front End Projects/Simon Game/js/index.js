var simonValue = [];
var inputValue = [];
var acceptInput = false;
var counter = 0;
var level = 1;
var maxCountValue = 21;
var timerValue = 1000;
var isGameInitialized = false;
var isStrict = false;
var gameLevel = 0;
var startBtn;
var startCheckbox;
var arc,info,levelElm;
var audio1,audio2,audio3,audio4;
var outerCircle;
var timer,timer2,timer3,timer4;

window.onload = function() {

  startBtn = document.querySelector('#start');
  startCheckbox = document.querySelector('#start-checkbox');
  arc = document.querySelectorAll('.arc');
  info = document.querySelector('#info');
  levelElm = document.querySelector('#counter');
  outerCircle = document.querySelector('.outer-circle');

  audio0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  
  startBtn.addEventListener('click', startGame);
  startCheckbox.addEventListener('click', initGame);
  for(var i=0;i<arc.length;i++){
    arc[i].addEventListener('click',arcClicked,false);
  }
  updateInfo('Welcome ')
  updateLevel('--');

}


function initGame() {
  // to initialize the game variables and start game when clicked on start button
  if (startCheckbox.checked) {
    isGameInitialized = true;
  } else {
    isGameInitialized = false;
    resetData();
  }
}
function resetData(){
  if(timer){
    clearTimeout(timer);
    timer = null;
  }
  if(timer2){
    clearTimeout(timer2);
    timer2 = null;
  }
   if(timer3){
    clearTimeout(timer3);
    timer3 = null;
  }
   if(timer4){
    clearTimeout(timer4);
    timer4 = null;
  }
  for(var i =0;i<arc.length;i++){
    arc[i].classList.remove('highlight');
  }
  simonValue = [];
  counter = 0;
  isStrict = false;
  gameLevel = 0;
  level = 1;
  updateLevel('--');
  updateInfo('Welcome');
}
function startGame() {
  // to actually start the game.
  if (isGameInitialized) {
    resetData();
    updateLevel(level);
    maintainGame();
  }
}

function maintainGame() {
  simonValue.push(findRandomNumber());
  counter = simonValue.length;
  showOutput();
}

function showOutput() {
    var x = counter,i=0;
    highlightOutput(i);
}

function highlightOutput(i) {
    updateInfo('Loading...');
  timer = setTimeout(function() {
    if(counter < maxCountValue){
      
      arc[simonValue[i]].classList += ' highlight';
      var audioStr = 'audio'+ simonValue[i];
      (this[audioStr]).play()
      removeHightlightedClass(i);  

      if (i == counter - 1) {
      takeInput(i);
      }
      else{
        highlightOutput(i+1); 
      }
    }
    else{
      alert('you won!!!')
      updateLevel('--');
      updateInfo('Yayy!!! You won!!!');
    }
  }, timerValue);
}

function removeHightlightedClass(i) {
  
 timer2 = setTimeout(function() {
    arc[simonValue[i]].classList.remove('highlight');
  }, timerValue-250);
}

function takeInput(i) {
    
  initArcsData();
  timer3 = setTimeout(function(){
    updateInfo('Listening...');
  },timerValue);
  timer4 = setTimeout(function(){
    if(compareArray(inputValue,simonValue)){
      maintainGame();
      level++;
      updateLevel(level);
      updateInfo('Correct Input');
    }
    else{
      showOutput();
      updateInfo('Wrong Input!!!');
    }
    acceptInput = false;
  },(counter+1)*1000);
}
function arcClicked(){
  if(acceptInput){
    var id = this.id -1;
    inputValue.push(id);
    (function(id){
      arc[id].classList += ' highlight'
      var audioStr = 'audio'+ id;
      (this[audioStr]).play();
      setTimeout(function(){
        arc[id].classList.remove('highlight');
      },250);
    })(id);
  }
}
function initArcsData(){
  inputValue = [];
  acceptInput = true;
}
// Util functions
function findRandomNumber() {
  // returns random number b/w 0 and 4 (4 exclusive)
  return Math.floor(Math.random() * 4);
}
function updateInfo(msg){
  info.innerHTML = msg;
}
function updateLevel(level){
  if(counter < maxCountValue)
    levelElm.value = level;
}
function compareArray(a1,a2){
  a1 = a1.slice(0,a2.length);
  return JSON.stringify(a1) === JSON.stringify(a2);
}
function failureAnimation(){
 outerCircle.classList += ' failure-animation'
  setTimeout(function(){
    outerCircle.classList.remove('failure-animation');
  },200)
}