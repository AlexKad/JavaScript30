const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(endpoint)          //returns promise
		.then(blob => blob.json())     // also returns promise
		.then(data => cities.push(...data));

function searchPlaces(searchWord, cities){
	const regex = new RegExp(searchWord,'gi');
	return cities.filter( place => {
		 return place.city.match(regex) || place.state.match(regex);
	});
};

function displayPlaces(e){
	const matches = searchPlaces(this.value, cities);
	let cityName, stateName;
	const regex = new RegExp(this.value, 'gi');
	const html = matches.map(place => {
		cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`);
		stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
		return `<li>
					<span>${cityName}, ${stateName}</span>
				    <span class='population'>${place.population}</span>
				</li>`;
	}).join('');
	list.innerHTML = html;  //innerHtml is might be unsafe, but here there are no opportunity for user data
};

const list = document.querySelector('.suggestions');
const input = document.querySelector('input.search');
if(input && list){
	input.addEventListener('change', displayPlaces);
	input.addEventListener('keyup', displayPlaces);	
}
