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
    'ngTouch',
    'pascalprecht.translate'
    ])
    .config(function ($stateProvider , $locationProvider, $urlRouterProvider, $translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: '/languages/',
            suffix: '.index.json'
        });

        $translateProvider.preferredLanguage('en');

        $urlRouterProvider.otherwise('/');

    });


