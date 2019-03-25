(function(angular) {
	var app = angular.module("eventManager");

	app.constant("EVENTS", {
		CURRENT_INPUT_UPDATED: "currentInputUpdated",
		STATUS_UPDATE: "statusUpdate",

		INPUT_FONT_COLOR_CHANGE: "inputFontColorChange",
		INPUT_FONT_FAMILY_CHANGE: "inputFontFamilyChange",

		PROMPT_FONT_COLOR_CHANGE: "promptFontColorChange",
		PROMPT_FONT_FAMILY_CHANGE: "promptFontFamilyChange",
		PROMPT_BACKGROUND_COLOR_CHANGE: "promptBackgroundColorChange",

		LABELS_FONT_COLOR_CHANGE: "labelsFontColorChange",
		LABELS_FONT_FAMILY_CHANGE: "labelsFontFamilyChange",
		LABELS_HIGHLIGHT_COLOR_CHANGE: "labelsHighlightColorChange",

		PREFS_LOADED: "preferencesLoaded"
	});

}(angular));
