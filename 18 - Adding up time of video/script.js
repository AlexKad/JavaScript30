//from NodesList to array of li items
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

const seconds = timeNodes
    .map(node => node.dataset.time)  //from array of li items to arry of time  
    .map(timeCode => {
      const [mins, secs] = timeCode.split(':').map(parseFloat);   //from 4:50 to mins=4 sec=50
      return (mins * 60) + secs;          //return array of full seconds
    })
    .reduce((total, vidSeconds) => total + vidSeconds);  // return the sum of seconds of all videos

    let secondsLeft = seconds;

    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;

    const mins = Math.floor(secondsLeft / 60);

    secondsLeft = secondsLeft % 60;

    console.log(hours, mins, secondsLeft); //hours mins and seconds for the bunch of all videos