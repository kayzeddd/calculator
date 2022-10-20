//Global variables
let displayValue = "";
let saveNumbers = [];
let useOperator = "";
let answer = "";
let done = false;

//number display events
const displayText = document.querySelector(".text");
const calculations = document.querySelector(".calcs");
const numbers = document.querySelectorAll(".numberBtn");
numbers.forEach(number => number.addEventListener("click", displayNumber));

function displayNumber(e){
    let num = e.target.textContent;
    if (done == true){
        done = false;
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

function addDot(e){
    if (numDot == 0 && displayValue.length > 0){
        displayValue = displayValue + ".";
        displayText.textContent = displayValue;
        numDot += 1;    
    }   
}

//backspace
const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", deleteLast);

function deleteLast(){
    if (displayValue.slice(-1) == "."){
        displayValue = displayValue.slice(0,-1);
        numDot = 0;
    }
    else{
    displayValue = displayValue.slice(0,-1);
    displayText.textContent = displayValue;}
}

//clear
const clearBtn = document.querySelector(".clearBtn");
clearBtn.addEventListener("click", clear);

function clear(){
    displayValue = "";
    displayText.textContent = displayValue;
    numDot = 0;
    saveNumbers = [];
}


//operator events
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", addition);

function addition(){
    if (saveNumbers.length >= 1){
        saveNumbers.push(+displayValue);
        answer = operate(saveNumbers[0], useOperator, saveNumbers[1]);
        displayText.textContent = answer;
        saveNumbers = [];
        saveNumbers.push(answer);
        useOperator = "+";
        displayValue = "";
        numDot = 0;
    }
    if (saveNumbers.length < 1){
        saveNumbers.push(+displayValue);
        useOperator = "+";
        displayValue = "";
        displayText.textContent = displayValue;
        numDot = 0;
    }
}

const subtractBtn = document.querySelector(".subtractBtn");
subtractBtn.addEventListener("click", subtraction)

function subtraction(){
    if (saveNumbers.length >= 1){
        saveNumbers.push(+displayValue);
        answer = operate(saveNumbers[0], useOperator, saveNumbers[1]);
        displayText.textContent = answer;
        saveNumbers = [];
        saveNumbers.push(answer);
        useOperator = "–";
        displayValue = "";
        numDot = 0;
    }
    if (saveNumbers.length < 1){
        saveNumbers.push(+displayValue);
        useOperator = "–";
        displayValue = "";
        displayText.textContent = displayValue;
        numDot = 0;
    }
}

const multiplyBtn = document.querySelector(".multiplyBtn");
multiplyBtn.addEventListener("click", multiplication);

function multiplication() {
    if (saveNumbers.length >= 1){
        saveNumbers.push(+displayValue);
        answer = operate(saveNumbers[0], useOperator, saveNumbers[1]);
        displayText.textContent = answer;
        saveNumbers = [];
        saveNumbers.push(answer);
        useOperator = "×";
        displayValue = "";
        numDot = 0;
    }
    if (saveNumbers.length < 1){
        saveNumbers.push(+displayValue);
        useOperator = "×";
        displayValue = "";
        numDot = 0;
    }
}

const divideBtn = document.querySelector(".divideBtn");
divideBtn.addEventListener("click",division)

function division() {
    if (saveNumbers.length >= 1){
        saveNumbers.push(+displayValue);
        answer = operate(saveNumbers[0], useOperator, saveNumbers[1]);
        displayText.textContent = answer;
        saveNumbers = [];
        saveNumbers.push(answer);
        useOperator = "÷";
        displayValue = "";
        numDot = 0;
    }
    if (saveNumbers.length < 1){
        saveNumbers.push(+displayValue);
        useOperator = "÷";
        displayValue = "";
        numDot = 0;
    }
}

//equalbtn event
const equalBtn = document.querySelector(".equal"); 
equalBtn.addEventListener("click", doOperation)

function doOperation(){
    if (saveNumbers.length >= 1){
        saveNumbers.push(+displayValue);
        answer = operate(saveNumbers[0], useOperator, saveNumbers[1]);
        displayValue = answer;
        displayText.textContent = answer;
        saveNumbers = [];
        numDot = 0;
        done = true;
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
    if (b == 0){return "cheeky"};
    return (a / b);
}

function operate(a, operator, b) {
    if (operator == "+"){return add(a,b)};
    if (operator == "–"){return subtract(a,b)};
    if(operator == "×"){return multiply(a,b)};
    if(operator == "÷"){return divide(a,b)};
}