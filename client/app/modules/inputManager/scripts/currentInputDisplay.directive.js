(function(angular) {
	var directiveFunction = function(inputManagerFactory) {
		var linkFunction = function($scope) {
			$scope.currentInput = "test";
		};

		return {
			restrict: "C",
			template: "<span>{{::currentInput}}</span>",
			link: linkFunction
		};
	}

	directiveDependencies = ["inputManagerFactory"];

	directiveDependencies.push(directiveFunction);
	angular.module("inputManager").directive("currentInputDisplay", directiveDependencies);
}(angular));
