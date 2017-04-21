const inputs = document.querySelectorAll('.controls input');

function setVariable(){
	const suffix = this.dataset.sizing || '';
	const value = this.value;
	document.documentElement.style.setProperty(`--${this.name}`, value + suffix);
}

inputs.forEach(input => input.addEventListener('change', setVariable));
inputs.forEach(input => input.addEventListener('mousemove', setVariable));