const form = document.querySelector("form");
const list = document.querySelector("ul.plates");

const items = JSON.parse(localStorage.getItem('items')) || [];
if(items.length>0){ renderItems(items, list); }


function addItem(e){
	e.preventDefault();
	const text = this.querySelector('input[name=item]').value;
	if(text){
		items.push({
			text,
			done: false
		})
	}
	renderItems(items, list);
	form.reset();
	localStorage.setItem('items', JSON.stringify(items));
}

function renderItems(items, list){
	list.innerHTML = items.map( (item, i) => {
		return `
			<li>
				<input type="checkbox" id="item${i}" data-index=${i} ${item.done? "checked" : ""}/>
				<label for="item${i}">${item.text}</label>
			</li>
		`;
	}).join('');
}

function setChecked(e){
	if(!e.target.matches('input')) return;
	const ind = e.target.dataset.index;
	items[ind].done = !items[ind].done;
	localStorage.setItem('items', JSON.stringify(items));
	renderItems(items, list);
}

form.addEventListener('submit', addItem);
list.addEventListener('click', setChecked);