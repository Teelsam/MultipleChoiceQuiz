window.on
var timeEl = document.getElementById("time");
var timeLeft = 20;
var endMessage = document.getElementById("outOfTimeMsg");
var startGame = document.getElementById("start");
var askedQ = document.getElementById("askedQ");
var options = document.getElementById("options");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");
var op3 = document.getElementById("op3");

var highscoreShow = document.getElementById("hsBtn");//this is the highscore button.
var highscoreBoard = document.getElementById("highscore");//this is the score board.

var possibleQs = [
    {
        question: "What does getElementById look for?",
        answers: { a: "ids", b: "classes", c: "comments" }, solution: "a"
    },

    {
        question: "What does Math.floor do?",
        answers: { a: "rounds down number", b: "logs to console", c: "gives a random number" }, solution: "a"
    },

    {
        question: "What does JSON.stringify() do?",
        answers: { a: "multiplies arguments", b: "turns an object into a string", c: "calls your friend Jason" }, solution: "b"
    }

];
function loadQuestion() {// loads questions and corresponding answers, randomly
    var questionPicker = Math.floor((Math.random() * 3));
    askedQ.textContent = possibleQs[questionPicker].question;
    op1.textContent = possibleQs[questionPicker].answers.a;
    op2.textContent = possibleQs[questionPicker].answers.b;
    op3.textContent = possibleQs[questionPicker].answers.c;
    return;
}
function setTime() { //this function counts down from "timeLeft"
    var timeInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = "Time Left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timesUp();
        }
    }, 1000);
}
function timesUp() { //this displays text when timeLeft === 0
    timeEl.textContent = " ";
    endMessage.textContent = "Times up, Friend..."
}
function highscore() {//this loads the score board
    //nothing here yet
}
startGame.addEventListener("click", function () { // this button when clicked removes start button and starts timer
    // this begins the timer 
    setTime();
    startGame.style.display = 'none';
    loadQuestion();
});

highscoreShow.addEventListener("click",);