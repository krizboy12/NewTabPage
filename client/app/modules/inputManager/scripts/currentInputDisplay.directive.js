(function(angular) {
	var directiveFunction = function(eventManagerFactory, inputManagerFactory) {
		var linkFunction = function($scope) {
			$scope.currentInput = "";

			eventManagerFactory.subscribe("keyProcessed", function() {
				// need to check if it is a string
				$scope.currentInput = inputManagerFactory.getCurrentInput();
				$scope.$evalAsync();
			});
		};

		return {
			restrict: "C",
			template: "<span style='font-family: monospace; font-size: 2em; color: #ccc; background-color: #333;'>>{{currentInput}}_</span>",
			link: linkFunction
		};
	}

	directiveDependencies = ["eventManagerFactory", "inputManagerFactory"];

	directiveDependencies.push(directiveFunction);
	angular.module("inputManager").directive("currentInputDisplay", directiveDependencies);
}(angular));