let buttonText = document.querySelectorAll(".options");
let questionText = document.querySelector(".question-text");
let mainArea = document.querySelector(".main-area");
let quizContainer = document.querySelector(".quiz-container");
let userInput = document.querySelector(".user-input");
let inputName = document.querySelector(".input-name");
let scoreboard = document.querySelector(".scoreboard");
let leaderboard = document.querySelector(".scoreboard span");
let timerdiv = document.querySelector(".timer");
let endScoreDiv = document.querySelector(".end-score");
let scorediv = document.querySelector(".score");
let allScores = localStorage.getItem("scores") === null ? {} : JSON.parse(localStorage.getItem("scores"));
let currentQuestionId = 0;
let currentWrong = false;
let totalTime = 60;
let score;
let timeLeft;
let intervalTimer;

function startQuiz() {
    score = 0;
    mainArea.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    scoreboard.classList.add("hidden");
    userInput.classList.add("hidden");
    startTimer();
    nextQuestion();
}

function startTimer() {
    timeLeft = totalTime;
    timerdiv.textContent = totalTime;
    intervalTimer = setInterval(() => {
        if (timeLeft == 0) endQuiz();
        timeLeft--;
        timerdiv.textContent = timeLeft;
    }, 1000);
}

function nextQuestion() {
    if (currentQuestionId === questions.length) return endQuiz();
    questionText.textContent = questions[currentQuestionId].question;
    scorediv.textContent = score;
    for (let i = 0; i < 4; i++) {
        buttonText[i].classList.remove("wrong");
        buttonText[i].classList.remove("hidden");
        if (i < questions[currentQuestionId].options.length) {
            buttonText[i].textContent = questions[currentQuestionId].options[i];
        } else {
            buttonText[i].classList.add("hidden");
        }
    }
}

function checkanswer(id) {
    if (questions[currentQuestionId].answer == id) {
        if (!currentWrong) score++;
        currentWrong = false;
        currentQuestionId++;
        nextQuestion();
    } else {
        buttonText[id].classList.add("wrong");
        if (!currentWrong) {
            timeLeft -= 5;
            timerdiv.textContent = timeLeft;
            currentWrong = true;
        }
    }
}

function endQuiz() {
    mainArea.classList.add("hidden");
    quizContainer.classList.add("hidden");
    scoreboard.classList.add("hidden");
    userInput.classList.remove("hidden");
    clearInterval(intervalTimer);
    currentQuestionId = 0;
    endScoreDiv.textContent = "Your Score: " + score;
}

function showMain() {
    mainArea.classList.remove("hidden");
    quizContainer.classList.add("hidden");
    scoreboard.classList.add("hidden");
    userInput.classList.add("hidden");
}

function saveScore() {
    if (inputName.value.length < 2) return showMain();
    let initials = inputName.value.substring(0, 2).toLowerCase();
    if (allScores[initials] == undefined || allScores[inputName.value.substring(0, 2)] > score) {
        allScores[initials] = score;
        localStorage.setItem("scores", JSON.stringify(allScores));
    }
    showMain();
}

function showLeaderboards() {
    mainArea.classList.add("hidden");
    quizContainer.classList.add("hidden");
    scoreboard.classList.remove("hidden");
    userInput.classList.add("hidden");
    leaderboard.textContent = "";
    for (let k in allScores) {
        let e = document.createElement("div");
        e.textContent = k.toUpperCase() + ": " + allScores[k];
        leaderboard.appendChild(e);
    }
}