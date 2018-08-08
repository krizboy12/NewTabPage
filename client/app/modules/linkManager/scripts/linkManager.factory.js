(function(angular) {
	var factoryFunction = function() {
		local = {
			getLinks: function() {
				return [{
					"label": "Search",
					"children": [
						{
							"label": "Google",
							"link": "https://www.google.com/"
						},
						{
							"label": "YouTube",
							"link": "https://www.youtube.com/"
						}
					]
				}];
			}
		};

		var publicInterface = {
			logInput: function(input) {

				// if the code is backspace or escape, go up a level
				if (input === 8 || input === 27) {
					console.log(input);
				} else if (input >= 65 && input <= 90) {
					console.log("alpha");
				}
			}
		};

		return publicInterface;
	};

	var factoryDependencies = [];

	factoryDependencies.push(factoryFunction);
	angular.module("linkManager").factory("linkManagerFactory", factoryDependencies);
}(angular));
