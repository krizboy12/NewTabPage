(function(angular) {
	var factoryFunction = function(_, $sce, preferencesManagerFactory) {
		var myPrivate = {
			matches: []
		};

		var myPublic = {
			updateMatches: function(currentInput) {
				if (currentInput === "" || currentInput.charAt(0) === ":") {
					myPrivate.matches = [];
					return [];
				}

				var lls = preferencesManagerFactory.getLLPairs();
				myPrivate.matches = [];
				_.forEach(lls, function(ll) {

					// If the label contains the current input text,
					var p = new RegExp(currentInput, "i");
					if (p.test(ll.label)) {
						myPrivate.matches.push({
							label: $sce.trustAsHtml(ll.label.replace(new RegExp("(" + currentInput + ")", "i"), "<span class='highlight'>$1</span>")),
							link: ll.link
						});
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

	var factoryDependencies = ["_", "$sce", "preferencesManagerFactory"];

	factoryDependencies.push(factoryFunction);
	angular.module("labelLinkDisplay").factory("labelLinkFactory", factoryDependencies);
}(angular));
