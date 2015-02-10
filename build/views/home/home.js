(function(){


function configHome( $stateProvider ) {
  $stateProvider.state( 'home', {
	url: '/home',
    views: {
      "main": {
        controller: 'homeCtrl',
        templateUrl: 'views/home/home.tmpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
};

function homeCtrl($scope, CharacterName){
	$scope.playerResults = {};
	$scope.joinURL = "http://www.brtd.net/join-us";

	$scope.updatePlayerName = function(){
		if($scope.playerName.length > 3){
		 var p = CharacterName.query({"name.first_lower": "^" + $scope.playerName.toLowerCase(), "c:limit": 15});
		 console.log(p);
		 $scope.playerResults = p;
		}
	}
}


angular.module("brtdLanding.home", ['ui.router', 'dbgCensus'])
		.config(['$stateProvider', configHome])
		.controller("homeCtrl", ['$scope', 'CharacterName', homeCtrl]);


})();