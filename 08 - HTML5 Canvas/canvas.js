const canvas = document.querySelector('#canvas');

canvas.width= window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e){
	if(!isDrawing) return; // stop the fn from running when they are not moused down

	ctx.beginPath();
	//starting from
	ctx.moveTo(lastX, lastY);
	//go to
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();

	[lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e)=>{
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', ()=> isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);