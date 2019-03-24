(function(angular) {
	var app = angular.module("preferencesManager");

	app.constant("ADJUSTABLE", {
		FONT_FAMILY: [
			"input", "input_text", "input-text", "prompt"
		],
		FONT_COLOR: [
			"input", "input_text", "input-text", "prompt"
		],
		BACKGROUND_COLOR: [
			"prompt"
		]
	});

}(angular));
