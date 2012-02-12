SRC = moment.isocalendar.js

.PHONY: test mocha test-watch lint
test: mocha lint 

mocha:
	./node_modules/.bin/mocha

test-watch: 
	./node_modules/.bin/mocha --watch $(SRC) test/isocalendar.js

lint:
	./node_modules/.bin/jshint $(SRC)
