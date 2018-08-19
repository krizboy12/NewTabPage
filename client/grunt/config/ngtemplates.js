module.exports = {
	dev: {
		options: {
			bootstrap: function(module, script) {
				script = script.slice(script.indexOf("$"));
				return "(function(angular){angular.module('htmlPartials', []).run(['$templateCache'," +
					"function($templateCache){" + script + "}]);}(angular));";
			},
			url: function(url) {
				return url.substring(url.lastIndexOf("/") + 1, url.length);
			},
			htmlmin: {
				collapseWhitespace: true
			}
		},
		src: "app/modules/**/partials/*.html",
		dest: "app/modules/htmlPartials/scripts/htmlPartials.module.js"
	}
};
