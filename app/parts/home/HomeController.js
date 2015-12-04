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
        var imagesContainer = document.createElement('div');
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

        function takeSnapshot() {
            win.capturePage(function(img) {
                var image = document.createElement('img');
                image.src = img;
                imagesContainer.appendChild(image);
            }, 'png');
        }

        $scope.showIncentive = function () {
            if ($scope.isFinished) {
                $scope.experimentResults = new ExperimentResults($scope.results, $scope.experimentType);
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
            takeSnapshot();

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

        $scope.goToMenu = function () {
            $location.url('/');
        };

        $scope.saveResults = function () {
            var tableResult = document.querySelector('.result-grid');
            var cloneTableResult = tableResult.cloneNode(true);

            var elements = tableResult.querySelectorAll('*');
            var style;
            var styleText = '';
            for (var i = 0, max = elements.length; i < max; i++) {
                style = document.defaultView.getComputedStyle(elements[i]);
                var keys = Object.keys(style);
                keys.forEach(function (key) {
                    styleText += key + ':' + style[key] + '; ';
                });
                styleText += 'font-size' + ':' + '18px' + '; ';
                elements[i].style.cssText = styleText;
            }

           var buttons = document.querySelectorAll('.pure-button');
            for (var i = 0, max = buttons.length; i < max; i++) {
                buttons[i].style.display = 'none';
            }

            // var content = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title></title> </head> <body>' + resultElement.outerHTML + '</body></html>';
            var content = '<!DOCTYPE html>' + document.documentElement.outerHTML;
            var converted = htmlDocx.asBlob(content);
            var docName = global.Permissions.userData.fullName + ' ' + global.Permissions.userData.group + '.docx';

            tableResult.innerHTML = cloneTableResult.innerHTML;
            for (var i = 0, max = buttons.length; i < max; i++) {
                buttons[i].style.display = '';
            }

            saveAs(converted, docName);

            var buf = new Buffer(converted, 'base64');
          /*  require('fs').writeFile('/Результаты/' + docName, buf, 'base64', function(err) {
                if(err) {
                    alert(err);
                }
            });*/

            //    var link = document.createElement('a');
            //   link.href = URL.createObjectURL(converted);
            //   link.download = 'document.docx';
            //   link.click();

        };

        //start show
        $scope.showIncentive();
    }


    app.controller('HomeController', HomeController);


}(window, angular));