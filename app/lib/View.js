'use strict';

var View = function(doc) {
	this.document = doc;
};

View.prototype.render = function(key, variables) {
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
	       this.document.querySelectorAll('#' + k)[0].setAttribute('class', 'button_weapon ' + classes[k]);
        }
    }
};

View.prototype.updateSelectionTitle = function(selection) {
	this.document.querySelectorAll('#selection_name')[0].innerHTML = selection;
};

module.exports = View;
