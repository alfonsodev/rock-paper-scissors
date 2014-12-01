'use strict';

var should = require('should');
var assert = require('assert');
var should = require('should');
var Router = require('../../..').Router;

var documentMock = { title: ''};
var windowMock = {
	history: {
		pushState: function(state, title, path) {

		}
	}
};
describe('Router class', function() {

	it('register routes', function() {
		var router = new Router(documentMock, windowMock);
		var fooFunc = function() {
			return 'bar';
		};
		router.state('foo', fooFunc);
		router.routes.should.have.property('foo');
		assert.deepEqual(router.routes, {'foo': fooFunc});
	});

	it('executes a route handler', function(done) {
		var fooHandler = function() {
			done();
		};

		var router = new Router(documentMock, windowMock);
		router.state('foo', fooHandler);
		router.state('bar', function() {});
		router.goToState('foo');
	});

});
