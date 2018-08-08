(function(angular) {
	var app = angular.module("newTabApp", ["linkManager"]);

	app.directive("captureKeyPress", [function() {
		var controller = ["linkManagerFactory", function(linkManagerFactory) {
			this.printChar = linkManagerFactory.logInput;
		}];

		return {
			restrict: "A",
			controller: controller,
			link: function($scope, element, attr, ctrl) {
				element.bind("keydown", function(e) {
					ctrl.printChar(e.keyCode);
				});
			}
		};
	}]);
}(angular));
