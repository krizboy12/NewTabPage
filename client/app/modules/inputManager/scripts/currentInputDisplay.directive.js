(function(angular) {
	var directiveFunction = function(eventManagerFactory, inputManagerFactory, EVENTS) {
		var linkFunction = function($scope) {
			$scope.currentInput = "";

			eventManagerFactory.subscribe(EVENTS.KEY_PROCESSED, function() {
				// need to check if it is a string
				$scope.currentInput = inputManagerFactory.getCurrentInput();
				$scope.$evalAsync();
			});
		};

		return {
			restrict: "E",
			templateUrl: "currentInputDisplay.html",
			link: linkFunction
		};
	}

	directiveDependencies = ["eventManagerFactory", "inputManagerFactory", "EVENTS"];

	directiveDependencies.push(directiveFunction);
	angular.module("inputManager").directive("currentInputDisplay", directiveDependencies);
}(angular));
