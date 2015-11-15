angular.module('ngInstafeedDemo', [
	'ngInstafeed'
])
.config([
	'ngInstafeedProvider',
	function(
		ngInstafeedProvider
	) {
		/**
		 * Generate your own Client ID or risk having your images not 
		 * appear if this demo key reaches the maximum allowed quota by
		 * Instagram.
		 */
		ngInstafeedProvider.setClientId('6cf204f3acbb4c15854f6d43056b91e8');
	}
])
.controller('primaryCtrl', [
	'$scope',
	'ngInstafeed',
	function(
		$scope,
		ngInstafeed
	) {
		$scope.data = {
			tagName: '',
		};
		$scope.model = null;
		$scope.ngInstafeedModel = ngInstafeed.model;
		$scope.ngInstafeedState = ngInstafeed.state;
		
		$scope.load = {
			more: function() {
				ngInstafeed.more(function(err, res) {
					if(err) { throw err; }
					else {
						console.log(res);
					}
				});
			},
			tagged: function() {
				ngInstafeed.get({
					get: 'tagged',
					tagName: $scope.data.tagName
				}, function(err, res) {
					if(err) { throw err; }
					else {
						console.log(res);
						$scope.model = res;
					}
				});
			}	
		};
		
	}
]);