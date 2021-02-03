var value1 = '';
var value2 = '';
var operator = '';
var result = '';

const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');

numbers.forEach(num =>{
    num.addEventListener('click', () => {
        value1 += num.innerText;
        showResult(value1);
    });
});

operators.forEach(opr => {
    opr.addEventListener('click', () => {
        value2 = value1;
        value1 = '';
        operator = opr.innerText;
    })
})

function calculate(){
    switch(operator) {
        case '+' :
            result = Number(value1) + Number(value2);
            break;
        case '-' :
            result = Number(value1) - Number(value2);
            break;
        case '×' :
            result = Number(value1) + Number(value2);
            break;
        case '÷' :
            result = Number(value1) + Number(value2);
            break;
    }
    showResult();
}

function showResult(dataValue){
   const lower = document.querySelector('.lower-text');
   console.log(lower);
   lower.innerText = dataValue;
}

function sqaure(){

}

function sqrt(){
    if(value1){
        
    }
}
