var moment = require('moment')
  , should = require('should')
  , exec = require('child_process').exec;

require('../moment.isocalendar');
;(function(m) {

  function date2iso(date, done) {
    var date_string = date.format('YYYY M D H m');

    exec('python test/helpers/date2iso.py ' + date_string, function(error, stdin, stdout) {
      var expected = JSON.parse(stdin);

      date.isocalendar().should.eql(expected);

      if ( done )
        done();
    });
  }

  function iso2date(date, done) {
    var iso = date.isocalendar()
      , iso_string = iso.join(' ');

    exec('python test/helpers/iso2date.py ' + iso_string, function(error, stdin, stdout) {
      var resp = JSON.parse(stdin)
        , expected = moment(new Date(resp[0], resp[1] - 1, resp[2], resp[3], resp[4]))
        , actual = moment.fromIsocalendar.apply(moment, iso);
      
      actual.format('LLLL').should.equal(expected.format('LLLL'));
    });

    if ( done )
      done();
  }

  function testBackAndForth(date, done) {
    var relative = date.isocalendar()
      , date2 = moment.fromIsocalendar.apply(moment, relative)
      , relative2 = date2.isocalendar()
      ;

    date.format('LLLL').should.equal(date2.format('LLLL'));
    relative.should.eql(relative2);

    if ( done )
      done();
  }

  function rand(max) {
    return Math.floor(Math.random() * max);
  }

  function doDone(bool, done) {
    return function() { if ( bool )  done(); };
  }

  function randomly(times, func, done) {
    for (var i = times; i > 0; i--) {
      var date = moment(new Date(2000, 0, 1, 0, 0)).add('minutes', rand(365 * 100 * 60 * 24));

      func(date, doDone(i == 1, done));
    }
  }

  describe('isocalendar', function() {
    // if you start spawning too much, test start failing
    var times = 50;

    it('random testBackAndForth', function(done) {
      randomly(times, testBackAndForth, done);
    });

    it('random iso2date', function(done) {
      randomly(times, iso2date, done);
    });

    it('random date2iso', function(done) {
      randomly(times, date2iso, done);
    });
  });

})(moment);
