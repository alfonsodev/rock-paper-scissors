'use strict';

var app = function(players, game, router, view, config) {
	var player1 = players[0];
	var player2 = players[1];

	router.state('menu', function() {
		view.render('menu_screen');
	});

	router.state('selection', function() {
    debugger;
		player2.makeRandomSelection(game.elements);
		view.render('selection_screen');
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
