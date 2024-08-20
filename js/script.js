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
percentage.addEventListener('click',() => generalFunction('percentage'))
division.addEventListener('click',() => generalFunction('division'))
multiplication.addEventListener('click',() => generalFunction('multiplication'))
subtraction.addEventListener('click',() => generalFunction('subtraction'))
addition.addEventListener('click',() => generalFunction('addition'))
comma.addEventListener('click',() => generalFunction('comma'))
equals.addEventListener('click',() => generalFunction('equals'))

function displayOnScreen(value) {
  screen.innerHTML += value;
}

function generalFunction(value) {
  buttonsClicked.push(value);

  displayOnScreen(value);
}
