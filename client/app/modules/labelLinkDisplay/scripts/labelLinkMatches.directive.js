(function(angular) {
	var directiveFunction = function(eventManagerFactory, labelLinkFactory, preferencesManagerFactory, EVENTS) {
		var linkFunction = function($scope, element) {
			$scope.lls = [];

			var styles = element[0].style;
			var pmf = preferencesManagerFactory;

			eventManagerFactory.subscribe(EVENTS.CURRENT_INPUT_UPDATED, function(currentInput) {
				$scope.lls = labelLinkFactory.updateMatches(currentInput);
				$scope.$evalAsync();
			});

			eventManagerFactory.subscribe(EVENTS.LABELS_FONT_COLOR_CHANGE, function(fontColor) {
				styles.setProperty("--label-color", fontColor);
			});

			eventManagerFactory.subscribe(EVENTS.LABELS_FONT_FAMILY_CHANGE, function(fontFamily) {
				styles.setProperty("--label-font-family", fontFamily);
			});

			eventManagerFactory.subscribe(EVENTS.LABELS_HIGHLIGHT_COLOR_CHANGE, function(highlightColor) {
				styles.setProperty("--label-highlight-color", highlightColor);
			});

			// Set the label text color from preferences.
			styles.setProperty("--label-color", pmf.getFontColor("label"));
			// Set the label font family from preferences.
			styles.setProperty("--label-font-family", pmf.getFontFamily("label"));
			// Set the label highlight color from preferences.
			styles.setProperty("--label-highlight-color", pmf.getHighlightColor("label"));
		};

		return {
			restrict: "E",
			templateUrl: "labelLinkMatches.html",
			link: linkFunction
		};
	}

	directiveDependencies = ["eventManagerFactory", "labelLinkFactory", "preferencesManagerFactory", "EVENTS"];

	directiveDependencies.push(directiveFunction);
	angular.module("labelLinkDisplay").directive("labelLinkMatches", directiveDependencies);
}(angular));
