module.exports = function(grunt) {
	grunt.registerTask("minify", [
		"uglify",
		"cssmin"
	]);
};
