module.exports = function(grunt) {
	grunt.registerTask("build", function() {
		grunt.config("isBuild", true);
		grunt.task.run([
			"clean",
			"ngtemplates",
			"concat",
			"minify",
			"index"
		]);
	});
};
