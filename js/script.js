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

//Adicionando listeners

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

function displayOnScreen(value) {
  screen.innerHTML += value;
}

function clearAll() {
    buttonsClicked.splice(0)
    screen.innerHTML = 0
}


function generalFunction(value) {
    switch (value) {
        case 'clear':
            clearAll()
            break

        case 'deleteCharacter':
        
            break
        
        case '=':

            break
        
        default:
            if (typeof value == 'number') {
                if (buttonsClicked.length == 0) {
                    buttonsClicked.push(value)
                    screen.innerHTML = '' //Remove o '0' da tela para adicionar o novo valor
                    displayOnScreen(value)
                } else {
                    buttonsClicked.push(value)
                    displayOnScreen(value)
                }
            }  else if (typeof value == 'string') {
                if (buttonsClicked.length == 0) {
                    buttonsClicked.push(0)
                    buttonsClicked.push(value)
                    displayOnScreen(value)
                } else {
                    buttonsClicked.push(value)
                    displayOnScreen(value)
                }
            }

    }
  
}
