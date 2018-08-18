module.exports = {
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
};
