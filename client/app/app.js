(function(angular) {
	var app = angular.module("newTabApp", ["inputManager"]);

	// TODO: change to require once I get requirejs to work
	app.constant("_", window._);
}(angular));
