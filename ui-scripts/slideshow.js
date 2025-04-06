//This needs to be hooked up to the endpoints once we have the logic in place to host screenshots.

initializeSlides();

function getSlides() {
  //returns an array of arrays that each contain the slides for a given slideshow
  let x = document.getElementsByClassName("slideshow");
  let slides = [];
  for (let i = 0; i < x.length; i++) {
    let slidename = "slides" + (i + 1);
    let y = document.getElementsByClassName(slidename);
    slides.push(Array.from(y));
  }
  return slides;
}

function showSlides(slideNumber, showIndex) {
  //Hides all slides, then displays the indicated slide
  let x = getSlides();
  x[showIndex].forEach((slide) => {
    slide.style.display = "none";
  });
  x[showIndex][slideNumber].style.display = "block";
}

function initializeSlides() {
  //Initializes slides on page load
  let x = getSlides();
  for (let i = 0; i < x.length; i++) {
    showSlides(0, i);
  }
}

function slideMove(direction, showIndex) {
  //Shows slide based on direction (either -1 or 1)
  showIndex--; //added just so the slide index can match "slide'x' naming scheme"
  let x = getSlides();
  let activeSlideIndex;
  for (let i = 0; i < x[showIndex].length; i++) {
    if (x[showIndex][i].style.display == "block") {
      activeSlideIndex = i + direction;
    }
  }
  if (activeSlideIndex > x[showIndex].length - 1) {
    activeSlideIndex = 0;
  } else if (activeSlideIndex < 0) {
    activeSlideIndex = x[showIndex].length - 1;
  }
  showSlides(activeSlideIndex, showIndex);
}
