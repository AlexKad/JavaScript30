const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let score = 0; 
let isTimeUp = false;

function getRandomTime(min,max){
	return Math.floor(Math.random()*(max-min) + min);
}

function getRandomHole(holes){
	const ind = Math.floor(Math.random()*holes.length);
	const hole = holes[ind];
	if(hole === lastHole){
		return getRandomHole(holes);
	}
	lastHole = hole;
	return hole;
}

function peep() {
    const time = getRandomTime(300, 1200);
    const hole = getRandomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
}

function startGame() {
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
	peep();
	setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
	if(!e.isTrusted) return; // isTrusted = true only if event made by user click (not script or what else)
	score++;
	this.parentNode.classList.remove('up');
	scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
