(function(angular) {
	var app = angular.module("preferencesManager");

	app.constant("ADJUSTABLE", {
		FONT_FAMILY: [
			"input", "input_text", "input-text",
			"prompt",
			"label", "labels", "link-label", "link-label"
		],
		FONT_COLOR: [
			"input", "input_text", "input-text",
			"prompt",
			"label", "labels", "link-label", "link-label"
		],
		BACKGROUND_COLOR: [
			"prompt"
		],
		HIGHLIGHT_COLOR: [
			"label", "labels", "link-label", "link-label"
		]
	});

}(angular));
