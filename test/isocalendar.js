if ( typeof require !== 'undefined' )
{
  moment = require('moment');
  should = require('chai').should();
  require('../moment.isocalendar');
}


function date2iso(date, iso) {
  var m = moment(date);
  try {
    m.isocalendar().should.eql(iso);
  } catch(e) {
    console.log(date, m, m.isocalendar(), iso);
    throw e;
  }
}

function iso2date(iso, date) {
  moment.fromIsocalendar(iso).should.eql(moment(date));
}

function backAndForth(date) {
  var iso = date.isocalendar()
    , date2 = moment.fromIsocalendar(iso)
    ;

  try {
  date.should.eql(date2);
  } catch (e) {
    console.log(date.format('LLLL'), iso, date2.format('LLLL'), e);
    throw e;
  }
}

describe('isocalendar', function() {
  it('should work for a normal day', function() {
    date2iso([2012, 1, 11, 5, 14], [2012, 6, 6, 314]);
  });

  it('should transform sunday to 7', function() {
    date2iso([2012, 1, 12, 5, 14], [2012, 6, 7, 314]);
  });

  it('years that start on Monday', function() {
    date2iso([2017, 8, 4, 0, 0], [2017, 36, 1, 0]);
  });
});

describe('fromIsocalendar', function() {
  it('should work for normal days', function() {
    iso2date([2012, 6, 6, 314], [2012, 1, 11, 5, 14]);
  });

  it('should work for sundays', function() {
    iso2date([2012, 6, 7, 314], [2012, 1, 12, 5, 14]);
  });
});

describe('random', function() {
  it('extracted from random', function() {
    backAndForth(moment([2012, 7, 6, 6, 31]));
    backAndForth(moment([1977, 7, 1, 6, 2]));
    backAndForth(moment([1982, 7, 2, 6, 51]));
    backAndForth(moment([1992, 6, 25, 6, 24]));
    backAndForth(moment([1991, 4, 6, 6, 22]));
  });

  it('back and forth', function() {
    var times = 10000
      , i
      , _d
      , date
      ;

    for (i = 0; i < times; i++)
    {
      _d = new Date(Math.floor(Math.random() * 2000000000000));
      _d.setMilliseconds(0);
      _d.setSeconds(0);
      date = moment(_d);

      backAndForth(date);
    }
  });
});

describe('setters/getters', function() {
  it('year', function() {
    var m = moment([2012, 3, 10, 0]);

    m.isoyear().should.equal(2012);
    m.isoyear(1901).should.eql(moment([1901, 3, 9, 0]));
  });

  it('week', function() {
    var m = moment([2012, 3, 10, 0]);

    m.isoweek().should.equal(15);
    m.isoweek(16).should.eql(moment([2012, 3, 17, 0]));
  });

  it('day', function() {
    var m = moment([2012, 3, 10, 0]);

    m.isoday().should.equal(2);
    m.isoday(7).should.eql(moment([2012, 3, 15, 0]));
  });

  it('minute', function() {
    var m = moment([2012, 3, 10, 0]);

    m.isominute().should.equal(0);
    m.isominute(300).should.eql(moment([2012, 3, 10, 5]));
  });

  it('mutates the moment like other moment setters/getters', function() {
    var m = moment([2012, 3, 10, 0]);

    m.isoweek(16);
    m.isocalendar().should.eql([2012, 16, 2, 0]);
  });
});
