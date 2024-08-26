const screen = document.getElementById("screen");
const clear = document.getElementById("clear");
const deleteCharacter = document.getElementById("deleteCharacter");
const percentage = document.getElementById("percentage");
const division = document.getElementById("division");
const multiplication = document.getElementById("multiplication");
const subtraction = document.getElementById("subtraction");
const addition = document.getElementById("addition");
const parentheses = document.getElementById("parentheses");
const comma = document.getElementById("comma");
const equals = document.getElementById("equals");

//Array que conterá todos os botões de números
const buttonNumber = Array(10);
buttonNumber.fill(null);

//Adicionando os botões de números no array
buttonNumber.forEach((element, index) => {
  buttonNumber[index] = document.getElementById(`number${index}`);
});

const ExpressionArray = [0];

let cursorPosition = ExpressionArray.length;

//Adicionando listeners

document.addEventListener("DOMContentLoaded", displayCursor);

screen.addEventListener("click", checkCursorPosition);

screen.addEventListener("keydown", (e) => {
  e.preventDefault(); //Impedir manipulação da expressão usando o teclado
});

buttonNumber.forEach((element, index) => {
  buttonNumber[index].addEventListener("click", () =>
    generalFunction(Number(index))
  );
});

clear.addEventListener("click", () => generalFunction("clear"));
deleteCharacter.addEventListener("click", () =>
  generalFunction("deleteCharacter")
);
percentage.addEventListener("click", () => generalFunction("%"));
division.addEventListener("click", () => generalFunction("/"));
multiplication.addEventListener("click", () => generalFunction("x"));
subtraction.addEventListener("click", () => generalFunction("-"));
addition.addEventListener("click", () => generalFunction("+"));
parentheses.addEventListener("click", () =>
  generalFunction(openOrCloseParentheses())
);
comma.addEventListener("click", () => generalFunction(","));
equals.addEventListener("click", () => generalFunction("="));

function displayCursor() {
  screen.focus();
  screen.setSelectionRange(cursorPosition, cursorPosition);
}

//Retorna um array com os índices dos parênteses(ou de abertura ou de fechamento,a depender do ParentheseType) que aparecem antes do cursor
function getIndexesParenthesesBeforeTheCursor(ParentheseType) {
    return ParentheseType.filter(
        (element) => element < cursorPosition
      )
}

function characterBeforeThecursorIsAClosingParenthesis() {
    if (characterBeforeCursor() === ')') {
        return true
    } else {
        return false
    }
}

function typeOfCharacterBeforeCursor() {
  return typeof ExpressionArray[cursorPosition - 1]
}

function characterBeforeCursor() {
  return ExpressionArray[cursorPosition - 1]
}

function getIndexesParentheses(type) {
  let IndexesOpeningParentheses = [];
  let IndexesClosingParentheses = [];

  ExpressionArray.forEach((element, index) => {
    if (element === "(") {
      IndexesOpeningParentheses.push(Number(index));
    } else if (element === ")") {
      IndexesClosingParentheses.push(Number(index));
    }
  });

  if (type === 'OpeningParentheses') {
    return IndexesOpeningParentheses
  } else if (type === 'ClosingParentheses') {
    return IndexesClosingParentheses
  }
}

function numberOfParenthesesBeforeTheCursor(type) {
  return getIndexesParenthesesBeforeTheCursor(getIndexesParentheses(type)).length
}


function openOrCloseParentheses() {
    if (
      numberOfParenthesesBeforeTheCursor('OpeningParentheses') ==
      numberOfParenthesesBeforeTheCursor('ClosingParentheses')
    ) {
        
        return '('

    } else if (characterBeforeThecursorIsAClosingParenthesis()) {
        
        return ')'
    
    } else if (typeOfCharacterBeforeCursor() == 'string') {
        return '('
    } else if (typeOfCharacterBeforeCursor() == 'number') {
        return ')'
    }
  }


function displayOnScreen(string) {
  screen.value = string;
}

function clearExpressionArray() {
  ExpressionArray.splice(0);
}

//O reset do valor do cursorPosition faz com que o cursor apareça no final da expressão
function resetCursorPosition() {
  cursorPosition = ExpressionArray.length;
}

function clearAll() {
  clearExpressionArray();

  ExpressionArray.push(0);

  resetCursorPosition();
}

function deleteDesiredCharacter() {
  ExpressionArray.splice(cursorPosition - 1, 1);
}

function identifyExpression() {
  let stringExpression = "";
  let buttonsClickedCopy = [...ExpressionArray];

  buttonsClickedCopy.forEach((element, index) => {
    if (element == "x") {
      buttonsClickedCopy[index] = "*";
    } else if (element == ",") {
      buttonsClickedCopy[index] = ".";
    } else if (element == "%") {
      buttonsClickedCopy[index] = "/100*";
    }

    stringExpression += buttonsClickedCopy[index];
  });

  return stringExpression;
}

function solveExpression(expression) {
  return parseFloat(eval(expression).toFixed(10));
}

function arrayToString(array) {
  let string = "";

  array.forEach((element) => {
    string += String(element);
  });

  return string;
}

function storeValueAndDisplayIt(value) {
  ExpressionArray.splice(cursorPosition, 0, value);

  displayOnScreen(arrayToString(ExpressionArray));

  //updateCursorPositionOnScreen(typeOfModificationInTheExpression)
}

function checkCursorPosition(e) {
  cursorPosition = screen.selectionStart;
}

//Define o updateParameter
function setUpdateParameter(typeOfModificationInTheExpression) {
  switch (typeOfModificationInTheExpression) {
    case "add":
      return 1;
    case "keep":
      return 0;
    case "remove":
      return -1;
  }
}

//Atualiza valor da variável cursorPosition
function updateCursorPositionVariableValue(updateParameter) {
  cursorPosition = cursorPosition + updateParameter;
}

//Posiciona o cursor da tela na posição correta
function positionCursorOnScreen() {
  screen.setSelectionRange(cursorPosition, cursorPosition);
}

//Atualiza a posição do cursor na tela
function updateCursorPositionOnScreen(typeOfModificationInTheExpression) {
  //Esta variável serve para orientar a definição da posição do cursor na tela dependendo do tipo de modificação que ocorreu na expressão (aumento, manutenção ou diminuição do tamanho da expressão)
  let updateParameter = setUpdateParameter(typeOfModificationInTheExpression);

  screen.focus();

  updateCursorPositionVariableValue(updateParameter);

  positionCursorOnScreen();
}

function enableTheUseOfTheResultForNewOperations(result) {
  clearExpressionArray();

  let ResultArrayInString = String(result).split("");

  ResultArrayInString.forEach((element) => {
    //Essas condicionais funcionam porque o result só pode ser um único número real (Ex.: 10,-8,6.32), não podendo ser uma expressão (Ex.: 6-5, 6.35*9.4)

    if (element === ".") {
      //Caso de result ser um número não inteiro
      ExpressionArray.push(",");
    } else if (element === "-") {
      //Caso de result ser um número negativo
      ExpressionArray.push(element);
    } else {
      ExpressionArray.push(Number(element));
    }
  });
}

//Verifica se a expressão está zerada
function checkIfTheExpressionIsZero() {
  if (ExpressionArray.length === 1 && ExpressionArray[0] === 0) {
    return true;
  } else {
    return false;
  }
}

//Melhorar código
//Renomear função
function lastCharacterOfTheExpressionIsAnOperator() {
  if (
    typeOfCharacterBeforeCursor() === "string" &&
    characterBeforeCursor() != ")"
  ) {
    return true;
  } else {
    return false;
  }
}

function valueToBeAddedIsNotParentheses(value) {
  if (value === "(" || value === ")") {
    return false;
  } else {
    return true;
  }
}

function generalFunction(value) {
  switch (value) {
    case "clear":
      clearAll();

      displayOnScreen(arrayToString(ExpressionArray));

      displayCursor();

      break;

    case "deleteCharacter":
      if (ExpressionArray.length === 1) {
        //Evitar que a tela fique vazia
        deleteDesiredCharacter();

        ExpressionArray.push(0);

        displayOnScreen(arrayToString(ExpressionArray));

        displayCursor();
      } else {
        deleteDesiredCharacter();

        displayOnScreen(arrayToString(ExpressionArray));

        updateCursorPositionOnScreen("remove");
      }

      break;

    case "=":
      let result = solveExpression(identifyExpression());

      displayOnScreen(result.toLocaleString("pt-br"));

      enableTheUseOfTheResultForNewOperations(result);

      resetCursorPosition();

      updateCursorPositionOnScreen("keep");

      break;

    default:
      switch (typeof value) {
        case "number":
          if (checkIfTheExpressionIsZero()) {
            clearExpressionArray(); //Remove o '0' da tela para adicionar o novo valor

            storeValueAndDisplayIt(value);

            updateCursorPositionOnScreen("keep");
          } else {
            storeValueAndDisplayIt(value);

            updateCursorPositionOnScreen("add");
          }

          break;
        case "string":
          if (
            lastCharacterOfTheExpressionIsAnOperator() &&
            valueToBeAddedIsNotParentheses(value)
          ) {
            alert("formato inválido");
          } else if (
            value === "(" &&
            typeOfCharacterBeforeCursor() === "number"
          ) {
            storeValueAndDisplayIt("x");

            updateCursorPositionOnScreen("add");

            storeValueAndDisplayIt(value);

            updateCursorPositionOnScreen("add");
          } else {
            storeValueAndDisplayIt(value);

            updateCursorPositionOnScreen("add");
          }

          break;
      }
  }
}
