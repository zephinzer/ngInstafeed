angular.module('ngInstafeed', [])
.provider('ngInstafeed', [
	function() {
		var pvd = {
			state: {
				loading: false
			}
		};
		var classPrivateData = {
			accessToken: null,
			clientId: null
		};
		pvd.setAccessToken = function(accessToken) {
			classPrivateData.accessToken = accessToken
		};
		pvd.setClientId = function(clientId) {
			classPrivateData.clientId = clientId;
		};
		pvd.$get = [
			'$http',
			'$timeout',
			function(
				$http,
				$timeout
			) {
				var svc = {
					model: {
						data: [],
						instafeed: null,
					},
					state: pvd.state
				};
				svc.resetAccessToken = function(accessToken) {
					classPrivateData.accessToken = accessToken;
				};
				svc.resetClientId = function(clientId) {
					classPrivateData.clientId = clientId;
				};
				svc.more = function(callback) {
					console.log(svc.model.instafeed);
					svc.model.instafeed.next();
				};
				svc.get = function(userOptions, callback) {
					var internalCallback = function(response) {
						if(typeof response == 'string') {
							callback(response, null);
						} else {
							if(response.data && response.data.length > 0) {
								if(svc.model.data.length == 0) {
									svc.model.data = response.data;
								} else {
									svc.model.data = svc.model.data.concat(response.data);
								}
							}
							callback(null, 
								response
							);
						}
						$timeout(function() {
							svc.state.loading = false;
							svc.state.hasNext = svc.model.instafeed.hasNext();
						}, 0);
					};
					var options = angular.extend({
						accessToken:	classPrivateData.accessToken,
						clientId:		classPrivateData.clientId,
						error:			internalCallback,
						mock:			true,
						success:		internalCallback
						},
						userOptions
					);
					console.log(options);
					svc.state.loading = true;
					svc.model.instafeed = new Instafeed(options);
					svc.model.instafeed.run();
				};
				return svc;
			}
		];
		return pvd;
	}
]);