/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function IncentivesMenuController($scope, $location) {

        $scope.editIncentive = function (number) {
            $location.url('/incentives/' + number);
        };

        $scope.return = function () {
            $location.url('/');
        };


    }


    app.controller('IncentivesMenuController', IncentivesMenuController);


}(window, angular));