describe("eventManager Factory", function() {
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


});
