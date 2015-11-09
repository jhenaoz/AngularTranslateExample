'use strict';

angular.module('checkedUpApp')
	.controller('RegisterCtrl', function ($scope, $rootScope, $mdDialog, $state, $stateParams, PatientService, Principal) {
        $scope.user = {};
        $scope.doctor = {};
        $scope.patient = {};
        $scope.loading = false;
        $scope.submitted = false;
        $scope.init = function(){
            console.log('in the init method');
            $scope.user = {
                agreedToTou : false
            };
            if($stateParams.code != ''){
                $scope.loading = true;
                PatientService.invitation($stateParams.code).then(function(response){
                    $scope.loading = false;
                    $scope.patient = response.data;
                }, function(error){
                    $scope.loading = false;
                    console.log(error);
                    $rootScope.email = $stateParams.email;
                    $state.go('login');
                });
            }
        };

        $scope.register = function(){
            $rootScope.getAudioReady();
            $scope.submitted = true;
            if (!$scope.registerForm.$valid || !$scope.user.agreedToTou) {
                // $scope.$emit('toastBottom', 'Invalid form');
                $scope.$emit()
                return;
            };
            var data = {
                "first_name": $scope.patient.first_name,
                "email": $scope.patient.email
            };
            $scope.loading = true;
            PatientService.acceptInvitation($stateParams.code, data).then(function(response){
                PatientService.login(data.email, response.password)
                .then(function(res){
                    $scope.loading = false;
                    var user = angular.merge({}, res.data, {
                        roles: ['User']
                    })
                    Principal.authenticate(user);
                    sessionStorage.user = JSON.stringify(res.data);
                    console.log(res.data);
                    $state.go('welcome');
                }, function(err){
                    $scope.loading = false;
                    console.debug(err);
                })
            }, function(error){
                $scope.loading = false;
            });
            // PatientService.register($scope.user.email, $scope.user.firstName, $scope.user.lastName)
            // .then(function(response){
                // PatientService.login(response.data.email, response.data.password)
                // .then(function(res){
                //     var user = angular.merge({}, res.data, {
                //         roles: ['User']
                //     })
                //     Principal.authenticate(user);
                //     sessionStorage.user = JSON.stringify(res.data);
                //     console.log(res.data);
                //     $state.go('dashboard');
                // }, function(err){
                //     console.debug(err);
                // })
            // }, function(error){
            //     try{
            //         $scope.$emit('toast', error.data.patients.errors.email);
            //     }catch(error){
            //         $scope.$emit('toast','Error with the register of user');
            //     }
            // });
        };

        $scope.showTerms = function(ev) {
          $mdDialog.show({
            controller: 'TermsDialogCtrl',
            templateUrl: 'scripts/home/terms/terms.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          });
        };

        $scope.goToLogin = function(){
            $state.go('login');
        };

	});
