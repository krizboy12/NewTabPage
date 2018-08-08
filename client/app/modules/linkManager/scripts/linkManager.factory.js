(function(angular) {
	var factoryFunction = function() {
		 myPrivate = {
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

		var myPublic = {};

		return myPublic;
	};

	var factoryDependencies = [];

	factoryDependencies.push(factoryFunction);
	angular.module("linkManager").factory("linkManagerFactory", factoryDependencies);
}(angular));
