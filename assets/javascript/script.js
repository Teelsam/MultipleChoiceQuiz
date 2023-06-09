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
// arrays of question content
var possibleQs = ["What does getElementById look for?", "What does Math.floor do?", "What does JSON.stringify() do?", "What does -- do to an number?", "How often does setInterval (function(), 2000) refresh?",];
var possibleAs = ["ids", "rounds number down", "turns an object into a string", "subtracts by 1", "every 2 seconds"];
var possibleBs = ["classes", "gives a random number", "multiplies arguments", "turns an object into a string", "every 20 seconds"];

function increaseQPicker() { // cycles the questions
    if (questionPicker < 5) {
        questionPicker++;
    }

    return;
}
function scoreAdditioner() { // rewards players score
    score++;
    scoreCard.textContent = "Current Score:" + score;
}
function scoreSubtractioner() { //punishes players score
    score--;
    scoreCard.textContent = "Current Score:" + score;
}
function aButtonPressed() {// right choice selected.
    increaseQPicker();
    loadQuestion();
    scoreAdditioner();
}
function bButtonPressed() {// wrong choice selected.
    answerCheck.style.color = "red";
    answerCheck.textContent = "false! TIME REDUCED BY 5";
    timeLeft -= 5;
    scoreSubtractioner();


}

function loadQuestion() {// loads questions and corresponding answers
    answerCheck.textContent = "";
    answerCheck.style.color = "";
    if (questionPicker < 5) {
        console.log("---------------");
        console.log("Question " + [questionPicker] + " was picked");//prints to log which Q was picked.
        askedQ.textContent = possibleQs[questionPicker];
        op1.textContent = possibleAs[questionPicker];
        op2.textContent = possibleBs[questionPicker];
        console.log("Question " + questionPicker + " was loaded.");
        console.log("the score is now:" + score);
    }
    else if (questionPicker >= 5) { //ends game when all questions have been cycled through.
        timeEl.textContent = " ";
        endMessage.textContent = "Thats all the questions!";
        unloadQuestion()
    }
}

function unloadQuestion() { //hides quiz content and displays playerinfo in console
    askedQ.style.visibility = "hidden";
    op1.style.visibility = "hidden";
    op2.style.visibility = "hidden";
    aBtn.style.visibility = "hidden";
    bBtn.style.visibility = "hidden";
    playerInfo.playerScore = score;
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
    // and calls out endgame screen content.
    unloadQuestion();
    highscore();
}
function highscore() {
    //this loads the score board 
    scoreBoardTitle.style.visibility = "visible";
    firstPosition.style.visibility = "visible";
    secondPosition.style.visibility = "visible"
    thirdPosition.style.visibility = "visible";

    var scoreInfo = JSON.parse(localStorage.getItem("playerInfo")); // This saves the information from the most recent play into memeory.

    if (scoreInfo.playerScore > firstPlaceInfo.firstPlaceScore) { //this sets the most recent score to firstplacescore in memeory.
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
aBtn.addEventListener("click", aButtonPressed);//when A button is pressed our game continues
bBtn.addEventListener("click", bButtonPressed);//when b button is pressed our player is punished
highscoreShow.addEventListener("click", highscore);//displays highscore scoreboard