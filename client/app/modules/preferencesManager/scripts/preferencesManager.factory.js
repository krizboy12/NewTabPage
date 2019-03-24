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

				if (_.has(myPrivate, "preferences.background")) {
					document.body.style.backgroundImage = "url(" +
						_.get(myPrivate, "preferences.background") + ")";
				}
			}
		};

		var myPublic = {
			savePreferences: function() {
				localStorage.setItem("preferences", angular.toJson(myPrivate.preferences));
			},

			getSearchQuery: function() {
				var searchQuery = _.get(myPrivate, "preferences.searchQuery", "https://www.google.com/search?q=");
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
			},

			setSearchQuery: function(searchQuery) {
				_.set(myPrivate, "preferences.searchQuery", searchQuery);
			},

			setImage: function(imageURI) {
				_.set(myPrivate, "preferences.background", imageURI);
				document.body.style.backgroundImage = "url(" + imageURI + ")";
			},

			exportPreferences: function() {
				var preferences = angular.toJson(myPrivate.preferences);
				download(preferences, "preferences.json", "text/json");
			},

			importPreferences: function(preferences) {
				myPrivate.preferences = JSON.parse(preferences);
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
