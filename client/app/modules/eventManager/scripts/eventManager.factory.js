(function(angular) {
	var factoryFunction = function(_) {
		var myPrivate = {
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
				subscriptionToken = _.toString(Date.now());

				myPrivate.listeners.push({
					"token": subscriptionToken,
					"eventName": eventName,
					"callback": callback
				});

				return subscriptionToken;
			},

			/**
			 * @method unsubscribe
			 * @description unsubscribe from an event
			 * @param {String} subscriptionToken the token recieved from a call
			 * to subscription.
			 * @return {Array.<String>} The token of the unsubscription.
			 */
			unsubscribe: function(subscriptionToken) {
				return _.remove(myPrivate.listeners, function(subscription) {
					return subscriptionToken === subscription.token;
				});
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
				_.forEach(myPrivate.listeners, function(subscription) {
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

	var factoryDependencies = ["_"];

	factoryDependencies.push(factoryFunction);
	angular.module("eventManager").factory("eventManagerFactory", factoryDependencies);
}(angular));
