'use strict';

var should = require('should');
var assert = require('assert');
var View = require('../../..').View;

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
		assert.equal(elements['#show_screen'][0].style.display, 'none');
		assert.equal(elements['#result_screen'][0].style.display, 'none');
		assert.equal(elements['#foo'][0].style.display, 'block');
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
});
