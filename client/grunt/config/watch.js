module.exports = {
	serve: {
		files: [
			"app/index.html.tpl",
			"app/app.js",
			"app/modules/**/partials/*.html",
			"app/modules/**/styles/*.css",
			"app/modules/**/scripts/*.js",
		],
		options: {
			livereload: true
		},
		tasks: ["clean:index", "index"]
	}
};
