'use strict';
var config = { timeout: 100 };
var should = require('should');
var assert = require('assert');
var App = require('../../').App;
var Router = require('../../').Router;
var Player = require('../../').Player;
var Game = require('../../').Game;
var View = require('../../').View;

var elements = {};
var doc = {
	title: '',
	querySelectorAll: function(id) {
		elements[id] = [{
			style: { display: '' },
			innerHTML: '',
			setAttribute: function(attr, value) {
				elements[id][attr] = value;
			}
		}];
		return elements[id];
	}
};
var win = {
	history: {
		pushState: function(state, title, path) {

		}
	}
};

describe('App function', function() {

	it('selection', function() {
		var router = new Router(doc, win);
		var p1 = new Player('YOU');
		var p2 = new Player('COMPUTER');
		var view = new View(doc);
		var app = new App([p1, p2], Game, router, view, config);

		var stats = {
			rock: 0,
			paper: 0,
			scissors: 0
		};
		var i = 100;
		while (--i) {
			router.goToState('selection');
			stats[p2.getSelection()]++;
		}

		stats.rock.should.be.above(20);
		stats.paper.should.be.above(20);
		stats.scissors.should.be.above(20);

	});

	it('show', function(done) {
		var router = new Router(doc, win);
		var p1 = new Player('YOU');
		var p2 = new Player('COMPUTER');
		var view = new View(doc);
		var app = new App([p1, p2], Game, router, view, config);

		p1.setSelection('rock');
		p2.setSelection('paper');
		router.goToState('show');

		setTimeout(function() {
			done();
		}, config.timeout + 200);

	});


	it('result', function(done) {
		var router = new Router(doc, win);
		var p1 = new Player('YOU');
		var p2 = new Player('COMPUTER');
		var view = new View(doc);
		var app = new App([p1, p2], Game, router, view, config);

		p1.setSelection('rock');
		p2.setSelection('paper');
		router.goToState('show');

		setTimeout(function() {
			done();
		}, config.timeout + 200);

	});

});
