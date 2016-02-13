// image size
var imageWidth, imageHeight;
if (screen.availWidth > 480) {
  // PC
  [imageWidth, imageHeight] = [window.innerWidth * 0.5, 500];
} else {
  // Mobile
  [imageWidth, imageHeight] = [window.innerWidth, 500];
}
export const IMAGE_WIDTH = imageWidth;
export const IMAGE_HEIGHT = imageHeight;

// number of magic texts
export const NUM_OF_TEXTS = 5;

// max length of words
export const MAX_WORDS_LEN = 5;

export const MODE = {
   'word': 0,
   'kanji': 1,
   'symbol': 2,
   'snowman': 3
}
