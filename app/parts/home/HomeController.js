/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function HomeController($scope, $timeout, IncentiveService) {
        $scope.isShowIncentive = false;
        $scope.isShowForm = false;
        $scope.isShowResult = false;
        $scope.isFinished = false;
        $scope.result = {
            rememberedWord: ''
        };
        $scope.incentive;

        var results = [];
        var showTimer = Settings.ShowTimer;
        var counter = 0;

        $scope.incentives = [[
            ['щука', 'окунь', 'кит','перловка',
                'гречка', 'рис','мотоцикл', 'машина',
                'трактор','инфляция', 'дефляция', 'процент',
                'стул', 'стол', 'гамак']
        ]];

        $scope.showIncentive = function () {
            if ($scope.isFinished) {
                IncentiveService.handleResults(results, $scope.incentives, 1);
                $scope.results = results;
                $scope.isShowForm = false;
                $scope.isShowResult = true;
                return;
            }
            //create new result
            results[counter] = {
                 incentive: $scope.incentives[counter],
                 rememberedWords: []

            };
            $scope.isShowForm = false;
            $scope.isShowIncentive = true;

            $timeout(function () {
                $scope.isShowIncentive = false;
                $scope.isShowForm = true;
                ++counter;
                if (counter >= $scope.incentives.length) {
                    $scope.isFinished = true;
                }
                }, showTimer)
        };

        $scope.addRememberedWord = function () {
            results[counter - 1].rememberedWords.push($scope.result.rememberedWord);
            $scope.result.rememberedWord = '';
        };

        //start show
        $scope.showIncentive();
    }


    app.controller('HomeController', HomeController);


}(window, angular));