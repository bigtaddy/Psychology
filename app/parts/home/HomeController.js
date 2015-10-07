/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function HomeController($scope, $timeout, ExperimentService) {
        $scope.isShowIncentive = false;
        $scope.isShowForm = false;
        $scope.isShowResult = false;
        $scope.isFinished = false;
        $scope.result = {
            rememberedWord: ''
        };
        $scope.results = [];
        $scope.incentives = [];

        var results = [];
        var showTimer = Settings.ShowTimer;
        $scope.experimentType = ExperimentService.experimentType;

        var counter = 0;

        var experimentIncentives = [
            ['щука', 'окунь', 'кит','перловка',
                'гречка', 'рис','мотоцикл', 'машина',
                'трактор','инфляция', 'дефляция', 'процент',
                'стул', 'стол', 'гамак']
        ,
                ['щука', 'окунь', 'кит','перловка',
                    'гречка', 'рис','мотоцикл', 'машина',
                    'трактор','инфляция', 'дефляция', 'процент',
                    'стул', 'стол', 'гамак']
            ];

        $scope.showIncentive = function () {
            if ($scope.isFinished) {
                $scope.experimentResults  = new ExperimentResults($scope.results, $scope.experimentType);
                $scope.isShowForm = false;
                $scope.isShowResult = true;
                return;
            }
            //create new result
            $scope.incentives = experimentIncentives[counter].slice();
            $scope.indexesFeatures = ExperimentService.getIndexesOfWordsWithFeatures($scope.incentives.length);

            $scope.results[counter] = {
                 incentive: $scope.incentives,
                 indexesFeatures: $scope.indexesFeatures,
                 rememberedWords: []

            };
            $scope.isShowForm = false;
            $scope.isShowIncentive = true;

            $timeout(function () {
                $scope.isShowIncentive = false;
                $scope.isShowForm = true;
                ++counter;
                if (counter >= experimentIncentives.length) {
                    $scope.isFinished = true;
                }
                }, showTimer)
        };

        $scope.addRememberedWord = function () {
            $scope.results[counter - 1].rememberedWords.push($scope.result.rememberedWord);
            $scope.result.rememberedWord = '';
        };

        //start show
        $scope.showIncentive();
    }


    app.controller('HomeController', HomeController);


}(window, angular));