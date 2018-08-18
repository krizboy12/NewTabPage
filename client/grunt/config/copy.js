module.exports = {
	lib: {
		files: [
			{
				expand: true,
				cwd: "node_modules/angular",
				src: "angular.min.js",
				dest: "<%= dirs.lib %>/"
			},
			{
				expand: true,
				cwd: "node_modules/lodash",
				src: "lodash.min.js",
				dest: "<%= dirs.lib %>/"
			}
		]
	}
};
