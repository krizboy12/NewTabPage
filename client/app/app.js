(function(angular) {
	var app = angular.module("newTabApp", ["inputManager", "labelLinkDisplay",
		"statusDisplay", "htmlPartials"]);

	app.constant("_", window._);
}(angular));
