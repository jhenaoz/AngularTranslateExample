'use strict';

/**
 * @ngdoc overview
 * @name checkedUpApp
 * @description
 * # checkedUpApp
 *
 * Main module of the application.
 */
 angular
 .module('viamericas', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    ])
    .config(function ($stateProvider , $locationProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('register',{
            url:'/',
            templateUrl:'scripts/home/register.html',
            controller:'RegisterCtrl'

        });

    });


