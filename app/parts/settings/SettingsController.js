/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function SettingsController($scope, $location) {

        $scope.settings = {
            showTimer: global.Settings.showTimer,
            numberWordsInGroup: global.Settings.numberWordsInGroup,
            numberGroupsInIncentive: global.Settings.numberGroupsInIncentive,
            numberIncentives: global.Settings.numberIncentives,

            probabilityWordFeature: global.Settings.probabilityWordFeature
        };

        $scope.timers = [2000, 3000, 4000, 5000];
        $scope.wordNumbers = [3, 4];
        $scope.groupNumbers = [4, 5];
        $scope.incentiveNumbers = [1, 2, 3, 4];
        $scope.probabilities = [0.25, 0.3];

        $scope.save = function () {
            ng.copy($scope.settings, global.Settings);
          //  global.Settings = $scope.settings; //fix
            global.localStorage.Settings = JSON.stringify(global.Settings);
            $location.url('/');
        };

        $scope.return = function () {
            $location.url('/');
        };

    }


    app.controller('SettingsController', SettingsController);

}(window, angular));