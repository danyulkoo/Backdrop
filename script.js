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
let timerReset = true;
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
		timerReset = false;
	}
}

function turnTimerOff() {
	clearInterval(timerInterval);
	timerOn = false;
}

// Main timer function
function timeIt() {
	// If timer runs out
	if (counter >= timeLeft) {
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
		timerReset = false;
	}
}

function resetTimer() {
	timerReset = true;
	if (!timerOn) {
		clearInterval(timerInterval)
		startBtn.classList.remove("btnOn");
		stopBtn.classList.remove("btnOn");
		counter = 0;
		updateTimeSettings();

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
	stopBtn.classList.remove("btnOn");
	startBtn.classList.remove("btnOn");
	resetBtn.classList.remove("disabled");
	turnTimerOff();
	updateTimeSettings();
	if (checkPomodoro()) {
		title.textContent = "Break";
		setTimer(brkTime);
	}
	else {
		title.textContent = "Work";
		setTimer(studyTime);
	}

	displayTimer();
}
//////////////////
// Sound navbar //
//////////////////

// function to toggle the sound
function toggleSound(keyNum) {
    const sound = document.querySelector(`audio[data-key="${keyNum}"]`);
    const btn = document.querySelector(`button[data-key="${keyNum}"]`);
    const dot = document.querySelector(`span[data-key="${keyNum}"]`)
    if (!sound) return;

    if (sound.paused) {
    	btn.classList.add('playing');
    	sound.currentTime = 0;
    	sound.play();
    	dot.classList.add('show');
    }
    else {
    	btn.classList.remove('playing');
    	sound.pause();
    	dot.classList.remove('show');;
    }
}

// get queryList of sound buttons
const soundButtons = Array.from(document.querySelectorAll('.sound'));
soundButtons.forEach((button) => {
	// When you click a sound button -> turn respective audio on
  	button.addEventListener('click', 
  		function() {
  			toggleSound(button.getAttribute('data-key'));
  			button.children[0].style.opacity = "1";
  			button.children[1].style.display = "none";
  		});

  	// When you hover over button -> show respective description
  	button.addEventListener('mouseenter',
  		function() {
  			if (!(button.classList.contains("playing"))) {
	  			button.children[0].style.opacity = "0.1";
	  			button.children[1].style.display = "block";
	  		}
  		});

 	// Revert button to original style when mouse is not hovered over
  	button.addEventListener('mouseleave',
  		function() {
  			button.children[0].style.opacity = "1";
  			button.children[1].style.display = "none";
  		});
});

var muteBtn = document.getElementById('mute');

muteBtn.onmouseover = function() {
	muteBtn.children[0].style.opacity = "0.1";
	muteBtn.children[1].style.display = "block";
}

muteBtn.onmouseout = function() {
	muteBtn.children[0].style.opacity = "1";
	muteBtn.children[1].style.display = "none";
}

muteBtn.onclick = function() {
	// list of all audio elements
	// pause all audio elements
	var sounds = document.getElementsByTagName('audio');
  	for(i = 0; i < sounds.length; i++) {
  		sounds[i].pause();
  	}

  	// hide all dots
 	const dots = Array.from(document.querySelectorAll('#dot'));
 	dots.forEach((span) => {
 		span.classList.remove('show');
 	});

  	// soundButtons was already declared above this function
  	// remove playing class from all sound buttons
  	soundButtons.forEach((button) => {
  		button.classList.remove('playing');
  	});
};

///////////////////////////////////
// Custom Time Setting functions //
///////////////////////////////////
let inputStudyTime = (document.getElementsByName("studytime")[0].value) * 60;
let inputBrkTime = (document.getElementsByName('breaktime')[0].value)  * 60;

function readTimeSettings() {
	inputStudyTime = (document.getElementsByName("studytime")[0].value) * 60;
	inputBrkTime = (document.getElementsByName('breaktime')[0].value) * 60;
}

function updateTimeSettings() {
	studyTime = inputStudyTime;
	brkTime = inputBrkTime;
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

// DOM elements of the actual text input boxes
var studyTimeBox = document.getElementsByName("studytime")[0];
var brkTimeBox = document.getElementsByName('breaktime')[0];

function formatSettingsInput () {
	// format the time to look nice
	if (studyTimeBox.value < 10 && studyTimeBox.value[0] != "0") {
		studyTimeBox.value = "0" + studyTimeBox.value;
	}
	if (brkTimeBox.value < 10 && brkTimeBox.value[0] != "0") {
		brkTimeBox.value = "0" + brkTimeBox.value;
	}
}

savebtn.onclick = function () {
	readTimeSettings();
	formatSettingsInput();
	modal.style.display = "none";
	if (!timerOn && timerReset) {
		updateTimeSettings();
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
    studyTimeBox.value = inputStudyTime / 60;
	brkTimeBox.value = inputBrkTime / 60;
	formatSettingsInput();
    displayTimer();
}

// Keyboard Inputs
// space bar = start/stop (keycode = 32)
// 'r' = reset (keycode = 82)

window.addEventListener('keydown', function(e) {
	if (e.keyCode == 83) {
		if (timerOn) {
			stopTimer();
		}
		else {
			startTimer();
		}
	}
	else if (e.keyCode == 82) {
		timerReset = true;
		timerOn = false;
		clearInterval(timerInterval)
		startBtn.classList.remove("btnOn");
		stopBtn.classList.remove("btnOn");
		resetBtn.classList.remove("disabled");
		counter = 0;
		readTimeSettings();

		if (checkPomodoro()) {
			setTimer(studyTime);
		}
		else {
			setTimer(brkTime);
		}
		displayTimer();
	}
});

// Sound bar Scripts
