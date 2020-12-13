const numberBtns = document.querySelectorAll('[data-name=number]');
const functionalBtns = document.querySelectorAll("[data-name=functionalKey]");
const equalBtn = document.querySelector('[data-name=functionalKey-equal]')


const prevPanel = document.querySelector(".calculator__panel__prev");
const currentPanel = document.querySelector(".calculator__panel__current");

let currentPanelValue = "";
let prevPanelValue = 0;

let operator = null;

const calculate = (e) => {

    const clicked = e.target.textContent;

    if(clicked != "=" && clicked !="ac" && clicked != "del") operator = clicked;

    switch(clicked){
        case 'ac':{
            currentPanelValue = "";
            prevPanelValue = 0;
            operator = null;
            break;
        }
        case "del":{
            currentPanelValue = currentPanelValue.slice(0,currentPanelValue.length-1);
            break;
        }
    }


    const prev = parseFloat(prevPanelValue);

    const curr = parseFloat(currentPanelValue);


    if(!isNaN(prev) && !isNaN(curr)){
    switch(operator){
        case "+":{
            prevPanelValue = prev + curr;
            currentPanelValue = "";
            break;
        }
        case "-":{
        prevPanelValue = prev-curr;
        currentPanelValue = "";
        break;
        }
        case "x":{
            if(prevPanelValue==0) prevPanelValue = currentPanelValue;
            else prevPanelValue *= curr;
            currentPanelValue = "";
            break;
        }
        case "/":{
            if(prevPanelValue==0){
                prevPanelValue = currentPanelValue;
                currentPanelValue = "";
                break;
            } 
            if(currentPanelValue==0){
                operator = null;
                alert(`don't devide by 0!`)
            }
            else prevPanelValue /= curr;
            currentPanelValue = "";
            break;
        }
    }
}

if(clicked == "=") operator = null;

updateDisplay();
}

const updateDisplay = () => {
    currentPanel.textContent = currentPanelValue;
    prevPanel.textContent = prevPanelValue;
    if(operator && operator !='del' && operator!='ac')
    prevPanel.textContent = `${prevPanelValue} ${operator}`;

}

const updateCurrentPanel = (e) =>{
currentPanelValue += e.target.textContent;
updateDisplay();
}

numberBtns.forEach(btn => btn.addEventListener('click',updateCurrentPanel)
);

functionalBtns.forEach(btn=> btn.addEventListener('click',calculate))

equalBtn.addEventListener('click',calculate);