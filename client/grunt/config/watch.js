module.exports = {
	serve: {
		files: [
			"app/index.html",
			"app/app.js",
			"app/include.js",
			"app/modules/**/partials/*.html",
			"app/modules/**/styles/*.css",
			"app/modules/**/scripts/*.js",
		],
		options: {
			livereload: true
		}
	}
};
