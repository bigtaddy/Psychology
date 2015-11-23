/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function IncentivesController($scope, $location, $route) {

        var incentiveNumber = $route.current.params.number;
        var words = global.Words[incentiveNumber];
        if(words && words.length){
            $scope.words = words.slice();
        }

        $scope.newWord = {
            name: ''
        };

        $scope.words = [];

        $scope.add = function ( ) {
            $scope.words.push($scope.newWord.name);
            $scope.newWord.name = '';
            document.querySelector('.new-word').focus();
        };

        $scope.remove = function (index) {
            $scope.words.splice(index, 1);
        };

        $scope.save = function () {
            global.Words[1] = $scope.words.slice();
            global.localStorage.Words = JSON.stringify(global.Words);
            $location.url('/');
        };

        $scope.return = function () {
            $location.url('/');
        };


    }


    app.controller('IncentivesController', IncentivesController);


}(window, angular));