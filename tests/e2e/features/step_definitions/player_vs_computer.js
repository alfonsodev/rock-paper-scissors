var world = require('../support/world');
var debug = function(msg, type) {
  var type = type || 'info';
  var logs = {
    info: require('debug')('features'),
    error: require('debug')('error')
  };
  logs[type](msg);
};

var pageMapper = {
  'main menu': 'index',
}

var normalize = function(str) {
  return str.toLowerCase().trim().replace(/ /g,"_");
}

module.exports = function() {
  var self = this;
  var pageTitles = {
    'selection': 'Selection'
  };
  this.baseUrl = 'http://localhost:8181';
  this.World = world;

  this.After(function(callback) {
    this.driver.quit().then(function(){
      callback();
    });
  });

  this.Given(/^I go to the "([^"]*)" page$/, function(page, callback) {
    this.driver.get(self.baseUrl + '/#' + normalize(page) + '.html');
    this.driver.getTitle().then(function(title) {
      if (title != pageTitles[normalize(page)]) {
        callback('Title at ' + page + ' should be ' +  pageTitles[normalize(page)]        + ' but "' + title +'" found instead');
      } else {
        callback();
      }
    });
  });

  this.When(/^I choose "([^"]*)"$/, function(name, callback) {
    // Write code here that turns the phrase above into concrete actions
    var elementName = normalize(name);
    this.driver
      .findElement(this.getById(elementName)).click().then(function() {
        debug('P1 click: ' + elementName);
        callback();
      }, function(e) {
        debugger;
        callback("ERROR: Cant click in the element " + elementName);
      });
  });

  this.When(/^computer chooses "([^"]*)"$/, function (computerChoice, callback) {
    var mockChoice = 'player2.setSelection("' + computerChoice + '");';
    mockChoice += "view.renderClass({ 'player2_selection': player2.getSelection() });";
    this.driver.executeScript(mockChoice).then(function(){
      callback();
    });
    
  });

  this.Given(/^see "([^"]*)" picture and "([^"]*)" picture$/, function (humanChoice, computerChoice, callback) {
    var self = this;
    this.driver
      .findElement(self.getById('player1_selection'))
      .getAttribute('class')
      .then(function(cssClasses) {
        var classes = cssClasses.split(' ');
        debug('P1 classes :' + cssClasses );
        if (classes.indexOf(humanChoice) < 0) {
          callback('[P1]ERROR: the element ' + humanChoice + ' is not found in ' + cssClasses);
        }
      })
      .then(function() {
        self.driver.findElement(self.getById('player2_selection'))
        .getAttribute('class').then(function(cssClasses) {
          var classes = cssClasses.split(' ');
          if (classes.indexOf(computerChoice) >= 0) {
            debug('P2 classes: ' + cssClasses);
            callback();
          } else {
            debug('[P2]ERROR: ' + computerChoice + ' not found in ' + cssClasses, 'error')
            callback('ERROR: the computer choice: ' + computerChoice + ' is not found "' + cssClasses +'" found instead');
          }
        });
      })

  });

this.Given(/^I wait "([^"]*)" seconds$/, function (seconds, callback) {
  setTimeout(function() {
      callback();
  }, seconds * 1000);
});

this.Then(/^I see "([^"]*)" as result (.*) vs (.*)$/, function (result,a,b, callback) {
  this.driver.findElement(this.getById('game_result')).then(function(elem) {
    elem.getText().then(function(text) {
      if (text == result) {
        callback();
      } else {
        callback('ERROR: Expected '+result+ ' found ' + text + '   ' + a + ':'+b);
      }
    });
  });
});

  this.Then(/^I should go to "([^"]*)" page$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    this.driver.getTitle().then(function(title) {
      var gamePageTitle = 'the game page';
      if (title === gamePageTitle) {
        debugger;
        callback();
      } else {
        debugger;
        callback('ERROR: game page should have title ' + gamePageTitle);
      }
    })
  });

  this.Then(/^I should see "([^"]*)" text as "([^"]*)"$/, function(playerName, target, callback) {
    var map = {
      "the name of player1": "player_1_name",
      "the name of player2": "player_2_name"
    };

    this.driver
      .findElement(this.getById(map[target])).getText().then(function(text) {
        if(text === playerName) {
          callback(); 
        } else {
          callback('ERROR: Player one name should be YOU');
        }
      }).then(null, function(e) {
        callback('ERROR: one fo this elements is not found ' + JSON.stringify(map));
      });
  });

  this.Then(/^I should be redirected to the "([^"]*)" page$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });

  this.Then(/^I should see "([^"]*)" buttons$/, function(arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });

  this.When(/^I click on$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });


  this.Then(/^I should be redirected after (\d+) seconds to "([^"]*)" page$/, function (arg1, arg2, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

};
