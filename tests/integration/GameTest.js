'use strict';
var assert = require('assert');
var Player = require('../../').Player;
var Game = require('../../').Game;


describe('Game class - integration test', function() {
	it('knows whos wins', function() {
		var p1 = new Player('YOU');
		var p2 = new Player('COMPUTER');
		var result;

		p1.setSelection('rock');
		p2.setSelection('paper');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'YOU LOSE');

		p1.setSelection('paper');
		p2.setSelection('scissors');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'YOU LOSE');

		p1.setSelection('scissors');
		p2.setSelection('rock');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'YOU LOSE');

		p1.setSelection('paper');
		p2.setSelection('rock');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'YOU WIN');

		p1.setSelection('scissors');
		p2.setSelection('paper');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'YOU WIN');

		p1.setSelection('rock');
		p2.setSelection('scissors');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'YOU WIN');

		p1.setSelection('paper');
		p2.setSelection('paper');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'DRAW');

		p1.setSelection('scissors');
		p2.setSelection('scissors');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'DRAW');

		p1.setSelection('rock');
		p2.setSelection('rock');
		result = Game.getResult(p1.getSelection(), p2.getSelection());
		assert.equal(result, 'DRAW');

	});
});
