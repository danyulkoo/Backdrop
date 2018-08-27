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
let timeLeft = 1500;
let timerOn = false;
let timerPaused = false;
timer.textContent = convertSeconds(timeLeft);

function timeIt() {
	if (counter < timeLeft)
	{
		counter++;
	}
	timer.textContent = convertSeconds(timeLeft - counter);
}

// Shuffle Button functions
var shuffleBtn = document.querySelector('#shuffle');
var title = document.querySelector('#pomodoro');

function shuffle() {
	if (title.textContent == "Pomodoro") {
		title.textContent = "Break";
		timeLeft = 300;
		timer.textContent = convertSeconds(timeLeft);
	}
	else {
		title.textContent = "Pomodoro";
		timeLeft = 1500;
		timer.textContent = convertSeconds(timeLeft);
	}
}
// Timer Buttons functions
var startBtn = document.querySelector('#start');
var stopBtn = document.querySelector('#stop');
var resetBtn = document.querySelector('#reset');

var timerInterval;
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

function stopTimer() {
	if (timerOn)
	{
		clearInterval(timerInterval)
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
	if (title.textContent == "Pomodoro"){
		timeLeft = 1500;
	}
	else {
		timeLeft = 300;
	}
	timer.textContent = convertSeconds(timeLeft);
	timerOn = false;
}

// Switch to Break when Timer runs out and vice versa



