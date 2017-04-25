const chkboxes = document.querySelectorAll(".item input[type=checkbox]");

let lastChecked;
function clickHandler(e){
	let from, to;
	if(e.shiftKey && this.checked){
		chkboxes.forEach( chk => {
			if(chk === lastChecked) from = Array.from(chkboxes).indexOf(chk);
			if(chk === this) to = Array.from(chkboxes).indexOf(chk);
		});
		if(to > from){
			for( let i = from; i<= to; i++){
				chkboxes[i].checked = true;
			}
		}
		if(from > to){
			for( let i = to; i<= from; i++){
				chkboxes[i].checked = true;
			}
		}
	}
	lastChecked = this;
}


chkboxes.forEach( chk => {
	chk.addEventListener('click', clickHandler);
});


//more elegant and shorter solution

// function handleCheck(e) {
//   // Check if they had the shift key down
//   // AND check that they are checking it
//   let inBetween = false;
//   if (e.shiftKey && this.checked) {
//     // go ahead and do what we please
//     // loop over every single checkbox
//     checkboxes.forEach(checkbox => {
//       console.log(checkbox);
//       if (checkbox === this || checkbox === lastChecked) {
//         inBetween = !inBetween;
//         console.log('Starting to check them inbetween!');
//       }
//       if (inBetween) {
//         checkbox.checked = true;
//       }
//     });
//   }
//   lastChecked = this;
// }