TESTS_FILES=$(shell find tests/ -name "*Test.js")
MOCHA=./node_modules/.bin/mocha
ISTANBUL=./node_modules/.bin/istanbul
COVERALLS=./node_modules/coveralls/bin/coveralls.js

e2e:
	./node_modules/.bin/cucumber.js ./tests/e2e/features/player_vs_computer.feature --require ./tests/e2e/features/step_definitions/player_vs_computer.js

test:
	$(MOCHA) -R spec $(TESTS_FILES)

bro:
	./node_modules/.bin/browserify -im -r ./app:app | ./node_modules/.bin/uglifyjs > web/js/build.js
up:
	cd web; python -m SimpleHTTPServer 8181
instrument:
	# Remove libcov if exits
	rm -rf app/lib-cov/
	rm -rf html-report/
	NODE_PATH=./ $(ISTANBUL) instrument app/ -o app-cov/ 

coverage: instrument
	APP_COV=1 ISTANBUL_REPORTERS=lcov,text-summary,html $(MOCHA)  --reporter mocha-istanbul $(TESTS_FILES)
	echo 'Coverage report avaiable at ./lcov-report/app/index.html'

test-coveralls: 
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	cat lcov.info | $(COVERALLS)

.PHONY: test bro up coverage e2e
