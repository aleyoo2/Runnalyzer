function submitValue(){
    let max = parseInt(document.getElementById("input").value);
    let value = document.getElementById("results");
    let previousValue = JSON.parse(localStorage.getItem('previousValue')) || max;
    let randomNumber = randomNumb(1, previousValue);
    let series = JSON.parse(localStorage.getItem('history')) || [];

    if(isNaN(max) || max < 1) {
        value.innerHTML = `Please input a number greater than 0`;
    } else {
        value.innerHTML = `Current number is ${randomNumber}`;
    }

    if (randomNumber !== 1) {
        localStorage.setItem('previousValue', JSON.stringify(randomNumber));
    } else {
        value.innerHTML = `You reached 1! You have to pay now!`;
        alert("You reached 1! You have to pay now! Please press 'Reset' if you wish to play again");
    }
   
    function randomNumb(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    series.push(randomNumber)
    localStorage.setItem('history', JSON.stringify(series));
    document.getElementById('series').innerHTML = `History: ${series.join(" → ")}`;
}

function resetValue(){
    localStorage.removeItem('previousValue');
    localStorage.removeItem('history');
    document.getElementById('series').innerHTML = "";
    document.getElementById("results").innerHTML = "Game has been reset";
}