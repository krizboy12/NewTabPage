module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// For dynamic listing of directories
		dirs: {
			dest: "dist",
			lib: "app/lib"
		},

		// Clean up the distribution directory
		clean: {
			dest: [
				"<%= dirs.dest %>/"
			],
			lib: [
				"<%= dirs.lib %>/"
			]
		},

		copy: {
			lib: {
				files: [
					{
						expand: true,
						cwd: "node_modules/angular/",
						src: "angular.js",
						dest: "<%= dirs.lib %>/"
					}
				]
			}
		},

		// Local web server
		connect: {
			serve: {
				options: {
					port: "9080",
					hostname: "localhost",
					base: [
						"app"
					],
					protocol: "http",
					open: {
						target: "http://localhost:9080"
					},
					livereload: true
				}
			}
		},

		watch: {
			serve: {
				files: [
					"app/index.html",
					"app/app.js",
					"app/modules/**/partials/*.html",
					"app/modules/**/styles/*.css",
					"app/modules/**/scripts/*.js",
				],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("serve", [
		"clean:lib",
		"copy:lib",
		"connect:serve",
		"watch:serve"
	]);
};
