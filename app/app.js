(function (global, ng) {

    'use strict';

    global.Settings = {
        showTimer: 2000,
        numberWordsInGroup: 4,
        numberGroupsInIncentive: 4,
        numberIncentives: 1,
        probabilityWordFeature: 0.25
    };

    global.Words= {};

    global.AdminAccount = {
        login: 'admin',
        password: 'ipoit'
    };

    global.Permissions = {
        role: 'admin',
        userData: {
            password: '',
            fullName: '',
            group: ''
        }
    };

    global.app = ng.module('Psychology', [
        'ngRoute'
    ]);

    app.config([
            '$routeProvider',
            '$locationProvider',
            function ($routeProvider, $locationProvider) {

               // $locationProvider.html5Mode(true);

                $routeProvider
                    .when('/login', {
                        templateUrl: 'app/parts/login/login.html',
                        controller: 'LoginController'
                    })
                    .when('/', {
                        templateUrl: 'app/parts/main/main.html',
                        controller: 'MainController'
                    })
                    .when('/experiment', {
                        templateUrl: 'app/parts/home/home.html',
                        controller: 'HomeController'
                    })
                    .when('/settings', {
                        templateUrl: 'app/parts/settings/settings.html',
                        controller: 'SettingsController'
                    })
                    .when('/incentives/:number', {
                        templateUrl: 'app/parts/incentives/incentives.html',
                        controller: 'IncentivesController'
                    })
                    .when('/incentives-menu', {
                        templateUrl: 'app/parts/incentives/incentivesMenu.html',
                        controller: 'IncentivesMenuController'
                    })
                    .otherwise({
                        redrectTo: '/'
                    });


            }
        ])
        .factory('authHttpResponseInterceptor', [
            '$q',
            '$location',
            '$rootScope',
            function ($q, $location, $rootScope) {
                return {
                    responseError: function (data) {
                        if (data.status === 401) {
                            $rootScope.$broadcast('notAuthorized');
                            $location.url('/login');
                        }
                        return $q.reject(data);
                    }
                };
            }
        ])
        .config([
            '$httpProvider',
            function ($httpProvider) {
                $httpProvider.interceptors.push('authHttpResponseInterceptor');
            }
        ])
        .run([
            '$rootScope', '$location',
            function ($rootScope, $location) {


                var loader = global.document.getElementById('loader'),
                    opacity = 1,
                    fadeOut = function () {
                        setTimeout(function () {
                            opacity -= 0.1;
                            loader.style.opacity = opacity;

                            if (opacity > 0) {
                                fadeOut();
                            } else {
                                loader.parentNode.removeChild(loader);
                                loader = null;
                            }
                        }, 50);
                    };
                global.document.onload = fadeOut();

            //    $location.url('/login');

                var settings = global.localStorage.Settings;
                if(settings) {
                    global.Settings = JSON.parse(settings);
                }
                var words = global.localStorage.Words;
                if(words) {
                    global.Words = JSON.parse(words);
                }
            }
        ]);

}(this, angular));