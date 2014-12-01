'use strict';

var Player = function(name) {
	var _name = name || 'YOU';
	var _selection = '';
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
