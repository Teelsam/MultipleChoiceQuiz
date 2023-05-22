var startGame = document.getElementById("start");
var timeEl = document.getElementById("time");
var timeLeft = 15; // Sets timer starting time.
var endMessage = document.getElementById("outOfTimeMsg");
var submitEl = document.querySelector("#submit");
var nameInput = document.querySelector("#formName");
var nameResponse = document.getElementById("response");
var nameWarning = document.getElementById("nameWarning");
var askedQ = document.getElementById("askedQ");
var options = document.getElementById("options");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");
var aBtn = document.getElementById("a");
var bBtn = document.getElementById("b");
var cBtn = document.getElementById("c");
var highscoreShow = document.getElementById("hsBtn");//this is the highscore button.
var firstPosition = document.getElementById("firstPlace");
var secondPosition = document.getElementById("secondPlace");
var thirdPosition = document.getElementById("thirdPlace");

var scoreSpace = document.getElementById("score");
var score = 0;

var playerInfo = { //object holds current users name and score
    playerName: "",
    playerScore: 0,
};
var firstPlaceInfo = { //holds the highscores name and score
    firstPlace: "",
    firstPlaceScore: 0,
}
var secondPlaceInfo = {//holds 2nd place score and name
    secondPlace: "",
    secondPlaceScore: 0,
}
var thirdPlaceInfo = {//holds 3rd place score and name
    thirdPlace: "",
    thirdPlaceScore: 0,
};




var possibleQs = [
    {//Q0 a
        question: "What does getElementById look for?",
        answers: { a: "ids", b: "classes", }, solution: "a"
    },
    {//Q1 c 
        question: "What does Math.floor do?",
        answers: { a: "gives a random number", b: "rounds down number" }, solution: "b"
    },
    {//Q2 b
        question: "What does JSON.stringify() do?",
        answers: { a: "multiplies arguments", b: "turns an object into a string", }, solution: "b"
    },
    {//Q3 a
        question: "What does -- do to an number?",
        answers: { a: "subtracts by 1", b: "turns an object into a string", }, solution: "a"
    },
    {//Q4 a
        question: "How often does setInterval (function(), 2000 refresh?",
        answers: { a: "every 2 seconds", b: "every 20 seconds", }, solution: "a"
    }

];
function loadQuestion() {// loads questions and corresponding answers, randomly
    var questionPicker = Math.floor((Math.random() * 4));
    console.log("Question " + questionPicker + " was picked");//prints to log which Q was picked.
    askedQ.textContent = possibleQs[questionPicker].question;
    op1.textContent = possibleQs[questionPicker].answers.a;
    op2.textContent = possibleQs[questionPicker].answers.b;
    console.log(timeLeft + " seconds left");

    aBtn.addEventListener("click", function () {
        if (questionPicker === 0 && timeLeft > 0) {// Elementids Q0 true
            timeLeft++;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct. Your score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 1 && timeLeft > 0) {//math.floor Q1 false
            timeLeft--;
            if (score > 0) {
                score--;
            }
            scoreSpace.textContent = score;
            console.clear();
            console.log("false, you score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 2 && timeLeft > 0) {//JSON Q3 flase
            timeLeft--;
            if (score > 0) {
                score--;
            }
            scoreSpace.textContent = score;
            console.clear();
            console.log("false, you score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 3 && timeLeft > 0) {// -- Q4 true
            timeLeft++;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct. Your score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 4 && timeLeft > 0) {//setInterval Q5 true
            timeLeft++;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct. Your score is now: " + score);
            loadQuestion();
        }
        else { }
    })

    bBtn.addEventListener("click", function () {//// Elementids Q0 false
        if (questionPicker === 0 && timeLeft > 0) {
            timeLeft--;
            if (score > 0) {
                score--;
            }
            scoreSpace.textContent = score;
            console.clear();
            console.log("false, you score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 1 && timeLeft > 0) {////math.floor Q1 true
            timeLeft++;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct, you score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 2 && timeLeft > 0) {////JSON Q3 true
            timeLeft += 1;
            score++;
            scoreSpace.textContent = score;
            console.clear();
            console.log("correct. Your score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 3 && timeLeft > 0) {//// -- Q4 false
            timeLeft--;
            if (score > 0) {
                score--;
            }
            scoreSpace.textContent = score;
            console.clear();
            console.log("false, you score is now: " + score);
            loadQuestion();
        }
        else if (questionPicker === 4 && timeLeft > 0) {////setInterval Q5 false
            timeLeft--;
            if (score > 0) {
                score--;
            }
            scoreSpace.textContent = score;
            console.clear();
            console.log("false, you score is now: " + score);
            loadQuestion();
        }
        else { }
    })

}
function unloadQuestion() {
    askedQ.style.visibility = "hidden";
    op1.style.visibility = "hidden";
    op2.style.visibility = "hidden";
    aBtn.style.visibility = "hidden";
    bBtn.style.visibility = "hidden";
    playerInfo.playerScore = score;
    console.log(playerInfo);
    localStorage.setItem("playerInfo", JSON.stringify(playerInfo));



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
function enterName(event) { // records name entered 
    event.preventDefault();
    console.log(event);
    var response = "Thanks " + nameInput.value;
    nameResponse.textContent = response;
    playerInfo.playerName = nameInput.value;

    return;
}
function timesUp() { //this displays text when timeLeft === 0
    timeEl.textContent = " ";
    endMessage.textContent = "Times up, Friend... ";

    unloadQuestion();



}
function highscore() {//this loads the score board 
    var scoreInfo = JSON.parse(localStorage.getItem("playerInfo"));
    if (scoreInfo.playerScore > firstPlaceInfo.firstPlaceScore) {
        firstPlaceInfo.firstPlaceScore = scoreInfo.playerScore;
        firstPlaceInfo.firstPlace = scoreInfo.playerName;
        firstPosition.textContent = "First Place:" + firstPlaceInfo.firstPlace + " " + firstPlaceInfo.firstPlaceScore;
    }
    else if (scoreInfo.playerScore > secondPlaceInfo.secondPlaceScore && scoreInfo.playerScore < firstPlaceInfo.firstPlaceScore) {
        secondPlaceInfo.secondPlaceScore = scoreInfo.playerScore;
        secondPlaceInfo.secondPlace = secoreInfo.playerName;
        secondPosition.textContent = "Second Place:" + secondPlaceInfo.secondPlace + " " + secondPlaceInfo.secondPlaceScore;
    }
    else if (scoreInfo.playerScore > thirdPlaceInfo.playerScore && scoreInfo.playerScore < secondPlaceInfo.secondPlaceScore) {
        thirdPlaceInfo.thirdPlaceScore = scoreInfo.playerScore;
        thirdPlaceInfo.thirdPlace = scoreInfo.playerName;
        thirdPosition.textContent = "Third Place:" + thirdPlaceInfo.thirdPlace + " " + thirdPlaceInfo.thirdPlaceScore;
    }
    else {
        return;
    }




}
startGame.addEventListener("click", function () { // this button when clicked removes start button and starts timer
    // this begins the timer 
    setTime();
    startGame.style.display = 'none';
    nameWarning.style.display = "none";
    loadQuestion();

});
submitEl.addEventListener("click", enterName);


highscoreShow.addEventListener("click", highscore);