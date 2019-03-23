(function(angular) {
	var directiveFunction = function(inputManagerFactory) {
		var linkFunction = function($scope, element) {
			element.bind("keydown", inputManagerFactory.processKeyDownEvent);
			element.bind("paste", inputManagerFactory.processPasteEvent);

			window.addEventListener("dragover", function(e) {
				e.preventDefault();
			});

			window.addEventListener("drop", inputManagerFactory.processFileUpload);
		}

		return {
			restrict: "A",
			link: linkFunction
		};
	}

	directiveDependencies = ["inputManagerFactory"];

	directiveDependencies.push(directiveFunction);
	angular.module("inputManager").directive("captureInput", directiveDependencies);
}(angular));
