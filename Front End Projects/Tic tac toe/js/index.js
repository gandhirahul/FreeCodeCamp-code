var userValue = 'O';
var systemValue = 'X';
var winningSol = [
  [0,1, 2],
  [3,4, 5],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [7, 5, 3]
];
// values defined for the game.
var isUserWinner = false; 
var isSystemWinner = false;
var gameFinished = false;
var shouldRestart = false;
var board = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
// on load function
window.onload = function() {

  document.querySelector('#restart').addEventListener('click',restart);
  
  for(var i=0;i<3 ;i++){
    for(var j=0;j<3 ;j++){
      (function(i,j){
        var tds=document.querySelector('#btn'+i+j);
        tds.addEventListener('click',function(){
          if(shouldRestart){
            shouldRestart = false;
            restart();
          }
          if(!board[i][j]){
            board[i][j] = userValue;
            document.querySelector('#btn'+i+j).innerHTML = userValue ;
            if(checkWinner()){
              // checking if the user is winner 
              return ;
            }
            else{
              findSystemMove();
              if(checkWinner()){
                //checking if system won by findSystemMove
                return ;
              };  
            }
          }
        });
      })(i,j)
     }
  }
}
function checkWinner(){
  
  for(var i=0;i<3 ;i++){
    if(areEqual(board[i][0],board[i][1],board[i][2],userValue)){
      isUserWinner = true;
    } 
    else if(areEqual(board[0][i],board[1][i],board[2][i],userValue)){
      isUserWinner = true;
    }
    else if(areEqual(board[i][0],board[i][1],board[i][2],systemValue)){
      isSystemWinner = true;
    }
    else if(areEqual(board[0][i],board[1][i],board[2][i],systemValue)){
      isSystemWinner = true;
    }
   }
  if(areEqual(board[0][0],board[1][1],board[2][2],userValue) || areEqual(board[0][2],board[1][1],board[2][0],userValue)){
      isUserWinner = true;
  }
  else if(areEqual(board[0][0],board[1][1],board[2][2],systemValue) || areEqual(board[0][2],board[1][1],board[2][0],systemValue) ){
      isSystemWinner = true;
  }
  if(isUserWinner || isSystemWinner){
    isUserWinner ? showMessage('You won !!!') : isSystemWinner ? showMessage('You lose !!!') : ''; 
  }
  return isUserWinner || isSystemWinner;
}

function findSystemMove(){
  var i , j;
  if(!board[1][1]){
    //Giving preference to the center value
    board[1][1] = systemValue;
    i=j=1;
    document.querySelector('#btn'+i+j).innerHTML = systemValue ;
    return ;
  }
  if(findNextMove(systemValue)){
    return ;
  }
  if(findNextMove(userValue)){
    return;
  }
  if(checkRemainingBox()){
    return ;
  }
  else{
    showMessage('match draw!!!')
  }
}

function applyWinChanges(i,j){
  document.querySelector('#btn'+i+j).innerHTML = systemValue ;
  board[i][j] = systemValue;
  return true;
}

function findNextMove(custom_value){
  var i,j,flag;
  for(var k=0;k<3 ;k++){
    if(arePartialEqual(board[k][0],board[k][1],board[k][2],custom_value)){
      flag = false;
      if(board[k][0] == null){
        flag = true;
        i=k;j=0;
      }else if(board[k][1] == null){
        flag = true;
        i=k;j=1;
      }
      else if(board[k][2] == null){
        flag = true;
        i=k;j=2;
      }
      if(flag){
        return (flag = false) || applyWinChanges(i,j);
      }
    } 
    else if(arePartialEqual(board[0][k],board[1][k],board[2][k],custom_value)){
      flag = false;
      if(board[0][k] == null){
        flag = true;
        i=0;j=k;
      }else if(board[1][k] == null){
        flag = true;
        i=1;j=k;
      }
      else if(board[2][k] == null){
        flag = true;
        i=2;j=k;
      }
      if(flag){
        return (flag = false) || applyWinChanges(i,j);
      }
    }
  }
  if(arePartialEqual(board[0][0],board[1][1],board[2][2],custom_value)){
      flag = false;
       if(board[0][0] == null){
          flag = true;
          i=0;j=0;
        }
      else if(board[1][1] == null){
          flag = true;
          i=0;j=1;
      }
      else if(board[2][2] == null){
        flag = true;
        i=2;j=2;
      }
      if(flag){
        return (flag = false) || applyWinChanges(i,j);
      }
  }
  else if(arePartialEqual(board[0][2],board[1][1],board[2][0],custom_value) ){
      flag = false;
      if(board[0][2] == null){
        flag = true;
        i=0;j=2;
      }else if(board[1][1] == null){
        flag = true;
        i=j=1;
      }
      else if(board[2][0] == null){
        flag = true;
        i=2;j=0;
      }
      if(flag){
        return (flag = false) || applyWinChanges(i,j);
      }
  }
  return false;
}

function areEqual(){
  var len = arguments.length;
  for(var i=1;i<len;i++){
    if(arguments[i] == null || arguments[i] != arguments[i-1]){
      return false;
    }
  }
  return true;
}

function arePartialEqual(){
  var valueCompare = arguments[3];
    if( (arguments[0] == arguments[1] && arguments[0] == valueCompare )  || (arguments[1] == arguments[2] && arguments[1] == valueCompare ) || (arguments[0] == arguments[2] && arguments[2] == valueCompare ) ){
      return true;
    }
    else {
      return false;
    }
}
  
function restart(){
  shouldRestart = false;
  isUserWinner = false; 
  isSystemWinner = false;
  gameFinished = false;
  board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ];
  for(var i=0;i<3 ;i++){
    for(var j=0;j<3 ;j++){
      document.querySelector('#btn'+i+j).innerHTML = null;    
    }
  }
  document.querySelector('.info-section').innerHTML = 'Your Turn !!!';    
  document.querySelector('.info-section').style = 'color:black';
}

function checkRemainingBox(){
  var tempArray = pushArray([0,0],[0,1],[0,2],[1,1],[1,2],[1,0],[2,0],[2,1],[2,2]), i,j;
  if(tempArray.length){
    var indexValue = Math.floor(Math.random() * tempArray.length);
    i=tempArray[indexValue][0];
    j=tempArray[indexValue][1];
    board[i][j] = systemValue;
    document.querySelector('#btn'+i+j).innerHTML = systemValue ;
    return true;
  }
  return false;
}

function pushArray(){
  var len = arguments.length,tempArray=[];
  for(var i = 0; i< len ; i++){
    j = arguments[i][0];
    k = arguments[i][1];
    if(!board[j][k])
      tempArray.push(arguments[i]);
  }
  return tempArray;
}

function showMessage(msg){
  shouldRestart = true;
  document.querySelector('.info-section').innerHTML = msg;    
  document.querySelector('.info-section').style = 'color:red';
  
  document.querySelector('#end-msg').innerHTML = msg;    
  document.querySelector('.show-game-end').style = 'display:block !important';
  document.querySelector('.show-game-end').style.cssText += 'animation : gameend 2s linear;';
  
  setTimeout(function(){
    document.querySelector('.show-game-end').style = 'display:none';
  },2000)
}