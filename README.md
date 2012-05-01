# moment.isocalendar.js
This plugin provides a Python-like isocalendar method to moment objects.

## How to use?
Simply call the `isocalendar` method on any moment object.  It returns an array
of four items: `year`, `week_of_year`, `day_of_week`, `minutes_since_midnight`.

```javascript
moment(new Date(2011, 11, 23, 14, 30)).isocalendar();
// [2011, 51, 5, 870]
```

Additionally, there is a function that provides the inverse functionality, it
takes an isocalendar array and returns a moment object.

```javascript
moment.fromIsocalendar([2011, 51, 5, 870]).format('LLLL');
// "Friday, December 23 2011 2:30 PM"
```

### Getters and Setters
This plugin additionally provides getters and setters for the ISO representation
values.

```javascript
var m = moment([2012, 3, 8]); // Sunday, 2012 April 8th

m.isoday(); // 7
m.isoweek(); // 14

m.isoday(6).format('YYYY-MM-DD'); // "2012-04-07"
```

## How to test?
Make sure you have all the dependencies and run `make test`.  If you want to
test in the browser, visit the `test/test.html` file.
