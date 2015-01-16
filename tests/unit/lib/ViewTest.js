'use strict';

var should = require('should');
var assert = require('assert');
var View = require('../../..').View;
var Player = require('../../..').Player;
var Game = require('../../..').Game;

describe('View class', function() {
	it('render method ', function() {
		var doc = {};
		var view = new View(doc);
		var elements = [];

		doc.querySelectorAll = function(id) {
			elements[id] = [{
				style: { display: '' },
				innerHTML: ''
			}];
			return elements[id];
		};

		view.render('foo', { 'name': 'Jhon', 'surname': ''});
		assert.equal(elements['#selection_screen'][0].style.display, 'none');
    assert.equal(elements['#name'][0].innerHTML, 'Jhon');
	});

	it('render class', function() {
		var someClasses = { 'element1': 'class1', 'element2': 'class2' };
		var doc = {};
		var view = new View(doc);
		var elements = [];

		doc.querySelectorAll = function(id) {
			elements[id] = [{
				'class': '',
				setAttribute: function(attr, value) {
					elements[id][0][attr] = value;
				}
			}];
			return elements[id];
		};

		view.renderClass(someClasses);
		assert.equal(elements['#element1'][0].class, 'item class1');
		assert.equal(elements['#element2'][0].class, 'item class2');
	});

	it('register events for images ', function() {
		var registeredEvents = [];
		var player1 = new Player();
		var router = {};
		var view;
		var router = { gotToState: function() { }};
		var document = {
			querySelectorAll: function(elementId) {
				return [
					{
						addEventListener: function (eventName, callback) {
							console.log(elementId, eventName);
							registeredEvents[eventName] = elementId;
							callback({
								target: { alt:'IMG' },
								stopPropagation: function() { },
							});
						}
					}
				];
			}
		};

		view = new View(document);
		view.registerUIEventes(Game, player1, router);

		registeredEvents.should.have.property('click');
		registeredEvents.should.have.property('mouseover');

		registeredEvents['click'].should.be.equal('#selection_screen');
		registeredEvents['mouseover'].should.be.equal('#selection_screen');

	});

	it('register events for images ', function() {
		var registeredEvents = [];
		var player1 = new Player();
		var router = {};
		var view;
		var router = { gotToState: function() { }};
		var document = {
			querySelectorAll: function(elementId) {
				return [
					{
						addEventListener: function (eventName, callback) {
							console.log(elementId, eventName);
							registeredEvents[eventName] = elementId;
							callback({
								target: { alt:'DIV' },
								stopPropagation: function() { },
							});
						}
					}
				];
			}
		};

		view = new View(document);
		view.registerUIEventes(Game, player1, router);

		registeredEvents.should.have.property('click');
		registeredEvents.should.have.property('mouseover');

		registeredEvents['click'].should.be.equal('#selection_screen');
		registeredEvents['mouseover'].should.be.equal('#selection_screen');

	});


});
