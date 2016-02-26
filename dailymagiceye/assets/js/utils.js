import $ from 'jquery';
import _ from 'lodash';
import Spinner from 'fgnass/spin.js';

export function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomHex(start, end) {
  hex = _.range(0, 10).concat('ABCDEF'.split(''));
  return randomChoice(_.slice(hex, hex.indexOf(start), hex.indexOf(end) + 1));
}

export function getImageSize() {
  if (window.innerWidth > window.innerHeight) {
    // PC
    return [window.innerWidth * 0.50, window.innerHeight * 0.75];
  } else {
    // Mobile
    return [window.innerWidth, window.innerHeight * 0.50];
  }
}

var instance = Symbol();
export class SpinnerSingleton {
  static getSpinner() {
    if (!this[instance]) {
      var target = document.getElementById('spinner');
      var opts = {lines: 13, length: 40, width: 15, radius: 60, scale: 1.25};
      var spinner = new Spinner(opts);
      spinner.spin = _.partial(spinner.spin, target);
      this[instance] = spinner;
      return spinner;
    } else {
      return this[instance];
    }
  }
  static remove() {
    this[instance] = null;
  }
}
