'use strict';

const restartBtn = document.querySelector('.btn-restart')
const holdBtn = document.querySelector('.btn-hold')
const rollBtn = document.querySelector('.btn-roll')
let p0Score = document.querySelector('.player0-current-score')
let p1Score = document.querySelector('.player1-current-score')
let p0TotalScore = document.querySelector('.player0-total-score')
let p1TotalScore = document.querySelector('.player1-total-score')
let diceImg = document.querySelector('img')
let playing = 0;
let currentplayerScore = document.querySelector(`.player${playing}-current-score`)
let currentplayerTotal = document.querySelector(`.player${playing}-total-score`)
let winpara = document.querySelector('.win-txt')
let totalScores = [0,0]

function initialConfig() {
    p0Score.innerText = 0;
    p1Score.innerText = 0;
    p0TotalScore.innerText = 0;
    p1TotalScore.innerText = 0;
    currentplayerScore.parentElement.parentElement.classList.remove('win')
    currentplayerScore.parentElement.parentElement.classList.remove('player-active')
    playing = 0;
    currentplayerScore = document.querySelector(`.player${playing}-current-score`)
    currentplayerTotal = document.querySelector(`.player${playing}-total-score`)
    totalScores = [0,0]
    currentplayerScore.parentElement.parentElement.classList.add('player-active')
    winpara.classList.add('hidden')
}

let rollDice = () => {
    let dado = Math.trunc(Math.random()*6 +1);
    diceImg.src = `./images/dice${dado}.png`
    if(dado != 1) {
        return currentplayerScore.innerText = Number(currentplayerScore.innerText) + dado
    } else {
        currentplayerScore.innerText = 0
        currentplayerScore.parentElement.parentElement.classList.remove('player-active')
        playing = playing === 0 ? 1 : 0
        currentplayerScore = document.querySelector(`.player${playing}-current-score`)
        currentplayerTotal = document.querySelector(`.player${playing}-total-score`)
        currentplayerScore.parentElement.parentElement.classList.add('player-active')
    }
}

//segurar os pontos

let holdScore = () => {
        totalScores[playing] = Number(currentplayerScore.innerText) + totalScores[playing]
        let [p0,p1] = totalScores;
        if (playing == 0) {
            currentplayerTotal.innerText = p0
            if (p0 >= 100) {
                currentplayerTotal.parentElement.parentElement.classList.add('win')
                return winpara.classList.remove('hidden')
            }
            playing = playing === 0 ? 1 : 0
        } else {
            playing = playing === 0 ? 1 : 0
            if (p1 >= 100) {
                currentplayerTotal.parentElement.parentElement.classList.add('win')
                return winpara.classList.remove('hidden')
            }
            currentplayerTotal.innerText = p1
        }
        currentplayerScore.innerText = 0
        currentplayerScore.parentElement.parentElement.classList.remove('player-active')
        currentplayerScore = document.querySelector(`.player${playing}-current-score`)
        currentplayerTotal = document.querySelector(`.player${playing}-total-score`)
        currentplayerScore.parentElement.parentElement.classList.add('player-active')

        //document.querySelector(`.player-${playing}`)
}

rollBtn.addEventListener('click', rollDice)
restartBtn.addEventListener('click', initialConfig)
holdBtn.addEventListener('click', holdScore)