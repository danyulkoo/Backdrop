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

// Timer variables
const timer = document.querySelector('#timer');
let studyTime = 1500;
let brkTime = 300;
var alarm = new Audio('sounds/timerbeep.wav');

let counter = 0;
let timeLeft = studyTime;
let timerOn = false;
// Set Initial timer display to 25 min
displayTimer();

function setTimer(t) {
	counter = 0;
	timeLeft = t;
}

function displayTimer() {
	timer.textContent = convertSeconds(timeLeft - counter);
}
// Shuffle Button functions
var shuffleBtn = document.querySelector('#shuffle');
var title = document.querySelector('#pomodoro');

function checkPomodoro() {
	if (title.textContent == "Work") {
		return true;
	}
	else {
		return false;
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
	resetBtn.classList.add("disabled");
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

// Main timer function
function timeIt() {
	// If timer runs out
	if (counter == timeLeft) {
		timer.textContent = "00:00";
		// turn Start button off
		startBtn.classList.remove("btnOn");
		resetBtn.classList.remove("disabled");
		turnTimerOff();

		// Play alarm sound
		alarm.currentTime = 0;
		alarm.play();

		// Switch to Break when Timer runs out and vice versa
		if (checkPomodoro()) {
			if (confirm("Switch to a short break?")) {
				shuffle();
			}
			else {
				setTimer(studyTime);
			}
		}
		else {
			if (confirm("Switch to a study session?")) {
				shuffle();
			}
			else {
				setTimer(brkTime);
			}
		}
		// Pause alarm sound after they confirm alert
		alarm.currentTime = 0;
		alarm.pause();
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
		resetBtn.classList.remove("disabled");
		timerOn = false;
	}
}

function resetTimer() {
	if (!timerOn) {
		clearInterval(timerInterval)
		startBtn.classList.remove("btnOn");
		stopBtn.classList.remove("btnOn");
		counter = 0;
		updateTimeSettings();
		console.log(studyTime);
		console.log(brkTime);
		if (checkPomodoro()) {
			setTimer(studyTime);
		}
		else {
			setTimer(brkTime);
		}
		displayTimer();
	}
}

function shuffle() {
	if (checkPomodoro()) {
		title.textContent = "Break";

		stopBtn.classList.remove("btnOn");
		startBtn.classList.remove("btnOn");
		resetBtn.classList.remove("btnOn");

		turnTimerOff();
		setTimer(brkTime);
		displayTimer();
	}
	else {
		title.textContent = "Work";

		stopBtn.classList.remove("btnOn");
		startBtn.classList.remove("btnOn");
		resetBtn.classList.remove("btnOn");

		turnTimerOff();
		setTimer(studyTime);
		displayTimer();
	}
}
//////////////////
// Sound navbar //
//////////////////

// function to toggle the sound
function toggleSound(keyNum) {
    const sound = document.querySelector(`audio[data-key="${keyNum}"]`);
    const btn = document.querySelector(`button[data-key="${keyNum}"]`);
    if (!sound) return;

    if (sound.paused) {
    	btn.classList.add('playing');
    	sound.currentTime = 0;
    	sound.play();
    }
    else {
    	btn.classList.remove('playing');
    	sound.pause();
    }
}

// get queryList of sound buttons
const soundButtons = Array.from(document.querySelectorAll('.sound'));
soundButtons.forEach((button) => {
  	button.addEventListener('click', 
  		function() {
  			toggleSound(button.getAttribute('data-key'));
  		});
});

var muteBtn = document.getElementById('mute');

muteBtn.onclick = function() {
	//list of all audio elements
	var sounds = document.getElementsByTagName('audio');
  	for(i=0; i<sounds.length; i++) sounds[i].pause();

  	soundButtons.forEach((button) => {
  		button.classList.remove('playing');
  	});
};

///////////////////////////////////
// Custom Time Setting functions //
///////////////////////////////////
let inputStudyTime = document.getElementsByName("studytime")[0].value;
let inputBrkTime = document.getElementsByName('breaktime')[0].value;
function updateTimeSettings() {
	inputStudyTime = document.getElementsByName("studytime")[0].value;
	inputBrkTime = document.getElementsByName('breaktime')[0].value;
	studyTime = inputStudyTime * 60;
	brkTime = inputBrkTime * 60;
}

// Get the modal
var modal = document.getElementById("settings-modal");
// Get the button that opens the modal
var settingsBtn = document.getElementById("settings-btn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var savebtn = document.getElementById("savebtn");
// When the user clicks on the button, open the modal 
settingsBtn.onclick = function() {
    modal.style.display = "block";
}

let saved = false;
savebtn.onclick = function () {
	updateTimeSettings();
	modal.style.display = "none";
	if (!timerOn) {
		if (checkPomodoro()) {
			setTimer(studyTime);
		}
		else {
			setTimer(brkTime);
		}
		displayTimer();
	}
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.getElementsByName("studytime")[0].value = inputStudyTime;
	document.getElementsByName('breaktime')[0].value = inputBrkTime;
    displayTimer();
}


