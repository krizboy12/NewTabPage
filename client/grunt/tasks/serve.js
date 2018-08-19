module.exports = function(grunt) {
	grunt.registerTask("serve", [
		"clean:lib",
		"copy:lib",
		"clean:templates",
		"ngtemplates:dev",
		"index",
		"connect:serve",
		"watch:serve"
	]);
};
