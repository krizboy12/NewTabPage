(function(angular) {
	var factoryFunction = function(_) {
		var myPrivate = {
			preferences: {},

			/**
			 * @method loadPreferences
			 * @description Loads user preferences from local storage.
			 */
			loadPreferences: function() {
				_.set(myPrivate.preferences, "defaults.inputState", "stateSearch");
				_.set(myPrivate.preferences, "defaults.searchEngine", "https://www.google.com/search?q=");
			}
		};

		var myPublic = {
			getDefault: function(item) {
				if (_.isString(item)) {
					return _.get(myPrivate.preferences.defaults, item);
				}
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
