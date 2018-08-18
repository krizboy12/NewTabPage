describe("eventManagerFactory", function() {
	beforeEach(module(eventManager));

	var suite = {};
	beforeEach(function() {
		inject(function($injector) {
			suite.eventManagerFactory = $injector.get("eventManagerFactory");
		});
	});

	afterEach(function() {
		suite = null;
	});

	describe("subscribing", function() {
		
	});
});
