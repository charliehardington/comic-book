core.controller('Topnavbar', function($scope, $state) {
	// $scope.loggedInUser = loggedInUser;
	$scope.checkState = function(){
		console.log('inside top navbar');
		console.log($state.current.name, 'current state');
		return $state.current.name !== 'home';
	}
});