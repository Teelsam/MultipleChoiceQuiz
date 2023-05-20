var startGame = document.getElementById("start");
var timeEl = document.getElementById("time");
var timeLeft = 5;
var endMessage = document.getElementById("outOfTimeMsg");
var askedQ = document.getElementById("askedQ");
var options = document.getElementById("options");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");
var op3 = document.getElementById("op3");
var selectors = document.getElementsByClassName("selectors");
var aBtn = document.getElementById("a");
var bBtn = document.getElementById("b");
var cBtn = document.getElementById("c");
var highscoreShow = document.getElementById("hsBtn");//this is the highscore button.
var highscoreBoard = document.getElementById("highscores");//this is the score board.
var score = 0;


var possibleQs = [
    {//Q0
        question: "What does getElementById look for?",
        answers: { a: "ids", b: "classes", c: "comments" }, solution: "a"
    },

    {//Q1
        question: "What does Math.floor do?",
        answers: { a: "gives a random number", b: "logs to console", c: "rounds down number" }, solution: "c"
    },

    {//Q2
        question: "What does JSON.stringify() do?",
        answers: { a: "multiplies arguments", b: "turns an object into a string", c: "calls your friend Jason" }, solution: "b"
    },
    {//Q3
        question: "What does -- do to an number?",
        answers: { a: "subtracts by 1", b: "turns an object into a string", c: "turns your computer off" }, solution: "a"
    }

];
function loadQuestion() {// loads questions and corresponding answers, randomly
    var questionPicker = Math.floor((Math.random() * 4));
    console.log(questionPicker);
    askedQ.textContent = possibleQs[questionPicker].question;
    op1.textContent = possibleQs[questionPicker].answers.a;
    op2.textContent = possibleQs[questionPicker].answers.b;
    op3.textContent = possibleQs[questionPicker].answers.c;

    aBtn.addEventListener("click", function () {
        if (questionPicker === 0) {
            timeLeft += 5;
            score++;
            console.log("correct");
            loadQuestion();
        }
        else if (questionPicker === 1) {
            timeLeft -= 5;
            score--;
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 2) {
            timeLeft -= 5;
            score--;
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 3) {
            timeLeft += 5;
            score++;
            console.log("false");
            loadQuestion();
        }
    })

}
function unloadQuestion() {
    askedQ.textContent = "Type your name:";
    op1.textContent = "";
    op2.textContent = "";
    op3.textContent = "";


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