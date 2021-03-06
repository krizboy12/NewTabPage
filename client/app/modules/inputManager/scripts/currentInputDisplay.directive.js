(function(angular) {
	var directiveFunction = function(eventManagerFactory, preferencesManagerFactory, EVENTS) {
		var linkFunction = function($scope, element) {
			$scope.currentInput = "";

			eventManagerFactory.subscribe(EVENTS.CURRENT_INPUT_UPDATED, function(currentInput) {
				$scope.currentInput = currentInput;
				$scope.$evalAsync();
			});

			eventManagerFactory.subscribe(EVENTS.INPUT_FONT_COLOR_CHANGE, function(fontColor) {
				element[0].style.setProperty("--input-text-color", fontColor);
			});

			eventManagerFactory.subscribe(EVENTS.INPUT_FONT_FAMILY_CHANGE, function(fontFamily) {
				element[0].style.setProperty("--input-font-family", fontFamily);
			});

			eventManagerFactory.subscribe(EVENTS.PROMPT_FONT_COLOR_CHANGE, function(fontColor) {
				element[0].style.setProperty("--prompt-color", fontColor);
			});

			eventManagerFactory.subscribe(EVENTS.PROMPT_FONT_FAMILY_CHANGE, function(fontFamily) {
				element[0].style.setProperty("--prompt-font-family", fontFamily);
			});

			eventManagerFactory.subscribe(EVENTS.PROMPT_BACKGROUND_COLOR_CHANGE, function(backgroundColor) {
				element[0].style.setProperty("--prompt-background-color", backgroundColor);
			});
			
			// Set input text color from preferences.
			element[0].style.setProperty("--input-text-color", preferencesManagerFactory.getFontColor("input"));
			// Set input text font family from preferences.
			element[0].style.setProperty("--input-font-family", preferencesManagerFactory.getFontFamily("input"));
			// Set prompt text color from preferences.
			element[0].style.setProperty("--prompt-color", preferencesManagerFactory.getFontColor("prompt"));
			// Set the prompt font family from preferences.
			element[0].style.setProperty("--prompt-font-family", preferencesManagerFactory.getFontFamily("prompt"));
			// Set the prompt background color from preferences.
			element[0].style.setProperty("--prompt-background-color", preferencesManagerFactory.getBackgroundColor("prompt"));
		};

		return {
			restrict: "E",
			templateUrl: "currentInputDisplay.html",
			link: linkFunction
		};
	}

	directiveDependencies = ["eventManagerFactory", "preferencesManagerFactory", "EVENTS"];

	directiveDependencies.push(directiveFunction);
	angular.module("inputManager").directive("currentInputDisplay", directiveDependencies);
}(angular));
