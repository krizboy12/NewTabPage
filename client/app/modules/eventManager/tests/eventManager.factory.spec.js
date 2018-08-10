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
		it("should return empty string for invalid event names", funtion() {
			var noCall = jasmine.createSpy("noCall");
			var token = suite.eventManagerFactory.subscribe("notARealEvent", noCall);

			expect(noCall).not.toHaveBeenCalled();
			expect(token).toEqual("");
		});

		it("should return token for valid events", function() {
			var noCall = jasmine.createSpy("noCall");
			var token = suite.eventManagerFactory.subscribe("keyProcessed", noCall);

			expect(noCall).not.toHaveBeenCalled();
			expect(token).toEqual(jasmine.any(String));
		});
	});
});
