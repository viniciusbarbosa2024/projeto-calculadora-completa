const screen = document.getElementById("screen");
const clear = document.getElementById("clear");
const deleteCharacter = document.getElementById("deleteCharacter");
const percentage = document.getElementById("percentage");
const division = document.getElementById("division");
const multiplication = document.getElementById("multiplication");
const subtraction = document.getElementById("subtraction");
const addition = document.getElementById("addition");
const comma = document.getElementById("comma");
const equals = document.getElementById("equals");

//Array que conterá todos os botões de números
const buttonNumber = Array(10);
buttonNumber.fill(null);

//Adicionando os botões de números no array
buttonNumber.forEach((element, index) => {
  buttonNumber[index] = document.getElementById(`number${index}`);
});

const ExpressionArray = [];

let cursorPosition = ExpressionArray.length

//Adicionando listeners

screen.addEventListener('click',checkCursorPosition)

screen.addEventListener('keydown',(e) => {
    e.preventDefault() //Impedir manipulação da expressão usando o teclado
})

buttonNumber.forEach((element, index) => {
  buttonNumber[index].addEventListener("click", () =>
    generalFunction(Number(index))
  );
});

clear.addEventListener('click',() => generalFunction('clear'))
deleteCharacter.addEventListener('click',() => generalFunction('deleteCharacter'))
percentage.addEventListener('click',() => generalFunction('%'))
division.addEventListener('click',() => generalFunction('/'))
multiplication.addEventListener('click',() => generalFunction('x'))
subtraction.addEventListener('click',() => generalFunction('-'))
addition.addEventListener('click',() => generalFunction('+'))
comma.addEventListener('click',() => generalFunction(','))
equals.addEventListener('click',() => generalFunction('='))

function displayOnScreen(string) {
    screen.value = string
}

function clearAll() {
    ExpressionArray.splice(0)
    screen.value = 0
}

//Renomear esta função
function deleteLastCharacter() {
    if (cursorPosition === null) {
        ExpressionArray.pop()
    } else {
        ExpressionArray.splice(cursorPosition -1,1)
    }
}

function identifyExpression() {
    let stringExpression = ''
    let buttonsClickedCopy = [...ExpressionArray]

    buttonsClickedCopy.forEach((element,index) => {
        if (element == 'x') {
            buttonsClickedCopy[index] = '*'
        } else if (element == ',') {
            buttonsClickedCopy[index] = '.'
        } else if (element == '%') {
            buttonsClickedCopy[index] = '/100*'
        }

        stringExpression += buttonsClickedCopy[index]
    })

    return stringExpression
}

function solveExpression(expression) {
    let result = parseFloat(eval(expression).toFixed(10))
    displayOnScreen(result)
}

function arrayToString(array) {
    let string = ''

    array.forEach((element) => {
        string += String(element)
    })

    return string
}

//Melhorar código
//Renomear função
function storeValueAndDisplayIt(value) {
    ExpressionArray.splice(cursorPosition,0,value)
    displayOnScreen(arrayToString(ExpressionArray))

    screen.focus()
    screen.setSelectionRange(cursorPosition+1,cursorPosition+1)
    cursorPosition++
}

function checkCursorPosition(e) {
    cursorPosition = screen.selectionStart 
}

function generalFunction(value) {
    switch (value) {
        case 'clear':
            clearAll()
            break

        case 'deleteCharacter':
            deleteLastCharacter()
            displayOnScreen(arrayToString(ExpressionArray))
            
            screen.focus()
            screen.setSelectionRange(cursorPosition-1,cursorPosition-1)
            cursorPosition--
            break
        
        case '=':
            solveExpression(identifyExpression())
            break
        
        default:
            switch (typeof value) {
                case 'number':
                    if (ExpressionArray.length == 0) {
                        screen.value = '' //Remove o '0' da tela para adicionar o novo valor
                        storeValueAndDisplayIt(value)
                    } else {
                        storeValueAndDisplayIt(value)
                    }
                    
                    break
                case 'string':
                    if (ExpressionArray.length == 0) {
                        ExpressionArray.push(0)
                        storeValueAndDisplayIt(value)
                    } else if (typeof ExpressionArray[ExpressionArray.length - 1] === 'string') {
                        alert('formato inválido')
                    } else {
                        storeValueAndDisplayIt(value)
                    }
                    break
            }

    }
  
}
