/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function MainController($scope, $location, ExperimentService) {

        $scope.startExperiment = function (experimentType) {
            ExperimentService.experimentType = experimentType;
            $location.url('/experiment');
        }
    }


    app.controller('MainController', MainController);


}(window, angular));