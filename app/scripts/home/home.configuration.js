 angular.module('viamericas')
    .config(function ($stateProvider , $locationProvider, $urlRouterProvider, $translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: '/languages/home/',
            suffix: '.home.json'
        });

        $stateProvider
        .state('home',{
            url:'/',
            templateUrl:'scripts/home/home.html',
            controller:'HomeCtrl'

        });

    });