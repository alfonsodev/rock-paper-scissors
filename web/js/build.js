require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = function(players, game, router, view, config) {
	var player1 = players[0];
	var player2 = players[1];

	router.state('menu', function() {
		view.render('menu_screen');
	});

	router.state('selection', function() {
		player2.makeRandomSelection(game.elements);
		view.render('selection_screen', {
      'player1_avatar': '<img src="' + player1.getAvatar() + '" >'
    });
	});

	router.state('show', function() {
		var whoWins = game.getResult(player1.getSelection(), player2.getSelection());
		view.render('selection_screen', {
			'player1_selection': player1.getSelection(),
			'player2_selection': player2.getSelection()
		});
		view.renderClass({
			'player1_selection': player1.getSelection(),
			'player2_selection': player2.getSelection()
		});
    console.log(whoWins);
		router.goToState('result', {result: whoWins});
	});

	router.state('result', function() {
	 	view.render('selection_screen', {
      'game_result': game.getResult(player1.getSelection(), player2.getSelection())
    });
	});
};

module.exports = app;

},{}],2:[function(require,module,exports){
'use strict';

var Game = {
	elements: ['rock', 'paper', 'scissors'],
	getResult: function(p1, p2) {
		var posible = ['DRAW', 'YOU WIN', 'YOU LOSE'];
		var values = { 'rock' : 1, 'paper': 2, 'scissors': 3 };
		var result = (3 + values[p1] - values[p2]) % 3;

     	return posible[result];
	}
};

module.exports = Game;

},{}],3:[function(require,module,exports){
'use strict';

var Player = function(name) {
	var _name = name || 'YOU';
	var _selection = '';
  var _avatar = '';
};
Player.prototype.setAvatar = function(avatar) {
  this._avatar = avatar;
};
Player.prototype.getAvatar = function() {
  return this._avatar;
};
Player.prototype.getSelection = function() {
	return this._selection;
};

Player.prototype.setSelection = function(selection) {
	this._selection = selection;
};

Player.prototype.getName = function() {
	return this._name;
};

Player.prototype.makeRandomSelection = function(options) {
	var max = options.length;
	var min = 0;
	var selection = Math.floor(Math.random() * (max - min) + min);
	this._selection = options[selection];
};

module.exports = Player;

},{}],4:[function(require,module,exports){
'use strict';

var Router = function(doc, win) {
    this.routes = {};
    this.document = doc;
    this.window = win;
};

Router.prototype.state = function(stateName, callback) {
    this.routes[stateName] = callback;
};

Router.prototype.goToState = function(stateName, state) {
    var title = stateName[0].toUpperCase() + stateName.substr(1);
    var state = state || {};
    this.document.title = title;
    this.window.history.pushState(state, title, '/#' + stateName);
    this.routes[stateName]();
};

module.exports = Router;

},{}],5:[function(require,module,exports){
'use strict';

var View = function(doc) {
	this.document = doc;
};

View.prototype.render = function(key, variables) {
  this.document.querySelectorAll('#menu_screen')[0].style.display = 'none';
	this.document.querySelectorAll('#selection_screen')[0].style.display = 'none';
 	this.document.querySelectorAll('#' + key)[0].style.display = 'block';

	// update DOM
    for (var k in variables) {
        if (variables.hasOwnProperty(k)) {
			this.document.querySelectorAll('#' + k)[0].innerHTML = variables[k];
        }
    }

};

View.prototype.renderClass = function(classes) {
    for (var k in classes) {
        if (classes.hasOwnProperty(k)) {
            if (this.document.querySelectorAll('#' + k)) {

    	       this.document.querySelectorAll('#' + k)[0].setAttribute('class', 'item ' + classes[k]);
             }else{

             }
        }
    }
};

View.prototype.updateSelectionTitle = function(selection) {
	this.document.querySelectorAll('#selection_name')[0].innerHTML = selection;
};

View.prototype.registerUIEventes = function(Game, player1, router) {
    var self = this;
    this.document.querySelectorAll('#selection_screen')[0].addEventListener('click', function(event) {
        var item;
        event.stopPropagation();
        if (event.target.nodeName === 'IMG') {
            item = event.target.alt;
        } else if (Game.elements.indexOf(event.target.id) >= 0) {
            item = event.target.id;
        }

        if(item) {
            player1.setSelection(item);
            router.goToState('show');
        }
    });

    this.document.querySelectorAll('#selection_screen')[0].addEventListener('mouseover', function(event) {
        var selection;
        event.stopPropagation();
        if (event.target.nodeName === 'IMG') {
            selection = event.target.alt;
        } else if (Game.elements.indexOf(event.target.id) >= 0) {
            selection = event.target.id;
        }

        if(selection) {
            self.document.querySelectorAll('#selection_name')[0].innerHTML = selection.toUpperCase();
        }
    });

    var clearAllSelections = function() {
      [].forEach.call(document.querySelectorAll('.img-avatar'), function (el) {
        el.setAttribute('class', 'img-avatar');
      });
    };

    //Avatar events
    [].forEach.call(document.querySelectorAll('.img-avatar'), function (el) {
      el.addEventListener('click', function() {
        clearAllSelections();
        if(el.getAttribute('class') == 'img-avatar selected') {
          el.setAttribute('class', 'img-avatar');
          player1.setAvatar('');
        } else {
          el.setAttribute('class', 'img-avatar selected');
          player1.setAvatar(el.getAttribute('src'));
        }
      }, false);
});





};
module.exports = View;

},{}],"app":[function(require,module,exports){
'use strict';

module.exports.Player = require('./lib/Player.js');
module.exports.Router = require('./lib/Router.js');
module.exports.View = require('./lib/View.js');
module.exports.Game = require('./lib/Game.js');
module.exports.App = require('./app.js');

},{"./app.js":1,"./lib/Game.js":2,"./lib/Player.js":3,"./lib/Router.js":4,"./lib/View.js":5}]},{},[]);
