var webdriver = require("selenium-webdriver"),
    until = require('selenium-webdriver').until;

var selenium;
 

var World = module.exports = function(callback) {

    this.driver = new webdriver
      .Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();

    this.visit = function(path, callback) {
      this.driver.get(path);
      callback();
    }

    this.titleIs = function(title, callback) {
      this.driver.wait(until.titleIs(title), 1000)
      .then(function() {
        callback();
      });
    }

    this.getById = function(name) {
      var elem;
      try {
        elem = webdriver.By.id(name);
      } catch(e) {
        console.log(e);
      }
      return elem;
    }

    this.getDriver = function() {
      return this.driver;
    }
    callback();
}

process.on('uncaughtException', function (err) {
   console.log(err);
});

/*
var myAfterHooks = function () {
    this.registerHandler('AfterFeatures', function (event, callback) {
      this.driver.close();
      callback();
    });
}

module.exports = myAfterHooks;
*/
