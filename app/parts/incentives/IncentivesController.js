/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function IncentivesController($scope, $location, $route) {


        var Words = global.Words;

        var experimentNumber =  $route.current.params.number;
        $scope.settings = {numberIncentives: 1};
        $scope.incentiveNumbers = [];

        var incentives = [];
        if(!Words[experimentNumber]) {
            Words[experimentNumber] = [];
        }
        incentives = global.Words[experimentNumber];
        if(!incentives || !incentives.length) {
            incentives = [];
        }

        var i = 0;
        for(i = 0; i < global.Settings.numberIncentives; i++) {
            $scope.incentiveNumbers.push(i+1);
            if(!incentives[i]) {
                incentives.push([]);
            }
            if(!Words[experimentNumber][i]) {
                Words[experimentNumber].push([]);
            }
        }




        var changeIncentive = function () {
            incentives = global.Words[experimentNumber];
            $scope.words = incentives[$scope.settings.numberIncentives-1].slice();
        };

        $scope.$watch('settings.numberIncentives', function(oldValue, newValue){
            if(newValue) {
                changeIncentive();
            }
        });

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

            Words[experimentNumber][$scope.settings.numberIncentives-1] = $scope.words.slice();
            global.localStorage.Words = JSON.stringify(Words);
        };

        $scope.return = function () {
            $location.url('/');
        };


    }


    app.controller('IncentivesController', IncentivesController);


}(window, angular));