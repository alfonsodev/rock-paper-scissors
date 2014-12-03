'use strict';

var View = function(doc) {
	this.document = doc;
};

View.prototype.render = function(key, variables) {
    this.document.querySelectorAll('#menu_screen')[0].style.display = 'none';
	this.document.querySelectorAll('#selection_screen')[0].style.display = 'none';
	this.document.querySelectorAll('#show_screen')[0].style.display = 'none';
 	this.document.querySelectorAll('#result_screen')[0].style.display = 'none';
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

View.prototype.registerUIEventes = function(Game) {
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
};
module.exports = View;
