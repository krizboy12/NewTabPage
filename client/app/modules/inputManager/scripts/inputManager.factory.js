(function(angular) {
	var factoryFunction = function(eventManagerFactory, preferencesManagerFactory, INPUT_STATES) {
		var myPrivate = {
			currentInput: "",
			displayableCharRegex: /^[-a-zA-Z0-9!@#$%^&*()_+=\[\]{}:;"',./<>?\\|]$/,

			currentInputState: "",

			isKeyDisplayable: function(key) {
				return myPrivate.displayableCharRegex.test(key);
			},

			handleCommand: function() {
				var args = _.split(myPrivate.currentInput, " ");
				console.log(args);
			},

			processCurrentInput: function() {
				if (_.head(myPrivate.currentInput) === ":") {
					myPrivate.handleCommand();
				} else {
					switch(myPrivate.currentInputState) {
						default:
							myPrivate.search();
					}
				}

				myPrivate.currentInput = "";
			},

			search: function() {
				window.location.href = preferencesManagerFactory.getDefault("searchEngine") +
					_.escape(myPrivate.currentInput);
			}
		};

		var myPublic = {
			processKeyDownEvent: function(e) {
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

				eventManagerFactory.publish("keyProcessed", e.keyCode);
			},

			getCurrentInput: function() {
				return myPrivate.currentInput;
			}
		};

		var init = function() {
			var state = preferencesManagerFactory.getDefault("inputState");
			myPrivate.currentInputState = (state) ? state : INPUT_STATES.SEARCH;
		};

		init();
		return myPublic;
	};

	var factoryDependencies = ["eventManagerFactory", "preferencesManagerFactory", "INPUT_STATES"];

	factoryDependencies.push(factoryFunction);
	angular.module("inputManager").factory("inputManagerFactory", factoryDependencies);
}(angular));
