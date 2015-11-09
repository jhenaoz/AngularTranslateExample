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
 .module('checkedUpApp', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMdIcons'
    ])
 .constant('FILE_SERVER', 'https://cu-prod.s3.amazonaws.com')
 .config(function ($stateProvider , $locationProvider, $urlRouterProvider, $mdThemingProvider) {

        $mdThemingProvider.definePalette('Primary', {
            "50": "#e9f0f6",
            "100": "#bcd3e4",
            "200": "#90b6d2",
            "300": "#6a9dc2",
            "400": "#4584b3",
            "500": "#206ca4",
            "600": "#1c5f90",
            "700": "#184F80",
            "800": "#144467",
            "900": "#194976",
            "A100": "#bcd3e4",
            "A200": "#90b6d2",
            "A400": "#4584b3",
            "A700": "#18517b",
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300', 'A100', 'A200'],
            'contrastLightColors': undefined
        });
        $mdThemingProvider.definePalette('Accent', {
            "50": "#eaf7f1",
            "100": "#c0e8d6",
            "200": "#96d9bb",
            "300": "#73cca4",
            "400": "#50bf8d",
            "500": "#2db276",
            "600": "#279c67",
            "700": "#228659",
            "800": "#1c6f4a",
            "900": "#17593b",
            "A100": "#c0e8d6",
            "A200": "#96d9bb",
            "A400": "#50bf8d",
            "A700": "#228659",
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300', 'A100', 'A200'],
            'contrastLightColors': undefined
        });
        $mdThemingProvider.theme('checkedup').primaryPalette('Primary', {
            'hue-1': '100',
            'hue-2': '700',
            'hue-3': '900'
        })
        .accentPalette('Accent', {'default': '500'});
        $mdThemingProvider.setDefaultTheme('checkedup');

    $urlRouterProvider.otherwise('/');
        // $locationProvider.html5Mode(true);
        $stateProvider
        .state('site', {
            'abstract': true,
            resolve: {
                authorize: ['authorization',
                function(authorization) {
                    return authorization.authorize();
                }
                ]
            }
        })
        .state('module',{
            url:'/dashboard/module/:id',
            parent:'site',
            data: {
                roles: ['User']
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/dashboard/dashboard.html',
                    controller:'DashboardCtrl'
                }
            }

        })

        .state('questions',{
            url:'/dashboard/module/:id/questions',
            parent:'site',
            data: {
                roles: ['User']
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/dashboard/questions/question.html',
                    controller:'QuestionCtrl'
                }
            }

        })

        .state('summary',{
            url:'/dashboard/questions',
            parent:'site',
            data: {
                roles: ['User']
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/dashboard/questions-summary/question-summary.html',
                    controller:'QuestionSummaryCtrl'
                }
            }

        })

        .state('dashboard',{
            url:'/dashboard',
            parent:'site',
            data: {
                roles: ['User']
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/dashboard/dashboard.html',
                    controller:'DashboardCtrl'
                }
            }

        })

        .state('welcome',{
            url:'/welcome',
            parent:'site',
            data: {
                roles: ['User']
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/dashboard/welcome/welcome.html',
                    controller:'WelcomeCtrl'
                }
            }

        })

        .state('create-password',{
            url:'/reset/:code',
            parent:'site',
            data: {
                roles: []
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/create-password/create-password.html',
                    controller:'CreatePasswordCtrl'
                }
            }

        })
        .state('create-password-forgot',{
            url:'/forgot/:code',
            parent:'site',
            data: {
                roles: []
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/create-password/create-password.html',
                    controller:'CreatePasswordCtrl'
                }
            }

        })

        .state('account',{
            url:'/dashboard/account',
            parent:'site',
            data: {
                roles: ['User']
            },

            views: {
                'content@': {
                    templateUrl:'scripts/home/login/dashboard/account/account.html',
                    controller:'AccountCtrl'
                }
            }

        })
        .state('register',{
            url:'/register/:code?email',
            parent:'site',
            data: {
                roles: []
            },

            views: {
                'content@': {
                    templateUrl:'scripts/home/register.html',
                    controller:'RegisterCtrl'
                }
            }
        })
        .state('login',{
            url:'/',
            parent:'site',
            data: {
                roles: []
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/login.html',
                    controller:'LoginCtrl'
                }
            }
        })

        .state('doctor',{
            url:'/dashboard/doctor',
            parent:'site',
            data: {
                roles: ['User']
            },
            views: {
                'content@': {
                    templateUrl:'scripts/home/login/dashboard/doctor/doctor.html',
                    controller:'DoctorCtrl'
                }
            }
        });

    })

.run(['$rootScope', '$state', '$stateParams', 'authorization', 'Principal', '$mdDialog',
    function($rootScope, $state, $stateParams, authorization, Principal, $mdDialog) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState) {
            //The user just reload the page and the state is module, then go to welcome state
            if ( (fromState.name == '') && (toState.name == 'module') ) {
                event.preventDefault();
                $state.go('welcome');
            };
            if((fromState.name == 'module')){
                $rootScope.audioPause();
            }
            if (fromState.name == "summary") {
                $rootScope.$broadcast("summaryChange", toState.name);

                if (!$rootScope.canChange) {
                    event.preventDefault();
                    $rootScope.canChange = null;
                }
            }

            $mdDialog.hide();
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (Principal.isIdentityResolved()) {
                authorization.authorize();
            }
        });
    }
])


    .factory('authorization', ['$rootScope', '$state', 'Principal',
        function($rootScope, $state, Principal) {
            return {
                authorize: function(force) {

                    return Principal.identity(force).then(function() {
                        var isAuthenticated = Principal.isAuthenticated();
                        if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !Principal.isInAnyRole($rootScope.toState.data.roles)) {
                            if (isAuthenticated) {
                                $state.go('login');
                            } else {
                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;
                                $rootScope.isLoginActived = true;
                                $state.go('login');
                            }
                        }
                    });

                }
            };
        }
    ])

.factory('Principal', ['$q', '$http', '$timeout',
  function($q, $http, $timeout) {
    var _identity = undefined,
    _authenticated = false;

    return {
      isIdentityResolved: function() {
        return angular.isDefined(_identity);
    },
    isAuthenticated: function() {
        return _authenticated;
    },
    isInRole: function(role) {
        if (!_authenticated || !_identity.roles) return false;

        return _identity.roles.indexOf(role) != -1;
    },
    isInAnyRole: function(roles) {
        if (!_authenticated || !_identity.roles) return false;

        for (var i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) return true;
      }

      return false;
  },
  authenticate: function(identity) {
    _identity = identity;
    _authenticated = identity != null;

            if (identity) sessionStorage.setItem("identity", angular.toJson(identity));
            else sessionStorage.removeItem("identity");
        },
        identity: function(force) {
            var deferred = $q.defer();

            if (force === true) _identity = undefined;

            if (angular.isDefined(_identity)) {
              deferred.resolve(_identity);

              return deferred.promise;
          }


            var self = this;
            $timeout(function() {
              _identity = angular.fromJson(sessionStorage.getItem("identity"));
              self.authenticate(_identity);
              deferred.resolve(_identity);
          }, 1000);

            return deferred.promise;
        }
    };
}
]);
