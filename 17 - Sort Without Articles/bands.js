//Need to sort array of band without 'the', 'articles', 'a', 'an'
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const arrayReservedWords = ["the", "a", "an"];

function sortWithReservedWords(a,b){
  let clearA = getNameWithoutArticles(a, arrayReservedWords);
  let clearB = getNameWithoutArticles(b, arrayReservedWords);
  
  return clearA.toLowerCase() > clearB.toLowerCase() ? 1: -1;
}

function getNameWithoutArticles(name, arrayReservedWords){
  let clearName = name;
  arrayReservedWords.forEach(word => {
    if(name.toLowerCase().startsWith(word + " ")){
      clearName = name.slice(word.length+1);
    }
  });
  return clearName;
}

//OR we can do the same with regular expression
function strip(name){
  let reg = "";
  return name.replace(/^(the |a |an )/i, '').trim();
}

const sortedBands = bands.sort(sortWithReservedWords);

function renderBandsList(bands, li) {
  const html = bands.map(band =>{
      return `<li>${band}</li>`;
  }).join('');
  li.innerHTML = html;
}

renderBandsList(sortedBands, document.querySelector("#bands"));
