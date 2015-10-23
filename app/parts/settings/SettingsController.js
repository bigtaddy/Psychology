/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function SettingsController($scope, $location, ExperimentService) {

        $scope.isAdminPermissions = global.Permissions.role === 'admin';

        $scope.startExperiment = function (experimentType) {
            ExperimentService.experimentType = experimentType;
            $location.url('/experiment');
        };


        $scope.changeSettings = function () {
            $location.url('/settings');
        };


    }


    app.controller('SettingsController', SettingsController);


}(window, angular));