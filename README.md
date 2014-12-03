rock paper scissors game  
===  

![](https://api.travis-ci.org/alfonsodev/rock-paper-scissors.svg)
[![Coverage Status](https://coveralls.io/repos/alfonsodev/rock-paper-scissors/badge.png?branch=master)](https://coveralls.io/r/alfonsodev/rock-paper-scissors?branch=master)    


## Build and launch:  
     npm install  
     make bro  
     make up  
     open http://localhost:8181  
     
### BDD  
You can find Gherkin features in tests/e2e/features folder  

## Test:  
### e2e:  
For e2e tests you need chromedriver   
	 [mac](http://chromedriver.storage.googleapis.com/2.12/chromedriver_mac32.zip) or [linux](http://chromedriver.storage.googleapis.com/index.html?path=2.12/)   
	 somewhere in your $PATH after that you can execute:    

     make e2e
     
### unit + integration:  
     make test  
     
### Code coverage report:  
     make coverage  
     open ./lcov-report/app/index.html  
     
=============================== Coverage summary ===============================  
Statements   : 97.22% ( 70/72 )  
Branches     : 75% ( 6/8 )  
Functions    : 88.89% ( 16/18 )  
Lines        : 97.22% ( 70/72 )  





     
	 

