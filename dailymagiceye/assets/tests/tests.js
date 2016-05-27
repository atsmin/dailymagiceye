require('mocha-generators').install();

var Nightmare = require('nightmare');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var settings = {
  url: 'http://ats-min.com/dailymagiceye',
  timeout: 50000
};

describe('Test Daily MagicEye', function() {

  var nightmare;

  beforeEach(function*() {
    nightmare = Nightmare({
      // show: true,
    });
  });

  afterEach(function*() {
    yield nightmare.end();
  });

  it('The title should be "Daily MagicEye"', function*() {
    this.timeout(settings.timeout);
    var title = yield nightmare
      .goto(settings.url)
      .title();
    expect(title).to.equal('Daily MagicEye');
  });

  it('The image should be exists', function*() {
    this.timeout(settings.timeout);
    var exists = yield nightmare
      .goto(settings.url)
      .exists('#image');
    exists.should.be.true;
  });

  it('The side menu should be exists', function*() {
    this.timeout(settings.timeout);
    var exists = yield nightmare
      .goto(settings.url)
      .exists('#side');
    exists.should.be.true;
  });

  it('The refresh button should be clickable', function*() {
    this.timeout(settings.timeout);
    var checked = yield nightmare
      .goto(settings.url)
      .click('#refresh')
      .evaluate(function () {
        return document.querySelector('input[type=radio]').checked;
      });
    checked.should.be.true;
  });

  it('The nav tab should be clickable', function*() {
    this.timeout(settings.timeout);
    var checked = yield nightmare
      .goto(settings.url)
      .click('.textTab')
      .evaluate(function () {
        return document.querySelector('input[type=radio]').checked;
      });
    checked.should.be.true;
  });

  it('The help link should open intro', function*() {
    this.timeout(settings.timeout);
    var exists = yield nightmare
      .goto(settings.url)
      .click('#help')
      .wait(1000)
      .exists('.introjs-tooltip');
    exists.should.be.true;
  });
});
