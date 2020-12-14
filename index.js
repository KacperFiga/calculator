class Calculator {
constructor(prevPanel,currentPanel){
this.prevPanel = prevPanel;
this.currentPanel = currentPanel;

this.currentOperand = "";
this.prevOperand = "";

this.operator = null;

}

delete = () =>{
this.currentOperand = this.currentOperand.slice(0,-1);
}

clear = () =>{
this.currentOperand = "";
this.prevOperand = "";
this.operator = null;
}

choseOperation = (operation) =>{
this.operator = operation;
}

calculate = (operator) =>{
    let result = 0;

    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if(!isNaN(prev+current)){

    switch(operator){
    case "+": {
        result = prev+current;
        break;
    }
    case "-": {
        result = prev-current;
        break;
    }
    case "x": {
        result = prev*current;
        break;
    }
    case "/": {
        if(current==0){
            alert(`Don't divide by 0!`)
            return;
        }
        result = prev/current;
        break;
    }
    default:
        throw new Error("Ooops, something wrong ;c")
    }
    this.prevOperand = result;
    }else{
        if(!this.prevOperand) this.prevOperand = this.currentOperand;
    }
}

updateValue = (number)=>{
if(number==="." && this.currentOperand.includes('.')) return;
this.currentOperand += number;
}

updateDisplay = () =>{
    this.currentPanel.textContent = this.currentOperand;
    if(this.operator) this.prevPanel.textContent = `${this.prevOperand} ${this.operator}`;
        else  this.prevPanel.textContent = this.prevOperand;
}}

const numberBtns = document.querySelectorAll('[data-name=number]');
const functionalBtns = document.querySelectorAll("[data-name=functionalKey]");

const delBtn = document.querySelector("[data-name=del]");
const acBtn = document.querySelector("[data-name=ac]");

const equalBtn = document.querySelector('[data-name=functionalKey-equal]')


const prevPanel = document.querySelector(".calculator__panel__prev");
const currentPanel = document.querySelector(".calculator__panel__current");

const calculator = new Calculator(prevPanel,currentPanel);

numberBtns.forEach(button =>{
    button.addEventListener('click',(e)=>{
        calculator.updateValue(e.target.textContent);
        calculator.updateDisplay()
    })
})

acBtn.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
})

delBtn.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})

functionalBtns.forEach(btn=>{
btn.addEventListener('click',(e)=>{
calculator.choseOperation(e.target.textContent);
calculator.calculate(calculator.operator);
calculator.currentOperand = "";
calculator.updateDisplay();
})
})

equalBtn.addEventListener('click',()=>{
    calculator.calculate(calculator.operator);
    calculator.operator = '';
    calculator.currentOperand = '';
    calculator.updateDisplay();
})