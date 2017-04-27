const video = document.querySelector('.player__video.viewer');
const player = document.querySelector('.player');
const playBtn = document.querySelector('.player__button.toggle');
const rangeControls = document.querySelectorAll('input[type="range"]');
const skipControls = document.querySelectorAll('button[data-skip]')
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

function toggleVideo(){
	const method = video.paused? 'play' : 'pause';
	video[method]();
}

function updatePlayBtn(){
	const state = video.paused ? '►' : '❚ ❚';
	playBtn.textContent = state;
}

function handleRangeUpdate(){
	video[this.name] = this.value;
}

function handleSkip(){
	video.currentTime += parseFloat(this.dataset['skip']);
	changeProgressBar();
}

function scrub(e){
	video.currentTime = (e.offsetX/this.offsetWidth) * video.duration;
}

function changeProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

document.addEventListener('keydown', (e)=> { if(e.code === 'Space') toggleVideo(e);})
video.addEventListener('click', toggleVideo);
video.addEventListener('play', updatePlayBtn);
video.addEventListener('pause', updatePlayBtn);
video.addEventListener('timeupdate', changeProgressBar);

playBtn.addEventListener('click', toggleVideo);

rangeControls.forEach(control => control.addEventListener('change', handleRangeUpdate));
skipControls.forEach(control => control.addEventListener('click', handleSkip));

let mousedown = false;
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// progress.addEventListener('mousedown', () => mousedown = true);
// progress.addEventListener('mouseup', () => mousedown = false);
