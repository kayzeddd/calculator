//Global variables
let displayValue = "";
let saveNumbers = [];
let useOperator = "";
let answer = "";
let usedEqual = false;
let selectedOperator = "";

//number display events
const displayText = document.querySelector(".text");
const calculations = document.querySelector(".calcs");
const numbers = document.querySelectorAll(".numberBtn");
numbers.forEach(number => number.addEventListener("click", displayNumber));

function displayNumber(e){
    let num = e.target.textContent;
    if (usedEqual == true){
        usedEqual = false;
        displayValue = "";
        displayValue = `${displayValue}` + `${num}`;
        displayText.textContent = displayValue;
    }
    else{
    displayValue = `${displayValue}` + `${num}`;
    displayText.textContent = displayValue;
}
}

let numDot = 0;
const dot = document.querySelector(".dotBtn");
dot.addEventListener("click", addDot)

function addDot(){
    if (numDot == 0 && displayValue.length > 0){
        displayValue = displayValue + ".";
        displayText.textContent = displayValue;
        numDot += 1;    
    }   
}

let numNegative = 0;
const negative = document.querySelector(".negativeBtn");
negative.addEventListener("click", addNegative)

function addNegative(){
    if (numNegative == 0 && displayValue.length == 0 || usedEqual == true){
        displayValue = "-";
        displayText.textContent = displayValue;
        numNegative += 1;  
        usedEqual = false;  
    }  
}

//backspace
const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", deleteLast);

function deleteLast(){
    if (displayValue.slice(-1) == "."){
        displayValue = displayValue.slice(0,-1);
        displayText.textContent = displayValue;
        numDot = 0;
    }
    if (displayValue.slice(-1) == "-"){
        displayValue = displayValue.slice(0,-1);
        displayText.textContent = displayValue;
        numNegative = 0;
    }
    else{
    displayValue = displayValue.slice(0,-1);
    displayText.textContent = displayValue;}
}

//clear
const clearBtn = document.querySelector(".clearBtn");
clearBtn.addEventListener("click", clear);

function clear(e){
    displayValue = "";
    displayText.textContent = displayValue;
    calculations.textContent = "";
    numDot = 0;
    numNegative = 0;
    saveNumbers = [];
    styleChange(e);
}


//operator events
const operators = document.querySelectorAll(".operator");
operators.forEach(operator => operator.addEventListener("click", operation));

function operation(e){
    selectedOperator = e.target.textContent;
    if (displayValue == "") {
        useOperator = selectedOperator;
        return
    }
    if (saveNumbers.length >= 1){
        calculations.textContent += `${useOperator} ${displayValue} `
        saveNumbers.push(+displayValue);
        answer = operate(saveNumbers[0], useOperator, saveNumbers[1]);
        displayText.textContent = answer;
        saveNumbers = [];
        saveNumbers.push(answer);
        useOperator = selectedOperator;
        displayValue = "";
        numDot = 0;
        numNegative = 0;
    }
    if (saveNumbers.length < 1){
        calculations.textContent = "";
        calculations.textContent += `${displayValue} `
        saveNumbers.push(+displayValue);
        useOperator = selectedOperator;
        displayValue = "";
        displayText.textContent = displayValue;
        numDot = 0;
        numNegative = 0;
    }
}

const addBtn = document.querySelector("#addBtn");
const subtractBtn = document.querySelector("#subtractBtn");
const multiplyBtn = document.querySelector("#multiplyBtn");
const divideBtn = document.querySelector("#divideBtn");

const operatorArray = [addBtn, subtractBtn, multiplyBtn, divideBtn];

operatorArray.forEach(operator => operator.addEventListener("click", styleChange))

function styleChange(e){
    const symbol = e.target.textContent;
    for (let i = 0; i < operatorArray.length; i++){
        if (symbol == operatorArray[i].textContent){
            operatorArray[i].classList.add("lightUp");
        }
        else{
            operatorArray[i].classList.remove("lightUp");
        }
    }
}


//equalbtn event
const equalBtn = document.querySelector(".equal"); 
equalBtn.addEventListener("click", doOperation)

function doOperation(e){
    if (displayValue == "") {return}
    if (saveNumbers.length >= 1){
        calculations.textContent += `${useOperator} ${displayValue}`
        saveNumbers.push(+displayValue);
        answer = operate(saveNumbers[0], useOperator, saveNumbers[1]);
        displayValue = answer;
        displayText.textContent = answer;
        saveNumbers = [];
        numDot = 0;
        numNegative = 0;
        usedEqual = true;
        styleChange(e);
    }
}


//Calculator funcs
function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    let a2 = a * 1000000000;
    let b2 = b * 1000000000;
    return (a2 - b2) / 1000000000;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b == ""){return};
    if (b === 0){return 0};
    let div = (a / b).toString();
    if (div.split(".")[1].length > 10){
        return (a / b).toFixed(10);
    }
    else {
        return (a/b);
    }
    }

function operate(a, operator, b) {
    if (operator == "+"){return add(a,b)};
    if (operator == "–"){return subtract(a,b)};
    if (operator == "×"){return multiply(a,b)};
    if (operator == "÷"){return divide(a,b)};
}