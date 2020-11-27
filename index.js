const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")
const rock = document.getElementById("rock")

const score = document.getElementById("score")
const result = document.getElementById("result")

const rules = document.getElementsByClassName("rules")[0]

// STAGES
const step1 = document.getElementsByClassName("step-1")[0]
const step2 = document.getElementsByClassName("step-2")[0]
// const step3 = document.getElementsByClassName("step-3")[0]
const results = document.getElementsByClassName("results")[0]
results.style.display = "none"

let availableChoices = ["rock", "scissors", "paper"]
let myChoice = ""
let homeChoice = ""
let currentPts = 0

score.innerHTML = currentPts

function restart () {
    renderStep("step-1")
    results.style.display = "none"
}

function pick (pick) {
    resetValues()
    
    results.style.display = "flex"
    results.style.opacity = "0"
    renderStep("step-2")
    homeChoice = availableChoices[Math.floor(Math.random() * availableChoices.length)]

    renderYourChoice(pick)
    // renderStep("step-3") this function does not exist since step 2 and 3 are too similar.
    renderHomeChoice(homeChoice)

    // renderStep("step-4") this function does not exist since step 3 and 4 are too similar.
    setTimeout( () => {
        gameLogic(pick, homeChoice)
    }, 600)
}

function resetValues () {
    availableChoices = ["rock", "scissors", "paper"]
    myChoice = ""
    homeChoice = ""
}

function gameLogic (yourChoice, homeChoice) {
    if ( yourChoice == homeChoice ) {
        renderResult("IT'S A DRAW", 0)
    } else if (
        (yourChoice == "paper" && homeChoice == "rock") ||
        (yourChoice == "rock" && homeChoice == "scissors") ||
        (yourChoice == "scissors" && homeChoice == "paper")
    ) {
        renderResult("YOU WIN", 1)
    } else {
        renderResult("YOU LOSE", -1)
    }
}


function renderResult (message, pts) {
    results.style.opacity = "1"
    result.innerText = message
    currentPts += pts
    score.innerHTML = currentPts
}

function renderStep (step) {
    step1.style.display = "none"
    step2.style.display = "none"

    const newStep = document.getElementsByClassName(step)[0]
    newStep.style.display = "flex"
}

function renderYourChoice (choice) {
    step2.children[0].innerHTML = `
        <button class="choice-btn choice-btn--${choice}">
            <img class="choice__img" src=./images/icon-${choice}.svg />
        </button>
        <span class="choice__span">YOU PICKED</span>        
    `
}

function renderHomeChoice (choice) {
    step2.children[1].innerHTML = `
        <button class="choice-btn choice-btn--empty">
        </button>        
        <span class="choice__span">THE HOUSE PICKED</span>        
    `

    setTimeout( () => {
        step2.children[1].innerHTML = `
            <button class="choice-btn choice-btn--${choice}">
                <img class="choice__img" src=./images/icon-${choice}.svg />
            </button>        
            <span class="choice__span">THE HOUSE PICKED</span>        
        `
    }, 600)
}

function toggleRules () {
    rules.classList.toggle("rules--show")
    const blackBg = document.getElementsByClassName("black-bg")[0]
    
    if (rules.classList.contains("rules--show")) {
        blackBg.style.display = "unset"
    } else {
        blackBg.style.display = "none"
    }
}