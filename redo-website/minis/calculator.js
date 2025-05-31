const display = document.getElementById("displayresults");

function pressbutton(sign) {
    display.value += sign;
}

function resetresults() {
    display.value = '';
}

function calculate() {
    try {
        display.value = eval(display.value); //quicker way to compute math
    } catch (error) {
        display.value = "Error";
    }
}
