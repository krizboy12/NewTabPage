module.exports = function(grunt) {
	grunt.registerTask("index", "Generate the index.html", function() {
		var target = (grunt.config("isBuild")) ? grunt.config("dirs.dest") + "/index.html" : "app/index.html";
		var template = grunt.file.read("app/index.html.tpl");

		/**
		 * @method tagify
		 * @description transforms glob notation into html tags by finding each referenced file
		 * @param {String|Array.<String>} glob the glob(s) to look through
		 * @param {String} template the template to put the path into i.e. putting src in script tags
		 * @param {String} cwd common working directory
		 * @returns {String} the templated filenames
		 */
		var tagify = function(glob, template, cwd) {
			var options = {
				filter: "isFile",
				nonull: true
			};

			if (typeof cwd === "string") {
				options.cwd = cwd;
			}

			var tags = [];
			grunt.file.expand(options, glob).forEach(function(path) {
				tags.push(grunt.template.process(template, {
					data: {
						path: path
					}
				}));
			});

			return tags.join("");
		};

		var tagTemplates = {
			js: "<script type=\"text/javascript\" src=\"<%= path %>\"></script>",
			css: "<link rel=\"stylesheet\" type=\"text/css\" href=\"<%= path %>\">"
		};

		var indexTplOptions = {
			data: {}
		};

		if (grunt.config("isBuild")) {
			var min = (grunt.config("isDebug")) ? "" : ".min";
			var glob = "styles" + min + ".css";
			indexTplOptions.data.css = tagify(glob, tagTemplates.css, grunt.config("dirs.dest"));

			indexTplOptions.data.lib = "";
			[
				"https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js",
				"https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js"
			].forEach(function(url) {
				indexTplOptions.data.lib += grunt.template.process(tagTemplates.js, {
					data: {
						path: url
					}
				});
			});

			glob = grunt.config("package.name") + min + ".js";
			indexTplOptions.data.scripts = tagify(glob, tagTemplates.js, grunt.config("dirs.dest"));
		} else {
			indexTplOptions.data.css = tagify([
				"modules/**/styles/*.css"
			], tagTemplates.css, "app");
			indexTplOptions.data.lib = tagify([
				"lib/lodash.js",
				"lib/angular.js"
			], tagTemplates.js, "app");
			indexTplOptions.data.scripts = tagify([
				"modules/**/scripts/*.module.js",
				"modules/**/scripts/*.js",
				"app.js"
			], tagTemplates.js, "app");
		}

		grunt.file.write(target, grunt.template.process(template, indexTplOptions));
	});
};
