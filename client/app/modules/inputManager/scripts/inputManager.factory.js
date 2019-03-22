(function(angular) {
	var factoryFunction = function(_, eventManagerFactory, preferencesManagerFactory, labelLinkFactory, EVENTS) {
		var myPrivate = {
			currentInput: "",
			displayableCharRegex: /^[-a-zA-Z0-9!@#$%^&*()_+=\[\]{}:;"',./<>?\\|`~]$/,

			isKeyDisplayable: function(key) {
				return myPrivate.displayableCharRegex.test(key);
			},

			handleCommand: function() {
				var args = _.split(_.trimStart(myPrivate.currentInput, ":"), " ");
				console.log(args);
			},

			search: function() {
				window.location.href = preferencesManagerFactory.getSearchQuery() +
					_.escape(myPrivate.currentInput);
			},

			findMatch: function() {
				var match = labelLinkFactory.getTopMatch();
				if (match !== null) {
					window.location.href = match.link;
				} else {

					// If there are no matches, then just search using the user's search
					// engine
					myPrivate.search();
				}
			},

			processCurrentInput: function() {
				if (_.head(myPrivate.currentInput) === ":") {
					myPrivate.handleCommand();
				} else {
					myPrivate.findMatch();
				}

				myPrivate.currentInput = "";
			}
		};

		var myPublic = {
			processKeyDownEvent: function(e) {

				// Ignore everything when the ctrl key is pressed
				if (!e.ctrlKey) {

					// TODO: add cycling through the preferences list with arrow keys
					if (myPrivate.isKeyDisplayable(e.key)) {
						myPrivate.currentInput += e.key;
					} else if (e.key === "Backspace") {
						myPrivate.currentInput = myPrivate.currentInput.slice(0, -1);
					} else if (e.key === "Escape") {
						myPrivate.currentInput = "";
					} else if (e.key === " " && myPrivate.currentInput.slice(-1) !== " ") {
						myPrivate.currentInput += " ";
					} else if (e.key === "Enter") {
						myPrivate.processCurrentInput();
					}

					eventManagerFactory.publish(EVENTS.CURRENT_INPUT_UPDATED, myPrivate.currentInput);
				}
			},

			getCurrentInput: function() {
				return myPrivate.currentInput;
			}
		};

		return myPublic;
	};

	var factoryDependencies = ["_", "eventManagerFactory", "preferencesManagerFactory", "labelLinkFactory", "EVENTS"];

	factoryDependencies.push(factoryFunction);
	angular.module("inputManager").factory("inputManagerFactory", factoryDependencies);
}(angular));
