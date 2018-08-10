(function(angular) {
	var factoryFunction = function() {
		var myPrivate = {
			validEvents: [
				"keyProcessed"
			],

			// Should really be a hash table so unsub is constant time, but
			// shouldn't matter too much for this application. I'll change it
			// if I need to.
			listeners: []
		};

		var myPublic = {

			/**
			 * @method subscribe
			 * @description subscribe to an event. The callback gets called
			 * whenever the publish method is called for a specific event.
			 * @param {String} eventName the name of the event
			 * @callback callback the function to call when this event
			 * gets triggered via a publish. The callback takes one argument,
			 * which will be the payload delivered by the publish command
			 * @return {String} The token of the subscription. If no subscription was
			 * made, empty string will be returned
			 */
			subscribe: function(eventName, callback) {
				var subscriptionToken = "";

				if (myPrivate.validEvents.indexOf(eventName) !== -1) {
					subscriptionToken = Date.now().toString();

					myPrivate.listeners.push({
						"token": subscriptionToken,
						"eventName": eventName,
						"callback": callback
					});
				}

				return subscriptionToken;
			},

			/**
			 * @method unsubscribe
			 * @description unsubscribe from an event
			 * @param {String} subscriptionToken the token recieved from a call
			 * to subscription.
			 * @return {String} The token of the unsubscription. If it was not
			 * successful, empty string will be returned
			 */
			unsubscribe: function(subscriptionToken) {
				myPrivate.listeners.forEach(myPrivate.listeners,
					function(subscription, index) {
						if (subscriptionToken === subscription.token) {
							myPrivate.listeners.splice(index, 1);
							return subscriptionToken;
						}
				});

				return "";
			},

			/**
			 * @method publish
			 * @description Trigger an event and attach a payload to be passed
			 * to the callback for each subscriber.
			 * @param {String} eventName the name of the event
			 * @param {*} payload the argument that gets passed to the callbacks
			 * of each subscriber.
			 * @return {Array.<String>} Array of all subscription tokens that
			 * had their callbacks executed
			 */
			publish: function(eventName, payload) {
				var subscriptionTokens = [];
				myPrivate.listeners.forEach(function(subscription) {
					if (eventName === subscription.eventName) {
						subscription.callback(payload);
						subscriptionTokens.push(subscription.token);
					}
				});

				return subscriptionTokens;
			}
		};

		return myPublic;
	};

	var factoryDependencies = [];

	factoryDependencies.push(factoryFunction);
	angular.module("eventManager").factory("eventManagerFactory", factoryDependencies);
}(angular));
