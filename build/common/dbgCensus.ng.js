(function(){

function censusCharacterNameFactory($resource){
	return $resource('//census.soe.com/get/ps2:v2/character_name/', {callback: "JSON_CALLBACK"}, {
	    query: {method:'JSONP', params:{}, isArray:false}
    });
};

angular.module('dbgCensus', ['ngResource'])
		.factory("CharacterName", ['$resource', censusCharacterNameFactory])
		;

})();