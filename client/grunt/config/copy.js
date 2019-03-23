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
			},
			{
				expand: true,
				cwd: "node_modules/downloadjs",
				src: "download.js",
				dest: "app/lib/"
			}
		]
	},
	dist: {
		files: [
			{
				expand: true,
				cwd: "node_modules/angular",
				src: "angular.min.js",
				dest: "<%= dirs.dest %>/lib/"
			},
			{
				expand: true,
				cwd: "node_modules/lodash",
				src: "lodash.min.js",
				dest: "<%= dirs.dest %>/lib/"
			},
			{
				expand: true,
				cwd: "node_modules/downloadjs",
				src: "download.min.js",
				dest: "<%= dirs.dest %>/lib/"
			}
		]
	}
};
