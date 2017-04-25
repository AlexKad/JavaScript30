const canvas = document.querySelector('#canvas');

canvas.width=  document.querySelector('.draw').offsetWidth;
canvas.height = document.querySelector('.draw').offsetHeight;

const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let isRainbowColor = false;
let hue = 0;  // from 0 to 360 https://en.wikipedia.org/wiki/Hue

//-----------------------------Work with canvas-----------------------------//
function draw(e){
	if(!isDrawing) return; // stop the fn from running when they are not moused down

	ctx.beginPath();
	//starting from
	ctx.moveTo(lastX, lastY);
	//go to
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();

	if(isRainbowColor){
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;  // hue, saturation, lightness
		hue++;
		if(hue > 360) hue = 0;
	}
		
	[lastX, lastY] = [e.offsetX, e.offsetY];
}

if(canvas){
	canvas.addEventListener('mousedown', (e)=>{
		isDrawing = true;
		[lastX, lastY] = [e.offsetX, e.offsetY];
	});

	canvas.addEventListener('mousemove', draw);
	canvas.addEventListener('mouseup', ()=> isDrawing = false);
	//canvas.addEventListener('mouseout', ()=> isDrawing = false);
}



//-----------Work with controls--------------------//

const backgroundColor = document.querySelector('#backgroundColor');
const brushWidthInput = document.querySelector('#brushWidth');
const brushColorInput = document.querySelector('#brushColor');
const chkRainbow = document.querySelector('#chkRainbow');
const clearBtn = document.querySelector('#clearBtn');


backgroundColor.addEventListener('change', (e)=>{
	ctx.fillStyle = e.target.value;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
});

brushWidthInput.addEventListener('change', (e)=>{
	ctx.lineWidth = e.target.value;
});

brushColorInput.addEventListener('change', (e)=>{
	ctx.strokeStyle = e.target.value;
});

chkRainbow.addEventListener('change', (e)=>{
	isRainbowColor = e.target.checked;
	brushColorInput.disabled = isRainbowColor;
	if(!isRainbowColor){
		ctx.strokeStyle = brushColorInput.value;
	}
	else{
		hue = 0;
	}
});

clearBtn.addEventListener('click', (e)=>{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});