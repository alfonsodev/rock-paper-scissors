var should = require('should');
var assert = require('assert');
var should = require('should');
var Player = require('../../..').Player;

describe('Player class test', function() {
	it('Player ', function() {
		var player = new Player();
		var elements = ['rock', 'paper', 'scissors'];
		var i = elements.length;
		while (--i) {
			player.setSelection([elements[i]]);
			assert.equal(player.getSelection(), elements[i]);
		}
	});

	it('Make selection is random', function() {
		var stats = {
			rock: 0,
			paper: 0,
			scissors: 0
		};
		var player = new Player();
		var i = 100;

		while (--i) {
			player.makeRandomSelection(['rock', 'paper', 'scissors']);
			stats[player.getSelection()]++;
		}

		stats.rock.should.be.above(20);
		stats.paper.should.be.above(20);
		stats.scissors.should.be.above(20);

		console.log(stats);

	});

});
