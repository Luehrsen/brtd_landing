function fullheightDirective ($window) {
    return function (scope, element) {
	    element.height( (angular.element($window).innerHeight()) );

	    angular.element($window).resize(function(){
		    element.height( angular.element($window).innerHeight());
	    });
    };
}

angular.module('lh.fullheight', [])
		.directive('fullheight', ['$window', fullheightDirective]);