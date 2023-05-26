var startGame = document.getElementById("start");
var timeEl = document.getElementById("time");
var timeLeft = 60; // Sets timer starting time.
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

var possibleQs = ["What does getElementById look for?", "What does Math.floor do?", "What does JSON.stringify() do?", "What does -- do to an number?", "How often does setInterval (function(), 2000) refresh?",];
var possibleAs = ["ids", "rounds number down", "turns an object into a string", "subtracts by 1", "every 2 seconds"];
var decoyAs = ["classes", "gives a random number", "multiplies arguments", "turns an object into a string", "every 20 seconds"];




function loadQuestion() {// loads questions and corresponding answers

    console.log("---------------");
    console.log("Question " + [questionPicker] + " was picked");//prints to log which Q was picked.
    askedQ.textContent = possibleQs[questionPicker];
    op1.textContent = possibleAs[questionPicker];
    op2.textContent = decoyAs[questionPicker];
    console.log("Question " + questionPicker + " was loaded.");


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