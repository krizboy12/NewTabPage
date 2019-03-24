(function(angular) {
	var app = angular.module("eventManager");

	app.constant("EVENTS", {
		CURRENT_INPUT_UPDATED: "currentInputUpdated",
		STATUS_UPDATE: "statusUpdate",
	});
}(angular));
