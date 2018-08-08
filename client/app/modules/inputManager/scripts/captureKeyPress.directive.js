(function(angular) {
	var directiveFunction = function(inputManagerFactory) {
		var linkFunction = function($scope, element) {
			element.bind("keydown", function(e) {
				inputManagerFactory.processKey(e.keyCode);
			});
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
