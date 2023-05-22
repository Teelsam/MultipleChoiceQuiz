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
var questionZone = document.getElementById("questionZone");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");
var aBtn = document.getElementById("a");
var bBtn = document.getElementById("b");
var nextBtn = document.getElementById("next");
var answerCheck = document.getElementById("answerCheck");
var highscoreShow = document.getElementById("hsBtn");//this is the highscore button.
var firstPosition = document.getElementById("firstPlace");
var secondPosition = document.getElementById("secondPlace");
var thirdPosition = document.getElementById("thirdPlace");
var scoreBoardTitle = document.getElementById("scoreboardTitle");
var scoreCard = document.getElementById("scoreCard");
var score = 0;
var questionPicker = 0;

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
        question: "How often does setInterval (function(), 2000) refresh?",
        answers: { a: "every 2 seconds", b: "every 20 seconds", }, solution: "a"
    }

];
function loadQuestion() {// loads questions and corresponding answers
    //WHY 
    //IS
    // my counter 
    //wrong
    console.log("---------------");
    console.log("Question " + [questionPicker] + " was picked");//prints to log which Q was picked.
    askedQ.textContent = possibleQs[questionPicker].question;
    op1.textContent = possibleQs[questionPicker].answers.a;
    op2.textContent = possibleQs[questionPicker].answers.b;
    console.log("Question " + questionPicker + " was loaded.");


    aBtn.addEventListener("click", function () {
        while (questionPicker === 0) { //Q0 a is correct
            score = score + 1;
            scoreCard.innerText = "Current Score:" + score;
            answerCheck.innerText = "Correct!"
            answerCheck.style.color = "green";
            return;
        }
        while (questionPicker === 1) {//Q1 a is wrong
            timeLeft--;
            answerCheck.innerText = "False";
            answerCheck.style.color = "red";
            return;
        }
        while (questionPicker === 2) {//Q2  a is wrong
            timeLeft--;
            answerCheck.innerText = "False";
            answerCheck.style.color = "red";
            return;
        }
        while (questionPicker === 3) {//Q3 a is correct
            score = score + 1;
            scoreCard.innerText = "Current Score:" + score;
            answerCheck.innerText = "Correct!"
            answerCheck.style.color = "green";
            return;
        }
        while (questionPicker === 4) {//Q4 a is correct
            score = score + 1;
            scoreCard.innerText = "Current Score:" + score;
            answerCheck.innerText = "Correct!"
            answerCheck.style.color = "green";
            return;
        }
    });
    bBtn.addEventListener("click", function () {
        while (questionPicker === 0) {//Q0  b is wrong
            --timeLeft;
            answerCheck.innerText = "False";
            answerCheck.style.color = "red";
            return;
        }
        while (questionPicker === 1) {//Q1 b is correct
            score = score + 1;
            scoreCard.innerText = "Current Score:" + score;
            answerCheck.innerText = "Correct!"
            answerCheck.style.color = "green";
            return;
        }
        while (questionPicker === 2) {//Q2 b is correct
            score = score + 1;
            scoreCard.innerText = "Current Score:" + score;
            answerCheck.innerText = "Correct!"
            answerCheck.style.color = "green";
            return;
        }
        while (questionPicker === 3) {//Q3 b is wrong
            timeLeft--;
            answerCheck.innerText = "False";
            answerCheck.style.color = "red";
            return;
        }
        while (questionPicker === 4) {//Q4 b is wrong
            timeLeft--;
            answerCheck.innerText = "False";
            answerCheck.style.color = "red";
            return;
        }
    })

    nextBtn.addEventListener("click", function () {
        if (questionPicker < 5) {
            ++questionPicker;
        }
        answerCheck.innerText = "";
        answerCheck.style.color = "";
        loadQuestion();

    })


}
function unloadQuestion() { //hides quiz content and displays playerinfo in console
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
    highscore();



}

function highscore() {//this loads the score board 
    scoreBoardTitle.style.visibility = "visible";
    firstPosition.style.visibility = "visible";
    secondPosition.style.visibility = "visible"
    thirdPosition.style.visibility = "visible";
    var scoreInfo = JSON.parse(localStorage.getItem("playerInfo"));
    console.log("this is scoreinfo " + scoreInfo);
    if (scoreInfo.playerScore > firstPlaceInfo.firstPlaceScore) {
        firstPlaceInfo.firstPlaceScore = scoreInfo.playerScore;
        firstPlaceInfo.firstPlace = scoreInfo.playerName;

    }
    else if (scoreInfo.playerScore > secondPlaceInfo.secondPlaceScore && scoreInfo.playerScore < firstPlaceInfo.firstPlaceScore) {
        secondPlaceInfo.secondPlaceScore = scoreInfo.playerScore;
        secondPlaceInfo.secondPlace = scoreInfo.playerName;

    }
    else if (scoreInfo.playerScore > thirdPlaceInfo.playerScore && scoreInfo.playerScore < secondPlaceInfo.secondPlaceScore) {
        thirdPlaceInfo.thirdPlaceScore = scoreInfo.playerScore;
        thirdPlaceInfo.thirdPlace = scoreInfo.playerName;
    }
    else {
        return;
    }
    //Below displays name and score of user into the score board.
    firstPosition.textContent = "First Place:" + firstPlaceInfo.firstPlace + " " + firstPlaceInfo.firstPlaceScore;
    secondPosition.textContent = "Second Place:" + secondPlaceInfo.secondPlace + " " + secondPlaceInfo.secondPlaceScore;
    thirdPosition.textContent = "Third Place:" + thirdPlaceInfo.thirdPlace + " " + thirdPlaceInfo.thirdPlaceScore;
    localStorage.setItem("firstPlaceInfo", JSON.stringify(firstPlaceInfo));
    localStorage.setItem("secondPlaceInfo", JSON.stringify(secondPlaceInfo));
    localStorage.setItem("thirdPlaceInfo", JSON.stringify(thirdPlaceInfo));

}
startGame.addEventListener("click", function () { // this button when clicked removes start button and starts timer
    // this begins the timer and hides starting info
    setTime();
    startGame.style.display = 'none';
    nameWarning.style.display = "none";
    op1.style.visibility = "visible";
    op2.style.visibility = "visible";
    loadQuestion();

});
submitEl.addEventListener("click", enterName);// records players name


highscoreShow.addEventListener("click", highscore);//displays highscore scoreboard