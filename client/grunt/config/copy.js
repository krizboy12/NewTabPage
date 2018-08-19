module.exports = {
	lib: {
		files: [
			{
				expand: true,
				cwd: "node_modules/angular",
				src: "angular.js",
				dest: "app/lib/"
			},
			{
				expand: true,
				cwd: "node_modules/lodash",
				src: "lodash.js",
				dest: "app/lib/"
			}
		]
	}
};
