'use strict';

angular.module('checkedUpApp')
    .controller('MainCtrl', function ($scope, $rootScope, $mdDialog, $mdSidenav,  $mdToast, $state) {

        $scope.isTouchDevice = isTouchDevice();
        $scope.isIphone = false;
        $scope.loading = false;

        $rootScope.$on('toast', function (event, alert) {
            $mdToast.show(
                $mdToast.simple()
                    .content(alert)
                    .position('bottom')
                    .hideDelay(2500)
                    .action('OK')
            );
        });

        $rootScope.$on('toastBottom', function (event, alert, element) {
            $mdToast.show(
                $mdToast.simple()
                    .content(alert)
                    .action('OK')
                    .highlightAction(false)
                    .hideDelay(false)
                    .parent(element)
                    .position('bottom')
                    .hideDelay(2500)
            );
        });

        $rootScope.$on('modal', function (event, alert){
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .content(alert)
                    .ok('Got it!')
                    .targetEvent(event)
            );
        });

        $rootScope.getAudioReady = function(){
            var audio = document.getElementById('audio');
            if(audio){
                if(audio.src == ""){
                    audio.play();
                    audio.pause();
                }else{
                    audio.load();
                }
            }
        };

        $rootScope.audioPause = function(){
            var audio = document.getElementById('audio');
            if(audio){
                if(!audio.paused){
                    audio.pause();
                }
            }
            var video = document.getElementById('video_player');
            if(video){
                if(!video.paused){
                    video.pause();
                }
            }
        };

        $scope.device = function(){
            if (window.navigator.userAgent.match(/iPhone/i)) {
                $scope.isIphone = true;
            }
        };
        $scope.device();

        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.getUser = function () {
            try{
                var user = angular.fromJson(sessionStorage.user);
                var userToSend = {};
                userToSend.firstName = user.firstName;
                userToSend.lastName = user.lastName;
                return userToSend;
            }catch(err){
                return{};
            }
        };

        $scope.getDoctor = function () {
            try{
                var user = angular.fromJson(sessionStorage.user);
                var doctor = user.doctors[0];
                var doctorToSend = {};
                doctorToSend.firstName = doctor.firstName;
                doctorToSend.lastName = doctor.lastName;
                doctorToSend.prefixName = doctor.prefixName;
                return doctorToSend;
            }catch(err){
                return{};
            }
        };

        $rootScope.getSurgery = function () {
            try{
                var user = angular.fromJson(sessionStorage.user);
                var userConfigurationId = angular.fromJson(sessionStorage.user).activeConfiguration.id;
                var userSurgery;
                angular.forEach(angular.fromJson(sessionStorage.user).doctors[0].configurations, function(config){
                    if (userConfigurationId == config.id) {
                        userSurgery = config;
                    }
                });
                var surgeryType = userSurgery.surgeryType;
                var surgeryToSend = {};
                surgeryToSend.name = surgeryType.name;
                return surgeryToSend;
            }catch(err){
                return{};
            }
        }

        $scope.logout = function(ev){
            $mdDialog.show({
                controller: 'logoutDialogCtrl',
                templateUrl: 'scripts/home/login/dashboard/logout/logout.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

        function isTouchDevice(){
            return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        }
    });
