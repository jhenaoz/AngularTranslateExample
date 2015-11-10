'use strict';

/**
 * @ngdoc overview
 * @name Viamericas
 * @description
 * # Viamericas
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
    'ngTouch'
    ])
    .config(function ($stateProvider , $locationProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home',{
            url:'/',
            templateUrl:'scripts/home/home.html',
            controller:'HomeCtrl'

        });

    });


