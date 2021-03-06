(function (global, ng) {

    'use strict';

    global.Settings = {
        showTimer: 2000,
        numberWordsInGroup: 4,
        numberGroupsInIncentive: 4,
        numberIncentives: 1,
        probabilityWordFeature: 0.25
    };

    global.Words = JSON.parse(JSON.stringify(global.DefaultExperimentWords));

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
        },
        isLoggedIn: false
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
                var settings = global.localStorage.Settings;
                var words = global.localStorage.Words;

                if(settings) {
                    global.Settings = JSON.parse(settings);
                }

                if(words) {
                    global.Words = JSON.parse(words);
                }

                $rootScope.$on('$routeChangeSuccess',
                    function (event, next, current) {

                        if(!next.$$route || (!Permissions.isLoggedIn && next.$$route.originalPath !== '/login')) {
                            $location.url('/login');
                        }

                    });
            }
        ]);

}(this, angular));