(function(angular) {
	var factoryFunction = function() {
		var myPrivate = {
			currentInput: ""
		};

		var myPublic = {
			processKey: function(keyCode) {
				if (keyCode >= 65 && keyCode <= 90) {
					myPrivate.currentInput = myPrivate.currentInput.concat(String.fromCharCode(keyCode));
				} else if (keyCode === 8) {
					myPrivate.currentInput = myPrivate.currentInput.slice(0, -1);
				}
			},

			getCurrentInput: function() {
				return myPrivate.currentInput;
			}
		};

		return myPublic;
	};

	var factoryDependencies = [];

	factoryDependencies.push(factoryFunction);
	angular.module("inputManager").factory("inputManagerFactory", factoryDependencies);
}(angular));
