/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function MainController($scope, $location, ExperimentService) {

        $scope.isAdminPermissions = global.Permissions.role === 'admin';

        $scope.startExperiment = function (experimentType) {
            ExperimentService.experimentType = experimentType;
            $location.url('/experiment');
        };


        $scope.changeSettings = function () {
            $location.url('/settings');
        };

        $scope.changeIncentives = function () {
            $location.url('/incentives-menu');
        };

    }


    app.controller('MainController', MainController);


}(window, angular));