module.exports = {
	js: {
		nonull: true,
		src: [
			"app/modules/**/scripts/*.module.js",
			"app/modules/**/scripts/*.js",
			"app/app.js"
		],
		dest: "<%= dirs.dest %>/<%= package.name %>.js"
	},
	css: {
		src: [
			"app/modules/**/styles/*.css"
		],
		dest: "<%= dirs.dest %>/styles.css"
	}
};
