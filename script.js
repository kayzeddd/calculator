//Global variables
let displayValue = "";
let saveNumbers = [];
let useOperator = "";
let answer = "";
let usedEqual = false;
let selectedOperator = "";
let numDot = 0;
let numNegative = 0;

//number display events
const displayText = document.querySelector(".text");
const calculations = document.querySelector(".calcs");
const numbers = document.querySelectorAll(".numberBtn");
numbers.forEach(number => number.addEventListener("click", e => displayNumber(e, 1)));

function displayNumber(e, n){
    let num;
    if (n == 1){num = e.target.textContent;}
    if (n == 2){num = e.key;}
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

// '.' button event
const dot = document.querySelector(".dotBtn");
dot.addEventListener("click", addDot)

function addDot(){
    if (numDot == 0 && displayValue.length > 0){
        displayValue = displayValue + ".";
        displayText.textContent = displayValue;
        numDot += 1;    
    }   

}//'(-)' button event
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

//keyboard events
window.addEventListener("keydown", keyDisplay);
const keyArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

function keyDisplay(e) {
    if (keyArray.includes(e.key)){
        displayNumber(e, 2);
    }
    if (e.key == "."){
        addDot();
    }
    if (e.key == "Backspace"){
        deleteLast();
    }
    if (e.key == "-" && displayValue === ""){
        addNegative();
    }
    if (e.key == "Enter"){
        doOperation(e);
    }
}

window.addEventListener("keydown", keyOperator);

function keyOperator(e) {
    if (e.shiftKey) {
        if (e.key == "+"){
            operation(e, "+");
            styleChange(1, "+")
        }
        if (e.key == "*"){
            operation(e, "×");
            styleChange(1, "×")
        }
    }
    if (e.key == "/"){
        operation(e, "÷");
        styleChange(1, "÷")
    }
    if (e.key == "-" && isNaN(+displayValue) == false){
        operation(e, "–");
        styleChange(1, "–")
    }
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
    answer = "";
    usedEqual = false;
    styleChange(e, 2);
}

window.addEventListener("keydown", (e) => {
    if (e.key == "c") {
        clear(e)
    }
})

//operator events


const operators = document.querySelectorAll(".operator");
operators.forEach(operator => operator.addEventListener("click", (e) => operation(e, 1)));

function operation(e, n){
    if (n == 1){selectedOperator = e.target.textContent;}
    else {selectedOperator = n}
    if (displayValue === "") {
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
const operatorSymbols = 
operatorArray.forEach(operator => operator.addEventListener("click", (e) => styleChange(e, 1)))

function styleChange(e, n){
    let symbol;
    if (e == 1){
        if (saveNumbers.length > 0) {console.log("style3");symbol = n;}
        else {return}
    }
    if (n == 1){
        if (saveNumbers.length > 0) {symbol = e.target.textContent; }
        else {return}
    }
    if (n == 2) {symbol = ""};
    for (let i = 0; i < operatorArray.length; i++){
        if (symbol === operatorArray[i].textContent){
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
    if (displayValue === "") {return}
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
        styleChange(e, 2);
    }
}

//Save calculations button
const saveBtn = document.querySelector(".saveBtn");
saveBtn.addEventListener("click", save);
const saveDiv = document.querySelector(".saveDiv");

window.addEventListener("keyup", (e) => {
    if (e.key == "s"){
        save();
    }
})

function save(){
    if (usedEqual == true){
        const newDiv = document.createElement("div");
        newDiv.classList.add("chalkText")
        newDiv.textContent = `${calculations.textContent} = ${displayText.textContent}`
        saveDiv.appendChild(newDiv)
    }
}

//Clear save button
const clearSaveBtn = document.querySelector(".clearText");
clearSaveBtn.addEventListener("click", clearSave)

function clearSave(){
    const innerDiv = Array.from(saveDiv.querySelectorAll(".chalkText"));
    for (let i = 0; i < innerDiv.length; i++){
        saveDiv.removeChild(innerDiv[i]);
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
    if (b == 0){return "0"};    
    let div = (a / b).toString().split(".");
    if (div.length == 1){
        return a / b;
    }
    if (div[1].length > 8){
        return (a / b).toFixed(8);
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


//disable "Enter" and "space" default events
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter" || e.key == " "){
        e.preventDefault();
        return false;
    }
})