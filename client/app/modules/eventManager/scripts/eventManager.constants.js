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
		PREFS_LOADED: "preferencesLoaded"
	});

}(angular));
