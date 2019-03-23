(function(angular) {
	var factoryFunction = function(_, eventManagerFactory, preferencesManagerFactory, labelLinkFactory, EVENTS) {
		var myCommands = {
			addLabelLinkPair: function(args) {
				preferencesManagerFactory.addLabelLinkPair(args[1], args[2]);
			},

			removeLabelLinkPair: function(args) {
				preferencesManagerFactory.removeLabelLinkPair(args[1]);
			},

			updateLabelLinkPair: function(args) {
				preferencesManagerFactory.updateLabelLinkPair(args[1], args[2]);
			},

			savePreferences: function() {
				preferencesManagerFactory.savePreferences();
			},

			setSearchQuery: function(args) {
				preferencesManagerFactory.setSearchQuery(args[1]);
			},

			exportPreferences: function() {
				preferencesManagerFactory.exportPreferences();
			},

			importPreferences: function(args) {
				preferencesManagerFactory.importPreferences(args[1]);
			}
		};

		var myPrivate = {
			currentInput: "",
			displayableCharRegex: /^[-a-zA-Z0-9!@#$%^&*()_+=\[\]{}:;"',./<>?\\|`~]$/,

			isKeyDisplayable: function(key) {
				return myPrivate.displayableCharRegex.test(key);
			},

			signalInputUpdated: function() {
					eventManagerFactory.publish(EVENTS.CURRENT_INPUT_UPDATED, myPrivate.currentInput);
			},

			handleCommand: function() {
				var args = _.split(_.trimStart(myPrivate.currentInput, ":"), " ");
				if (args[0] === "add" || args[0] === "a") {
					myCommands.addLabelLinkPair(args);
				} else if (args[0] === "remove" || args[0] === "r") {
					myCommands.removeLabelLinkPair(args);
				} else if (args[0] === "update" || args[0] === "u") {
					myCommands.updateLabelLinkPair(args);
				} else if (args[0] === "saveLocal" || args[0] === "sl") {
					myCommands.savePreferences();
				} else if (args[0] === "setSearchQuery" || args[0] === "ssq") {
					myCommands.setSearchQuery(args);
				} else if (args[0] === "exportPreferences" || args[0] === "ep") {
					myCommands.exportPreferences();
				} else if (args[0] === "importPreferences" || args[0] === "ip") {
					myCommands.importPreferences(args);
				}
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

					myPrivate.signalInputUpdated();
				}
			},

			processPasteEvent: function(e) {
				var clipboardData = e.clipboardData || window.clipboardData;
				myPrivate.currentInput += clipboardData.getData("Text");
				myPrivate.signalInputUpdated();
			},

			processFileUpload: function(e) {
				e.preventDefault();
				var file = e.dataTransfer.files[0];
				if (file.type !== "application/json") {
					alert("Not a json file!");
					return;
				}

				reader = new FileReader();
				reader.onload = function(e) {

					preferencesManagerFactory.importPreferences(e.target.result);
					alert("Preferences Imported!");
				}

				reader.readAsText(file);
			},

			getCurrentInput: function() {
				return myPrivate.currentInput;
			},
		};

		return myPublic;
	};

	var factoryDependencies = ["_", "eventManagerFactory", "preferencesManagerFactory", "labelLinkFactory", "EVENTS"];

	factoryDependencies.push(factoryFunction);
	angular.module("inputManager").factory("inputManagerFactory", factoryDependencies);
}(angular));
