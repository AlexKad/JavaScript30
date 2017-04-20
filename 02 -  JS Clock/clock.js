const secHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

function changeHandPosition(){
	const now = new Date();

	const sec = now.getSeconds();
	const secDeg = ((sec/60)*360) + 90;
	secHand.style.transform = `rotate(${secDeg}deg)`;

	const mins = now.getMinutes();
	const minDeg = (mins/60)*360 + ((sec/60)*6) + 90;
	minHand.style.transform = `rotate(${minDeg}deg)`;

	const hour = now.getHours();
	const hourDeg = (hour/12)*360 + (mins/60)*30 + 90;
	hourHand.style.transform = `rotate(${hourDeg}deg)`;
}


setInterval(changeHandPosition, 1000);
changeHandPosition();