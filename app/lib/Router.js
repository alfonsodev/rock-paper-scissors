'use strict';

var Router = function(doc, win) {
    this.routes = {};
    this.document = doc;
    this.window = win;
};

Router.prototype.state = function(stateName, callback) {
    this.routes[stateName] = callback;
};

Router.prototype.goToState = function(stateName, state) {
    var title = stateName[0].toUpperCase() + stateName.substr(1);
    var state = state || {};
    this.document.title = title;
    this.window.history.pushState(state, title, '/#' + stateName);
    this.routes[stateName]();
};

module.exports = Router;
