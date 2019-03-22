(function(angular) {
	var directiveFunction = function(eventManagerFactory, EVENTS) {
		var linkFunction = function($scope) {
			$scope.currentInput = "";

			eventManagerFactory.subscribe(EVENTS.CURRENT_INPUT_UPDATED, function(currentInput) {
				$scope.currentInput = currentInput;
				$scope.$evalAsync();
			});
		};

		return {
			restrict: "E",
			templateUrl: "currentInputDisplay.html",
			link: linkFunction
		};
	}

	directiveDependencies = ["eventManagerFactory", "EVENTS"];

	directiveDependencies.push(directiveFunction);
	angular.module("inputManager").directive("currentInputDisplay", directiveDependencies);
}(angular));
