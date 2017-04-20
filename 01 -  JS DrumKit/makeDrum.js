
function playSound(e){
	let keyCode = e.keyCode;	
	let audio = document.querySelector(`audio[data-key='${keyCode}'`);
	let key = document.querySelector(`div.key[data-key='${keyCode}'`);
	
	if(audio && key){
		audio.currentTime = 0;
		audio.play();
		key.classList.add('playing');
	}
}

function removeTransition(e){
	if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

document.addEventListener('keydown', playSound);

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition ));
