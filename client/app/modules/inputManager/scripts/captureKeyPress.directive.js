(function(angular) {
	var directiveFunction = function(inputManagerFactory) {
		var linkFunction = function($scope, element) {
			element.bind("keydown", inputManagerFactory.processKeyDownEvent);
			element.bind("paste", inputManagerFactory.processPasteEvent);
		}

		return {
			restrict: "A",
			link: linkFunction
		};
	}

	directiveDependencies = ["inputManagerFactory"];

	directiveDependencies.push(directiveFunction);
	angular.module("inputManager").directive("captureKeyPress", directiveDependencies);
}(angular));
