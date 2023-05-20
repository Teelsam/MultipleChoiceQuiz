var timeEl = document.getElementById("time");
var timeLeft = 20;
var endMessage = document.getElementById("outOfTimeMsg");
var highScoreShow = document.getElementById("highscore");
var startGame = document.getElementById("start");

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
    endMessage.textContent = "Times up, Friend"
}
startGame.addEventListener("click", function () { // this button when clicked removes start button and starts timer
    setTime();
    startGame.style.display = 'none';
}); // this begins the timer

highScoreShow.addEventListener("click",);