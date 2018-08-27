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
timer.innerHTML = convertSeconds(timeLeft);


function timeIt() {
	if (counter < timeLeft)
	{
		counter++;
	}
	timer.innerHTML = convertSeconds(timeLeft - counter);
}

setInterval(timeIt, 1000);
