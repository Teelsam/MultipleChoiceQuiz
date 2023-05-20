var startGame = document.getElementById("start");
var timeEl = document.getElementById("time");
var timeLeft = 10; // Sets timer starting time.
var endMessage = document.getElementById("outOfTimeMsg");
var askedQ = document.getElementById("askedQ");
var options = document.getElementById("options");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");
var op3 = document.getElementById("op3");
var aBtn = document.getElementById("a");
var bBtn = document.getElementById("b");
var cBtn = document.getElementById("c");
var highscoreShow = document.getElementById("hsBtn");//this is the highscore button.
var highscoreBoard = document.getElementById("highscores");//this is the score board.
var userName = document.getElementById("userName");//gets the users name for score keeping
var scoreSpace = document.getElementById("score");
var score = 0;


var possibleQs = [
    {//Q0 a
        question: "What does getElementById look for?",
        answers: { a: "ids", b: "classes", c: "comments" }, solution: "a"
    },
    {//Q1 c 
        question: "What does Math.floor do?",
        answers: { a: "gives a random number", b: "logs to console", c: "rounds down number" }, solution: "c"
    },
    {//Q2 b
        question: "What does JSON.stringify() do?",
        answers: { a: "multiplies arguments", b: "turns an object into a string", c: "calls your friend Jason" }, solution: "b"
    },
    {//Q3 a
        question: "What does -- do to an number?",
        answers: { a: "subtracts by 1", b: "turns an object into a string", c: "turns your computer off" }, solution: "a"
    },
    {//Q4 a
        question: "How often does setInterval (function(), 2000 refresh?",
        answers: { a: "every 2 seconds", b: "every 20 seconds", c: "every 2 minutes" }, solution: "a"
    }

];
function loadQuestion() {// loads questions and corresponding answers, randomly
    var questionPicker = Math.floor((Math.random() * 4));
    console.log("Question " + questionPicker + " was picked");//prints to log which Q was picked.
    askedQ.textContent = possibleQs[questionPicker].question;
    op1.textContent = possibleQs[questionPicker].answers.a;
    op2.textContent = possibleQs[questionPicker].answers.b;
    op3.textContent = possibleQs[questionPicker].answers.c;
    console.log(timeLeft + " seconds left");

    aBtn.addEventListener("click", function () {
        if (questionPicker === 0 && timeLeft > 0) {
            timeLeft += 1;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct. Your score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 1 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 2 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 3 && timeLeft > 0) {
            timeLeft += 1;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct. Your score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 4 && timeLeft > 0) {
            timeLeft += 1;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct. Your score is now: " + score);
            loadQuestion();
        }
    })

    bBtn.addEventListener("click", function () {
        if (questionPicker === 0 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 1 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 2 && timeLeft > 0) {
            timeLeft += 1;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct. Your score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 3 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 4 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
    })

    cBtn.addEventListener("click", function () {
        if (questionPicker === 0 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 1 && timeLeft > 0) {
            timeLeft += 1;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct, Your score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 2 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 3 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
        else if (questionPicker === 4 && timeLeft > 0) {
            timeLeft -= 1;
            score--;
            scoreSpace.textContent = score;
            console.clear();
            console.log("false");
            loadQuestion();
        }
    })

}
function unloadQuestion() {
    askedQ.textContent = "Type your name in the box:";
    userName.style.visibility = "visible";
    op1.style.visibility = "hidden";
    op2.style.visibility = "hidden";
    op3.style.visibility = "hidden";
    aBtn.style.visibility = "hidden";
    bBtn.style.visibility = "hidden";
    cBtn.style.visibility = "hidden";
}

function setTime() { //this function counts down from "timeLeft"
    var timeInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = "Time Left: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timesUp();
        }
    }, 1000);
}
function timesUp() { //this displays text when timeLeft === 0
    timeEl.textContent = " ";
    endMessage.textContent = "Times up, Friend..."
    unloadQuestion();
}
function highscore() {//this loads the score board
    var playersName = {
        firstPlace: userName.value,
        secondPlace: "",
        thirdPlace: "",
    }
    console.log(userName);
    localStorage.setItem()
}
startGame.addEventListener("click", function () { // this button when clicked removes start button and starts timer
    // this begins the timer 
    setTime();
    startGame.style.display = 'none';
    loadQuestion();
});

// highscoreShow.addEventListener("click",);