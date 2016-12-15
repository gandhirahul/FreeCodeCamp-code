var bufferValue ='',outputValue=0,equalClicked = false,tempValue = '';

window.onload= function(){
  var items = document.getElementsByTagName("button");
  for (var i = 0; i< items.length ; i++){
     items[i].addEventListener('click',manageClick);
  }
  setResult();
}

function manageClick(e){
  var value = e.target.getAttribute("value");
  if(/[0-9\.\*\/\+\-]/.test(value)){
    if(/[\.]/.test(value) && /[\.]/.test(bufferValue)){
     return;
    }
    tempValue = bufferValue.toString();
    if(/[\*\/\+\-]/.test(value) && (tempValue[tempValue.length -1] === value)){
       return;
    }
    if(equalClicked){
      if(/[\*\/\+\-]/.test(value)){
        if(bufferValue === '' ){
            bufferValue = '';
            outputValue = 0;
        }
        else{
          bufferValue += value;
        }
      }
      else if(/[0-9\.]/.test(value)){
         if(/[\.]/.test(value) && /[\.]/.test(bufferValue)){
         return;
        }
        bufferValue = value;
      }
      equalClicked = false;
    }
    else if(bufferValue !== '0'){
      if(bufferValue === '' && /[\*\/\+\-]/.test(value)){
        return ;
      }
      else {
        bufferValue += value;   
      }
    } 
    else if(bufferValue === '0' && value === '.' ){
       bufferValue += value;
    }    
  }
  else if(value === '='){
    equalClicked = true;
    if(bufferValue !== ''){
      bufferValue = outputValue = eval(bufferValue); 
    }
    if(outputValue %1 != 0){
      //checking for decimals
      bufferValue = outputValue = parseFloat(outputValue).toFixed(2);
    }
    if(isNaN(outputValue) || outputValue.toString().indexOf('Infinity') > -1){
      //Taking care for Infinity and -Infinity
      outputValue = 'Math Error';
      bufferValue ='';
    } 
    if(Math.abs(outputValue) > Number.MAX_SAFE_INTEGER ){
      outputValue = 'Maximum Value reached';
      bufferValue ='';
    }
  }
  else if(value === 'del'){
    bufferValue ='';
    outputValue = 0;
  }
  resultDiv.innerHTML = outputValue;
  subResultDiv.innerHTML = bufferValue;  
}

function setResult(){
  resultDiv = document.getElementById('result');
  subResultDiv = document.getElementById('sub-result');
}