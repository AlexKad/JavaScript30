const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideoFromWebCam(){
	navigator.mediaDevices.getUserMedia({ video: true, audio: false})  //return promise
		.then(localMediaStream =>{
			console.log(localMediaStream);
			video.src = window.URL.createObjectURL(localMediaStream);  //localMediaStream is object
			video.play();
		})
		.catch(err => {
			console.error('Impossible to run video because you denied the webcam use', err);
		});
}

function paintToCanvas(){
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(function(){
		ctx.drawImage(video, 0, 0, width, height);

		applyFilters(ctx, width, height);
	}, 16)
}

function applyFilters(ctx, width, height){
	// array of canvas pixels
	// pixels.data[0] red for 1 pixel,
	// pixels.data[1] green for 1 pixel
	// pixels.data[2] blue for 1 pixel
	// pixels.data[3] alpha for 1 pixel
	// pixel.data[4] red for 2 pixel etc... 
	let pixels = ctx.getImageData(0, 0, width, height); 
	//pixels = redEffect(pixels);
	pixels = rgbSplit(pixels);
	//ctx.globalAlpha = 0.1;
	//pixels = greenScreen(pixels);
	ctx.putImageData(pixels, 0, 0);
}

function redEffect(pixels){
	for(let i=0; i<pixels.data.length; i+=4){
		pixels.data[i] = pixels.data[i] + 100; //red
		pixels.data[i+1] = pixels.data[i+1] - 50; //green
		pixels.data[i+2] = pixels.data[i+2]*0.5; //blue
	}
	return pixels;
}

function rgbSplit(pixels){
	for(let i=0; i<pixels.data.length; i+=4){
		pixels.data[i-150] = pixels.data[i]; //red
		pixels.data[i+500] = pixels.data[i+1]; //green
		pixels.data[i-550] = pixels.data[i+2]; //blue
	}
	return pixels;
};

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];

    //if color not in between allowed range
    if ( red   >= levels.rmin
      && green >= levels.gmin
      && blue  >= levels.bmin
      && red   <= levels.rmax
      && green <= levels.gmax
      && blue  <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

function takePhoto(){
	//play sound
	snap.time = 0;
	snap.play();

	//take img and create download link
	const data = canvas.toDataURL("image/jpeg");
	const link = document.createElement('a');
	link.href = data;
	//link.textContent = "Download Image";
	link.innerHTML = `<img src=${data} alt="snapshot image" />`;
	strip.insertBefore(link, strip.firstChild);
}

getVideoFromWebCam();

video.addEventListener('canplay', paintToCanvas);
