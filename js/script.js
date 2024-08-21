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

const buttonsClicked = [];

let cursorPosition = null

//Adicionando listeners

screen.addEventListener('click',checkCursorPosition)
screen.addEventListener('keydown',checkCursorPosition)

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
    buttonsClicked.splice(0)
    screen.value = 0
}

function deleteLastCharacter() {
    buttonsClicked.splice(buttonsClicked.length -1)
}

function identifyExpression() {
    let stringExpression = ''
    let buttonsClickedCopy = [...buttonsClicked]

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

//Falta organizar código
//Validações nos valores digitados
//Problema no focus
function storeValueAndDisplayIt(value) {
    let valueAddedPosition = null

    if (cursorPosition === null) {
        valueAddedPosition = buttonsClicked.length + 1
    } else {
        valueAddedPosition = cursorPosition
    }

    buttonsClicked.splice(valueAddedPosition,0,value)
    displayOnScreen(arrayToString(buttonsClicked))
}

function checkCursorPosition(e) {
    if (e.type == 'click') {
        cursorPosition = screen.selectionStart
    } else if (e.type == 'keydown') {
        if (e.keyCode == 37 || e.keyCode == 8) {
            cursorPosition = screen.selectionStart - 1
        } else if (e.keyCode == 39) {
            cursorPosition = screen.selectionStart + 1
        }
    }
}

function generalFunction(value) {
    switch (value) {
        case 'clear':
            clearAll()
            break

        case 'deleteCharacter':
            deleteLastCharacter()
            displayOnScreen(arrayToString(buttonsClicked))
            break
        
        case '=':
            solveExpression(identifyExpression())
            break
        
        default:
            switch (typeof value) {
                case 'number':
                    if (buttonsClicked.length == 0) {
                        screen.value = '' //Remove o '0' da tela para adicionar o novo valor
                        storeValueAndDisplayIt(value)
                    } else {
                        storeValueAndDisplayIt(value)
                    }
                    
                    break
                case 'string':
                    if (buttonsClicked.length == 0) {
                        buttonsClicked.push(0)
                        storeValueAndDisplayIt(value)
                    } else if (typeof buttonsClicked[buttonsClicked.length - 1] === 'string') {
                        alert('formato inválido')
                    } else {
                        storeValueAndDisplayIt(value)
                    }
                    break
            }

    }
  
}
