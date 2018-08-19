module.exports = {
	serve: {
		files: [
			"app/index.html.tpl",
			"app/app.js",
			"app/modules/**/partials/*.html",
			"app/modules/**/styles/*.css",
			"app/app.css",
			"app/modules/**/scripts/*.js",
			"!app/modules/htmlPartials/**/*"
		],
		options: {
			livereload: true
		},
		tasks: [
			"clean:templates",
			"ngtemplates",
			"clean:index",
			"index"
		]
	}
};
