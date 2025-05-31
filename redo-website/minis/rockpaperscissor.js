let scores = JSON.parse(localStorage.getItem('scores')) || {wins: 0, losses:0, ties: 0};
console.log(scores);
updatescore();

function playgame(move) {
    const compMove = generateCompMove();
    let results = '';



    if(move==='Rock') {
        if(compMove === 'Rock') {
            results = 'You Tie'; 
        } else if (compMove === 'Paper') {
            results = 'You Lose'; 
        } else if (compMove === 'Scissors') {
            results = 'You Win'; 
        }
    } else if (move==='Paper') {
        if(compMove === 'Rock') {
            results = 'You Win'; 
        } else if (compMove === 'Paper') {
            results = 'You Tie'; 
        } else if (compMove === 'Scissors') {
            results = 'You Lose'; 
        }
    } else if (move==='Scissors') {
        if(compMove === 'Rock') {
            results = 'You Lose'; 
        } else if (compMove === 'Paper') {
            results = 'You Win'; 
        } else if (compMove === 'Scissors') {
            results = 'You Tie'; 
        } 
    }

    //Shows without img 
    /*
    document.querySelector('.displayresults').innerHTML = `You chose ${move}. Computer chose ${compMove}. ${results}!`;
    */
    //Shows with img 
    document.querySelector('.displaytest').innerHTML = `You chose: <img class="symbol" src="miniphotos/${move}.png"> Computer chose: <img class="symbol" src="miniphotos/${compMove}.png"> ${results}!`;

    if (results === 'You Win') {
        scores.wins++;
    } else if (results === 'You Lose') {
        scores.losses++;
    } else if (results === 'You Tie') {
        scores.ties++;
    }

    localStorage.setItem('scores',JSON.stringify(scores));
    updatescore();
}


function generateCompMove() {
    const randomNumber = Math.random();
    let compMove = '';

    if(randomNumber >= 0 && randomNumber <1/3) {
        compMove = 'Rock';
    } else if (randomNumber >=1/3 && randomNumber < 2/3) {
        compMove = 'Paper';
    } else if (randomNumber >=2/3 && randomNumber <=1) {
        compMove = 'Scissors';
    }
    return compMove;
}        




function updatescore() {
    document.querySelector('.score').innerHTML = `Wins: ${scores.wins} Losses: ${scores.losses} Ties: ${scores.ties}`;
}

function resetscore() {
    scores = {
        wins: 0,
        losses: 0,
        ties: 0,
    }
    localStorage.setItem('scores',JSON.stringify(scores));
    updatescore();
}