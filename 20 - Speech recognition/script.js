 window.SpeechRecognition = 
 		window.SpeechRecognition || window.webkitSpeechRecognition;

 const recognition = new SpeechRecognition();
 recognition.interimResults = true;

 let p = document.createElement('p');
 const words = document.querySelector('.words');
 words.appendChild(p);


recognition.addEventListener('result', e=> {
 	console.log(e.results);

 	const speechText = Array.from(e.results)
 		.map(result => result[0])
 		.map(result => result.transcript)
 		.join('');

 	p.textContent = speechText;

 	if(e.results[0].isFinal){  //end of phrase. pronounced with pause
 		p = document.createElement('p');
 		words.appendChild(p);
 	}

 	if(speechText.includes('get the weather')){
 		console.log('the weather today is 75F');
 	}
 });


recognition.addEventListener('end', recognition.start);

 recognition.start();