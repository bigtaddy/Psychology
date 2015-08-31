(function (global, ng) {

    'use strict';


    global.Settings = {
        ShowTimer: 2000,
        GroupWordsNumber: 3
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
                    .when('/', {
                        templateUrl: 'app/parts/home/home.html',
                        controller: 'HomeController'
                    } )
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
            '$rootScope',
            function ($rootScope) {

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


            }
        ]);

}(this, angular));