module.exports = function(grunt) {
	var path = require("path");

	require("load-grunt-config")(grunt, {
		configPath: path.join(process.cwd(), "grunt/config"),
		jitGrunt: {
			staticMappings: {
				ngtemplates: "grunt-angular-templates",
			},
			customTasksDir: "grunt/tasks"
		},
		data: {
			dirs: {
				dest: "dist",
				lib: "app/lib"
			}
		}
	});
};
