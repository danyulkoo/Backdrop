// SCRIPT

///////////////////
// Timer scripts //
///////////////////

// converting seconds
function convertSeconds(s) {
	let min = Math.floor(s/60);
	let seconds = s % 60;

	// Adding zeros to min and sec values less than 10
	if (min >= 10 && seconds < 10) {
		return min + ':0' + seconds;
	}
	else if (min < 10 && seconds >= 10) {
		return '0' + min + ':' + seconds;
	}
	else if (min < 10 && seconds < 10) {
		return '0' + min + ':0' + seconds;
	}
	else if (min <= 0 && seconds <= 0) {
		return "00:00";
	}
	else {
		return min + ':' + seconds;
	}
}

// Timer variables
const timer = document.querySelector('#timer'); // Timer HTML element 
let studyTime = 1500; // 1500 seconds -> 25 min
let brkTime = 300;	// 300 seconds -> 5 min
var alarm = document.getElementById("alarm"); // Alarm HTML audio element

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
var shuffleBtn = document.querySelector('#shuffle'); // Shuffle button HTML element
var title = document.querySelector('#pomodoro'); // Title HTML element

// Function to easily check if user is on work or break
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
	// change buttons styles appropriately
	startBtn.classList.add("btnOn");
	stopBtn.classList.remove("btnOn");
	resetBtn.classList.add("disabled");

	// Turn timer on only if timer is not on already
	if (!timerOn)
	{
		timerInterval = setInterval(timeIt,1000);
		timerOn = true; // switch flag to show timer is on
		timerReset = false;
	}
}

// used later in the stopTimer() & resetTimer()
function turnTimerOff() {
	clearInterval(timerInterval);
	timerOn = false;
}

// Main timer function
function timeIt() {
	// when timer runs out
	if (counter >= timeLeft) {
		timer.textContent = "00:00";
		// turn off styles for start & reset buttons
		startBtn.classList.remove("btnOn");
		resetBtn.classList.remove("disabled");
		turnTimerOff();

		// Play alarm sound
		alarm.currentTime = 0;
		alarm.play();

		timerReset = true;
		updateTimeSettings(); // this function written below under time settings section
		
		// Switch to Break if on Work and vice versa
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
		alarm.pause();
	}
	else if (counter < timeLeft) {
		counter++;
	}

	displayTimer();
}

// function to stop/pause timer
function stopTimer() {
	// only activate if timer is already running
	if (timerOn)
	{
		turnTimerOff();
		// change corresponding button styles
		stopBtn.classList.add("btnOn");
		startBtn.classList.remove("btnOn");
		resetBtn.classList.remove("disabled");
		timerOn = false;
		timerReset = false;
	}
}

// resets timer completely
function resetTimer() {
	timerReset = true; // switch flag to show timer has been reset
	
	// only reset timer if timer is currently paused
	// don't want to allow timer to be reset if its running
	if (!timerOn) {
		turnTimerOff();
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

// switches between work and break sessions
function shuffle() {
	// remove all button stylings
	stopBtn.classList.remove("btnOn");
	startBtn.classList.remove("btnOn");
	resetBtn.classList.remove("disabled");
	turnTimerOff(); // turn timer off if it's running
	updateTimeSettings();

	// switch title to corresponding session
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
	// select audio element corresponding to certain data key
	const sound = document.querySelector(`audio[data-key="${keyNum}"]`);
	// select button element corresponding to the same data key
	const btn = document.querySelector(`button[data-key="${keyNum}"]`);
	// select dot corresponding to the same data key
	const dot = document.querySelector(`span[data-key="${keyNum}"]`)
	
	if (!sound) return; // return if there is no audio element
	
	// if sound is not playing
    if (sound.paused) {
		btn.classList.add('playing'); // add button style class
		
		// play sound
    	sound.currentTime = 0;
		sound.play();
		
		// show dot indicator
    	dot.classList.add('show');
	}
	// if sound is already playing, pause the sound
    else {
    	btn.classList.remove('playing'); // remove button style class
    	sound.pause(); // pause audio
    	dot.classList.remove('show'); // hide dot indicator
    }
}

// get queryList of sound buttons
const soundButtons = Array.from(document.querySelectorAll('.sound'));

// iterate through the sound buttons
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

// Get mute button element
var muteBtn = document.getElementById('mute');

// Hover effects
muteBtn.onmouseover = function() {
	if (!document.documentElement.classList.contains('is-touch')) {
		muteBtn.children[0].style.opacity = "0.1";
		muteBtn.children[1].style.display = "block";
	}
}

muteBtn.onmouseout = function() {
	muteBtn.children[0].style.opacity = "1";
	muteBtn.children[1].style.display = "none";
}

muteBtn.onclick = function() {
	// list of all audio elements and pause each sound
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

// read the current time values in settings and store it into temp variables
function readTimeSettings() {
	inputStudyTime = (document.getElementsByName("studytime")[0].value) * 60;
	inputBrkTime = (document.getElementsByName('breaktime')[0].value) * 60;
}

// update actual studyTime and brkTime variables
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
	// format the time in settings to look consistent
	// i.e. "5 min" -> "05 min"
	if (studyTimeBox.value < 10 && studyTimeBox.value[0] != "0") {
		studyTimeBox.value = "0" + studyTimeBox.value;
	}
	if (brkTimeBox.value < 10 && brkTimeBox.value[0] != "0") {
		brkTimeBox.value = "0" + brkTimeBox.value;
	}
}

// when user clicks save button on settings
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

// When the user clicks on <span> (x)
span.onclick = function() {
    modal.style.display = "none"; // close modal
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
