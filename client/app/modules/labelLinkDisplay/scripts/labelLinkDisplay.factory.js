(function(angular) {
	var factoryFunction = function(_, preferencesManagerFactory) {
		var myPrivate = {
			matches: []
		};

		var myPublic = {
			updateMatches: function(currentInput) {
				if (currentInput === "" || currentInput.charAt(0) === ":") {
					matches = [];
					return [];
				}

				var lls = preferencesManagerFactory.getLLPairs();
				myPrivate.matches = [];
				_.forEach(lls, function(ll) {

					// If the label contains the current input text,
					var matchStart = _.toLower(ll.label).indexOf(_.toLower(currentInput));
					if (matchStart !== -1) {
						myPrivate.matches.push(ll);
					}
				});

				return myPrivate.matches;
			},

			getTopMatch: function() {
				if (_.isEmpty(myPrivate.matches)) {
					return null;
				}

				return myPrivate.matches[0];
			}
		};

		return myPublic;
	};

	var factoryDependencies = ["_", "preferencesManagerFactory"];

	factoryDependencies.push(factoryFunction);
	angular.module("labelLinkDisplay").factory("labelLinkFactory", factoryDependencies);
}(angular));
