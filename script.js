// SCRIPT

///////////////////
// Timer scripts //
///////////////////

// converting seconds
function convertSeconds(s) 
{
	let min = Math.floor(s/60);
	let seconds = s % 60;

	if (min >= 10 && seconds < 10)
	{
		return min + ':0' + seconds;
	}
	else if (min < 10 && seconds >= 10)
	{
		return '0' + min + ':' + seconds;
	}
	else if (min < 10 && seconds < 10)
	{
		return '0' + min + ':0' + seconds;
	}
	else if (min <= 0 && seconds <= 0)
	{
		return "00:00";
	}
	else
	{
		return min + ':' + seconds;
	}
}

const timer = document.querySelector('#timer');
let counter = 0;
let timeLeft = 5;
let timerOn = false;
// Set Initial timer display to 25 min
displayTimer();

function setTimer(brk) {
	counter = 0;
	timeLeft = brk;
}

function displayTimer() {
	timer.textContent = convertSeconds(timeLeft - counter);
}
// Shuffle Button functions
var shuffleBtn = document.querySelector('#shuffle');
var title = document.querySelector('#pomodoro');

function checkPomodoro() {
	if (title.textContent == "Pomodoro") {
		return true;
	}
	else {
		return false;
	}
}

var timerInterval;

// Timer Buttons functions
var startBtn = document.querySelector('#start');
var stopBtn = document.querySelector('#stop');
var resetBtn = document.querySelector('#reset');

function startTimer() {
	startBtn.classList.add("btnOn");
	stopBtn.classList.remove("btnOn");
	resetBtn.classList.remove("btnOn");
	if (!timerOn)
	{
		timerInterval = setInterval(timeIt,1000);
		timerOn = true;
	}
}

function turnTimerOff() {
	clearInterval(timerInterval);
	timerOn = false;
}

function timeIt() {
	if (counter == timeLeft) {
		timer.textContent = "00:00";
		startBtn.classList.remove("btnOn");
		turnTimerOff();

		// Switch to Break when Timer runs out and vice versa
		if (checkPomodoro()) {
			if (confirm("Switch to 5-minute break?")) {
				shuffle();
			}
			else {
				setTimer(1500);
				displayTimer();
			}
		}
		else {
			if (confirm("Switch to 25-min studying?")) {
				shuffle();
			}
			else {
				setTimer(300);
				displayTimer();
			}
		}
	}
	else if (counter < timeLeft) {
		counter++;
	}

	displayTimer();
}

function stopTimer() {
	if (timerOn)
	{
		turnTimerOff();
		stopBtn.classList.add("btnOn");
		startBtn.classList.remove("btnOn");
		resetBtn.classList.remove("btnOn");
		timerOn = false;
	}
}

function resetTimer() {
	clearInterval(timerInterval)
	startBtn.classList.remove("btnOn");
	stopBtn.classList.remove("btnOn");
	counter = 0;
	if (checkPomodoro()){
		timeLeft = 1500;
	}
	else {
		timeLeft = 300;
	}
	displayTimer();
	timerOn = false;
}

function shuffle() {
	if (checkPomodoro()) {
		title.textContent = "Break";

		stopBtn.classList.remove("btnOn");
		startBtn.classList.remove("btnOn");
		resetBtn.classList.remove("btnOn");

		turnTimerOff();
		setTimer(300);
		displayTimer();
	}
	else {
		title.textContent = "Pomodoro";

		stopBtn.classList.remove("btnOn");
		startBtn.classList.remove("btnOn");
		resetBtn.classList.remove("btnOn");

		turnTimerOff();
		setTimer(1500);
		displayTimer();
	}
}