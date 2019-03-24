(function(angular) {
	var directiveFunction = function(eventManagerFactory, EVENTS) {
		var linkFunction = function($scope, element) {
			$scope.status = "";

			eventManagerFactory.subscribe(EVENTS.STATUS_UPDATE, function(e) {
				$scope.status = e.message;

				if (e.success) {
					element[0].style.setProperty("--background-color", "#3baf1d");
				} else {
					element[0].style.setProperty("--background-color", "#ff070e");
				}

				element[0].style.display = "block";
				setTimeout(function() {
					element[0].style.display = "none";
				}, 2000);

				$scope.$evalAsync();
			});
		};

		return {
			restrict: "E",
			templateUrl: "statusBar.html",
			link: linkFunction
		};
	}

	directiveDependencies = ["eventManagerFactory", "EVENTS"];

	directiveDependencies.push(directiveFunction);
	angular.module("statusDisplay").directive("statusBar", directiveDependencies);
}(angular));
