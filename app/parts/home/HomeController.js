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

        var timerId;
        var imagesContainer = document.createElement('div');
        var images = [];
        var showTimer = Settings.showTimer;
        $scope.experimentType = ExperimentService.experimentType;

        var incentiveCounter = 0;

        global.Words = DefaultExperimentWords;
        var experimentIncentives = global.Words[$scope.experimentType];

        function takeSnapshot(callback) {
            if (win) {
                win.capturePage(function (img) {
                    var image = document.createElement('img');
                    image.src = img;
                    image.style.display = 'none';
                    image.style.width = '600px';
                    imagesContainer.appendChild(image);

                    images.push(img);
                    callback();
                }, 'png');
            } else {
                callback();
            }

        }

        $scope.showIncentive = function () {
            if ($scope.isFinished) {
                $scope.experimentResults = new ExperimentResults($scope.results, $scope.experimentType);
                $scope.isShowForm = false;
                $scope.isShowResult = true;
                return;
            }
            //create new result
            $scope.incentives = experimentIncentives[incentiveCounter].slice();
            $scope.indexesFeatures = ExperimentService.getIndexesOfWordsWithFeatures($scope.incentives.length);

            $scope.results[incentiveCounter] = {
                incentive: $scope.incentives,
                indexesFeatures: $scope.indexesFeatures,
                rememberedWords: []
            };

            $scope.isShowForm = false;
            $scope.isShowIncentive = true;


            timerId = $timeout(function () {
                takeSnapshot(function () {
                    timerId = $timeout(function () {
                        $scope.isShowIncentive = false;
                        $scope.isShowForm = true;
                        ++incentiveCounter;
                        if (incentiveCounter >= experimentIncentives.length) {
                            $scope.isFinished = true;
                        }
                    }, showTimer - 100)
                });

            }, 100);

        };

        $scope.addRememberedWord = function () {
            $scope.results[incentiveCounter - 1].rememberedWords.push($scope.result.rememberedWord);
            $scope.result.rememberedWord = '';
            document.querySelector('#input-remembered-word').focus();
        };

        $scope.goToMenu = function () {
            $location.url('/');
        };

        $scope.saveResults = function () {
            var userFullName = global.Permissions.userData.fullName;
            var userGroup = global.Permissions.userData.group;
            var currentDate = new Date(Date.now());

            $scope.saveInProgres = true;
            var tableResult = document.querySelector('.result-grid');
            var cloneTableResult = tableResult.cloneNode(true);
            var elements = tableResult.querySelectorAll('*');
            var cloneElements = cloneTableResult.querySelectorAll('*');
            var style;
            var styleText = '';
            for (var i = 0, max = elements.length; i < max; i++) {
                style = document.defaultView.getComputedStyle(elements[i]);
                var keys = Object.keys(style);
                keys.forEach(function (key) {
                    styleText += key + ':' + style[key] + '; ';
                });
                styleText += 'font-size:18px; ';

                cloneElements[i].style.cssText = styleText;
            }


            var infoElement = document.createElement('div');
            infoElement.style.cssText = 'font-size:18px;';
            infoElement.innerHTML = 'Испытуемый: ' + userFullName + ' <br/>' +
                'Группа: ' + userGroup + ' <br/>' +
            'Дата и время: ' + currentDate.toLocaleString() + ' <br/>';

            var content = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title></title> </head>' +
                '<body>' + infoElement.outerHTML +
                cloneTableResult.outerHTML + '</body></html>';
            var converted = htmlDocx.asBlob(content);

            var experimentRootPath = './Результаты экспериментов';
            var pathForResult = experimentRootPath + '/' +
                userFullName + ' ' +
                currentDate.toLocaleDateString() + ' ' +
                currentDate.getHours() + 'ч ' +
                currentDate.getMinutes() + 'м ' +
                currentDate.getSeconds() + 'с ';


            if (!fs.existsSync(pathForResult)) {
                if (!fs.existsSync(experimentRootPath)) {
                    fs.mkdirSync(experimentRootPath, '0766');
                }
                fs.mkdirSync(pathForResult, '0766');
                fs.writeFileSync(pathForResult + '/отчет эксперимента №' + ExperimentService.experimentType + '.docx', converted);
                images.forEach(function (image, index) {
                        var base64Data = image.replace(/^data:image\/png;base64,/, '');
                        fs.writeFileSync(pathForResult + '/набор слов ' + (index + 1) + '.png', base64Data, 'base64');
                    }
                );
            }

            var notification = new Notification("Сохранение", {
                body: 'Отчет сохранен в папке "Результаты экспериментов"'
            });
        };

        //start show
        $scope.showIncentive();

        $scope.$on('destroy', function () {
            $timeout.cancel(timerId);
        })
    }


    app.controller('HomeController', HomeController);


}(window, angular));