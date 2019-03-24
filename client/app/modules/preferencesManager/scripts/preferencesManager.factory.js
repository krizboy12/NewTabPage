(function(angular) {
	var factoryFunction = function(_, EVENTS, ADJUSTABLE, eventManagerFactory) {
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

			isFontFamilyAdjustable: function(item) {
				return (ADJUSTABLE.FONT_FAMILY.indexOf(item.toLowerCase()) >= 0);
			},

			isFontColorAdjustable: function(item) {
				return (ADJUSTABLE.FONT_COLOR.indexOf(item.toLowerCase()) >= 0);
			},

			isBackgroundColorAdjustable: function(item) {
				return (ADJUSTABLE.BACKGROUND_COLOR.indexOf(item.toLowerCase() >= 0));
			},

			setFontFamily: function(item, fontFamily) {
				if(!myPublic.isFontFamilyAdjustable(item))
					return {success: false, message: "'" + item + "' is not font adjustable."};

				_.set(myPrivate, "preferences." + item + ".fontFamily", fontFamily);
				eventManagerFactory.publish(EVENTS[item.toUpperCase() + "FONT_FAMILY_CHANGE"], fontFamily);
				return {success: true, message: "Font family for " + item + " has been changed to " + fontFamily};
			},

			setFontColor: function(item, fontColor) {
				if(!myPublic.isFontColorAdjustable(item))
					return {success: false, message: "'" + item + "' is not color adjustable."};

				_.set(myPrivate, "preferences." + item + ".fontColor", fontColor);
				eventManagerFactory.publish(EVENTS[item.toUpperCase() + "_FONT_COLOR_CHANGE"], fontColor);
				return {success: true, message: "Font color for " + item + " has been changed to " + fontColor};
			},

			setBackgroundColor: function(item, backgroundColor) {
				if(!myPublic.isBackgroundColorAdjustable(item))
					return {success: false, message: "'" + item + "' is not background-color adjustable."};

				_.set(myPrivate, "preferences." + item + ".backgroundColor", backgroundColor);
				eventManagerFactory.publish(EVENTS[item.toUpperCase() + "_BACKGROUND_COLOR_CHANGE"], backgroundColor)
				return {success: true, message: "Background color for " + item + " has been changed to " + backgroundColor};
			},

			getFontFamily: function(item) {
				return _.get(myPrivate, "preferences." + item + ".fontFamily", "monospace");
			},

			getFontColor: function(item) {
				return _.get(myPrivate, "preferences." + item + ".fontColor", "#000");
			},

			getBackgroundColor: function(item) {
				return _.get(myPrivate, "preferences." + item + ".backgroundColor", "#CCC");
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

	var factoryDependencies = ["_", "EVENTS", "ADJUSTABLE", "eventManagerFactory"];

	factoryDependencies.push(factoryFunction);
	angular.module("preferencesManager").factory("preferencesManagerFactory", factoryDependencies);
}(angular));
