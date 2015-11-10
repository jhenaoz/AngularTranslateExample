'use strict';

angular.module('viamericas')
	.controller('HomeCtrl', function ($scope, $translate) {
        
        $scope.changeLanguage = function(language){
        	$translate.use(language);
        };
	});
