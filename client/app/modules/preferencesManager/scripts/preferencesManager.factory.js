(function(angular) {
	var factoryFunction = function(_) {
		var myPrivate = {
			preferences: {},

			/**
			 * @method loadPreferences
			 * @description Loads user preferences from local storage.
			 */
			loadPreferences: function() {
				myPrivate.preferences = JSON.parse(localStorage.getItem("preferences"));

				if (!_.has(myPrivate, "preferences.llpairs")) {
					_.set(myPrivate, "preferences.llpairs", []);
				}
			}
		};

		var myPublic = {
			savePreferences: function() {
				localStorage.setItem("preferences", JSON.stringify(myPrivate.preferences));
			},

			getSearchQuery: function() {
				var searchQuery = _.get(myPrivate, "preferences.earchQuery", "https://www.google.com/search?q=");
				return searchQuery;
			},

			getLLPairs: function() {
				return _.get(myPrivate, "preferences.llpairs", []);
			},

			addLabelLinkPair: function(label, link) {
				myPrivate.preferences.llpairs.push({
					label: label,
					link: link
				});
			},

			removeLabelLinkPair: function(label) {
				return _.remove(myPrivate.preferences.llpairs, function(pair) {
					return pair.label === label;
				});
			},

			updateLabelLinkPair: function(label, link) {
				var pair = myPublic.removeLabelLinkPair(label)[0];
				pair.link = link;
				myPrivate.preferences.llpairs.push(pair);
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
