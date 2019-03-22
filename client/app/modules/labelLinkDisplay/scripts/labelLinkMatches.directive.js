(function(angular) {
	var directiveFunction = function(eventManagerFactory, labelLinkFactory, EVENTS) {
		var linkFunction = function($scope) {
			$scope.lls = [];

			eventManagerFactory.subscribe(EVENTS.CURRENT_INPUT_UPDATED, function(currentInput) {
				$scope.lls = labelLinkFactory.updateMatches(currentInput);
				$scope.$evalAsync();
			});
		};

		return {
			restrict: "E",
			templateUrl: "labelLinkMatches.html",
			link: linkFunction
		};
	}

	directiveDependencies = ["eventManagerFactory", "labelLinkFactory", "EVENTS"];

	directiveDependencies.push(directiveFunction);
	angular.module("labelLinkDisplay").directive("labelLinkMatches", directiveDependencies);
}(angular));
