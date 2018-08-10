(function(angular) {
	var factoryFunction = function(eventManagerFactory) {
		var myPrivate = {
			currentInput: ""
		};

		var myPublic = {
			processKeyDownEvent: function(e) {
				console.log(e.keyCode);

				if (e.keyCode >= 65 && e.keyCode <= 90) {
					myPrivate.currentInput += String.fromCharCode((e.shiftKey) ? e.keyCode : e.keyCode + 32);
				} else if (e.keyCode === 8) {
					myPrivate.currentInput = myPrivate.currentInput.slice(0, -1);
				} else if (e.keyCode === 27) {
					myPrivate.currentInput = "";
				} else if (e.keyCode === 32 && myPrivate.currentInput.slice(-1) !== " ") {
					myPrivate.currentInput += " ";
				}

				eventManagerFactory.publish("keyProcessed", e.keyCode);
			},

			getCurrentInput: function() {
				return myPrivate.currentInput;
			}
		};

		return myPublic;
	};

	var factoryDependencies = ["eventManagerFactory"];

	factoryDependencies.push(factoryFunction);
	angular.module("inputManager").factory("inputManagerFactory", factoryDependencies);
}(angular));
