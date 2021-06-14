const OPERATORS = ['+', '-', '*', '/'];

document.addEventListener('DOMContentLoaded', function (event) {
    const fieldResult = document.querySelector("#fieldResult");
    fieldResult.disabled = true;
    const btnNumbers = document.querySelectorAll(".number");
    btnNumbers.forEach(n => n.addEventListener("click", function () {
        enterNumber(n, fieldResult);
    }));

    const btnOperators = document.querySelectorAll(".operator");
    btnOperators.forEach(n => n.addEventListener("click", function () {
        enterOperator(n, fieldResult);
    }));

    const btnDot = document.querySelector("#btnDot");
    btnDot.addEventListener("click", function() {
        enterDot(btnDot, fieldResult);
    });

    const btnClear = document.querySelector("#btnClear");
    btnClear.addEventListener("click", function() {
        clearField(fieldResult);
    });

    const btnEquals = document.querySelector("#btnEquals");
    btnEquals.addEventListener("click", function() {
        calculate(fieldResult);
    });

    let test = [];
    test.push("HellO");
    test.push("Bye");
    test.pop();
    test.unshift("First");
    test.shift();
    console.log(test.toString());
})

function enterNumber(numberBtn, fieldResult) {
    let number = numberBtn.textContent;
    fieldResult.value += number;
}

function enterOperator(operatorBtn, fieldResult) {
    let operator = operatorBtn.textContent;
    let result = fieldResult.value;
    let lastCharacter = result.charAt(result.length - 1);
    if (fieldResult.value != "") {
        if (!isNaN(parseInt(lastCharacter))) {
            fieldResult.value += operator;
        } else if (OPERATORS.includes(lastCharacter)) {
            result = result.substring(0, result.length - 1) + operator;
            fieldResult.value = result;
        }
    }
}

function enterDot(dotBtn, fieldResult) {
    let dot = dotBtn.textContent;
    let resultArr = fieldResult.value.split(/\/|\+|\-|\*/);
    let lastResult = resultArr[resultArr.length - 1];

    if (!lastResult.includes('.')) {
        fieldResult.value += dot;
    }
}

function clearField(field) {
    field.value = "";
}

function calculate(fieldResult) {
    let result = fieldResult.value;
    let lastCharacter = result.charAt(result.length - 1);

    // Remove last character if it is an operator.
    if (OPERATORS.includes(lastCharacter)) {
        result = result.substring(0, result.length - 1);
    }

    // Calculate
    fieldResult.value = eval(result);
}