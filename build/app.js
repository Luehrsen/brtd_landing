// @depend "vendor/angular-ui-router/release/angular-ui-router.js"
// @depend "common/dbgCensus.ng.js"
// @depend "views/home/home.js"

(function(){


function appCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | BRTD' ;
    }
  });
};


angular.module("brtdLanding", [
			'ui.router',
			'dbgCensus',
			'brtdLanding.home'
		])
		.controller( 'appCtrl', ['$scope', '$location', appCtrl])
		;

})(angular);