/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function HomeController($scope, $timeout, $location, ExperimentService) {
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
        var showTimer = Settings.showTimer;
        $scope.experimentType = ExperimentService.experimentType;

        var counter = 0;

       /* var experimentIncentives = [
            ['щука', 'окунь', 'кит','перловка',
                'гречка', 'рис','мотоцикл', 'машина',
                'трактор','инфляция', 'дефляция', 'процент',
                'стул', 'стол', 'гамак']
        ,
                ['щука', 'окунь', 'кит','перловка',
                    'гречка', 'рис','мотоцикл', 'машина',
                    'трактор','инфляция', 'дефляция', 'процент',
                    'стул', 'стол', 'гамак']
            ];*/

        global.Words = global.DefaultExperimentWords;
        var experimentIncentives = global.Words[$scope.experimentType];

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

        $scope.goToMenu = function(){
            $location.url('/');
        };

        $scope.saveResults = function () {
            // convertImagesToBase64();
            // for demo purposes only we are using below workaround with getDoc() and manual
            // HTML string preparation instead of simple calling the .getContent(). Becasue
            // .getContent() returns HTML string of the original document and not a modified
            // one whereas getDoc() returns realtime document - exactly what we need.
            //var contentDocument = tinymce.get('content').getDoc();
            var resultElement = document.body.querySelector('.result-grid');
            var content = '<!DOCTYPE html>' + resultElement.outerHTML;
            var orientation = document.querySelector('.page-orientation input:checked').value;
            var converted = htmlDocx.asBlob(content);

            saveAs(converted, 'test.docx');

            var link = document.createElement('a');
            link.href = URL.createObjectURL(converted);
            link.download = 'document.docx';
            link.appendChild(
                document.createTextNode('Click here if your download has not started automatically'));
            var downloadArea = document.getElementById('download-area');
            downloadArea.innerHTML = '';
            downloadArea.appendChild(link);
        };

        //start show
        $scope.showIncentive();
    }


    app.controller('HomeController', HomeController);


}(window, angular));