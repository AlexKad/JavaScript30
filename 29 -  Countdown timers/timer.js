let interval;
const timeleft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	clearInterval(interval);
	const now = Date.now();
	const then = now + seconds*1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	interval = setInterval(()=>{
		const secLeft = Math.round((then - Date.now())/1000);
		if(secLeft < 0){
			clearInterval(interval);
			return;
		}
		displayTimeLeft(secLeft);
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds/60);
	const sec = seconds%60;
	const displayTime = `${minutes}:${sec<10? '0':''}${sec}`;

	document.title = displayTime;
	timeleft.textContent = displayTime;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});