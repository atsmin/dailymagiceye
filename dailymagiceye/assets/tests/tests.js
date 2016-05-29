require('mocha-generators').install();

var Nightmare = require('nightmare');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var settings = {
  url: 'http://ats-min.com/dailymagiceye',
  timeout: 100000
};

describe('Test Daily MagicEye', function() {

  var nightmare;
  this.timeout(settings.timeout);

  beforeEach(function*() {
    nightmare = Nightmare({
       // show: true,
    }).goto(settings.url);
  });

  afterEach(function*() {
    yield nightmare.end();
  });

  it('The title should be "Daily MagicEye"', function*() {
    var title = yield nightmare.title();
    expect(title).to.equal('Daily MagicEye');
  });

  it('The magiceye image should exist', function*() {
    var exists = yield nightmare.exists('#magic-eye');
    exists.should.be.true;
  });

  it('The side menu should contain five radio buttons', function*() {
    var num_of_radios = yield nightmare
      .evaluate(function () {
        return document.querySelectorAll('[name=textRadio]').length;
      });
    expect(num_of_radios).to.equal(5);
  });

  it('The side menu should contain five nav tabs', function*() {
    var num_of_tabs = yield nightmare
      .evaluate(function () {
        return document.querySelectorAll('.textTab').length;
      });
    expect(num_of_tabs).to.equal(5);
  });

  it('The refresh button should be clickable and change the words', function*() {
    var before_click = yield nightmare
      .evaluate(function () {
        els = document.querySelectorAll('[name=textRadio]');
        return Array.prototype.map.call(els, function (el) {
            return el.value;
        });
      });
    var after_click = yield nightmare
      .click('#refresh')
      .evaluate(function () {
        els = document.querySelectorAll('[name=textRadio]');
        return Array.prototype.map.call(els, function (el) {
            return el.value;
        });
      });
    expect(before_click).to.not.deep.equal(after_click);
  });

  it('The nav tabs should be clickable and change the words', function*() {
    var before_click = yield nightmare
      .evaluate(function () {
        els = document.querySelectorAll('[name=textRadio]');
        return Array.prototype.map.call(els, function (el) {
            return el.value;
        });
      });
    var after_click = yield nightmare
      .click('.textTab:nth-child(1) a')
      .evaluate(function () {
        els = document.querySelectorAll('[name=textRadio]');
        return Array.prototype.map.call(els, function (el) {
            return el.value;
        });
      });
    expect(before_click).to.not.deep.equal(after_click);
  });

  it('The help link should open intro', function*() {
    var exists = yield nightmare
      .click('#help')
      .wait(1000)
      .exists('.introjs-tooltip');
    exists.should.be.true;
  });
});
