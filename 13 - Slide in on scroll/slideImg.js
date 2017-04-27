function debounce(func, wait = 20, immediate = true) {
  var timeout;

  return function() {
    var context = this, 
        args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImgs = document.querySelectorAll('.slide-in');

function slideInImg(e){
  const windowBottom = window.scrollY + window.innerHeight;

  sliderImgs.forEach( img => {

    // window is not scrolled to the bottom of the image yet
    const imageBottom = img.offsetTop + img.height;    
    const isNotScrolledPast = window.scrollY < imageBottom;

    //window is scrolled so half of height img shown
    const slideInAt =  windowBottom - img.height/2;
    const isHalfShown = slideInAt > img.offsetTop;

    if(isHalfShown && isNotScrolledPast){
      img.classList.add('active');
    }else{
      img.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(slideInImg));
