(function(angular) {
	var factoryFunction = function(_) {
		var myPrivate = {
			preferences: {},

			/**
			 * @method loadPreferences
			 * @description Loads user preferences from local storage.
			 */
			loadPreferences: function() {

				// Load the user's preferred search engine query string
				_.set(myPrivate.preferences, "searchQuery", "https://www.google.com/search?q=");

				// We will also load the user's saved list of label/link pairs
				var pairs = [
					{
						label: "GitHub",
						link: "https://github.com/"
					},
					{
						label: "GitHub",
						link: "https://github.com/"
					},
					{
						label: "GitHub",
						link: "https://github.com/"
					},
					{
						label: "GitHub",
						link: "https://github.com/"
					},
					{
						label: "GitHub",
						link: "https://github.com/"
					},
					{
						label: "GitHub",
						link: "https://github.com/"
					},
				];

				_.set(myPrivate.preferences, "llpairs", pairs);
			}
		};

		var myPublic = {
			getSearchQuery: function() {
				return _.get(myPrivate.preferences, "searchQuery");
			},

			getLLPairs: function() {
				return _.get(myPrivate.preferences, "llpairs")
			}
		};

		var init = function() {
			myPrivate.loadPreferences();
		};

		init();
		return myPublic;
	};

	var factoryDependencies = ["_"];

	factoryDependencies.push(factoryFunction);
	angular.module("preferencesManager").factory("preferencesManagerFactory", factoryDependencies);
}(angular));
