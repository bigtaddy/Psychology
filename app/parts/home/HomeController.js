/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function HomeController ($scope, $timeout, $location, ExperimentService) {
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
        var timerId;
        var imagesContainer = document.createElement('div');
        var images = [];
        var showTimer = Settings.showTimer;
        $scope.experimentType = ExperimentService.experimentType;

        var counter = 0;

        global.Words = global.DefaultExperimentWords;
        var experimentIncentives = global.Words[$scope.experimentType];

        function takeSnapshot (callback) {
            if(global.win) {
                global.win.capturePage(function (img) {
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
            $scope.incentives = experimentIncentives[counter].slice();
            $scope.indexesFeatures = ExperimentService.getIndexesOfWordsWithFeatures($scope.incentives.length);

            $scope.results[counter] = {
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
                        ++counter;
                        if (counter >= experimentIncentives.length) {
                            $scope.isFinished = true;
                        }
                    }, showTimer - 100)
                });

            }, 100);

        };

        $scope.addRememberedWord = function () {
            $scope.results[counter - 1].rememberedWords.push($scope.result.rememberedWord);
            $scope.result.rememberedWord = '';
            document.querySelector('#input-remembered-word').focus();
        };

        $scope.goToMenu = function () {
            $location.url('/');
        };

        $scope.saveResults = function () {
            $scope.saveInProgres = true;
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


            // var content = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title></title> </head>
            // <body>' + resultElement.outerHTML + '</body></html>';
            var content = '<!DOCTYPE html>' + document.documentElement.outerHTML;
            var converted = global.htmlDocx.asBlob(content);
            var filename = global.Permissions.userData.fullName + ' ' + global.Permissions.userData.group + '.docx';

            tableResult.innerHTML = cloneTableResult.innerHTML;


           // saveAs(converted, filename);

            global.Permissions.userData.fullName = 'администратор';

            var experimentRootPath = './Результаты экспериментов/';
            var currentDate = new Date(Date.now());
            var pathForResult = experimentRootPath + global.Permissions.userData.fullName + ' ' +
                currentDate.toLocaleDateString() + ' ' + currentDate.getHours() + 'ч ' + currentDate.getMinutes() + 'м ' + currentDate.getSeconds() + 'с ';


            if(!global.fs.existsSync(pathForResult)) {
                global.fs.mkdirSync(pathForResult, '0766');
                global.fs.writeFileSync(pathForResult + '/отчет эксперимента №' + ExperimentService.experimentType +'.docx', converted);
                 images.forEach(function (image, index) {
                         var base64Data = image.replace(/^data:image\/png;base64,/, '');
                         global.fs.writeFileSync(pathForResult + '/набор слов ' + (index + 1) + '.png', base64Data, 'base64');
                     }
                 );
             }

            global.notifier.notify({
                title: 'Сохранение',
                // Формируем строку, в которой будет написано: Файл MyLittlePony.md успешно сохранён!
                message: 'Отчет  успешно сохранен!'
            });
            $scope.saveInProgres = false;

        };

        //start show
        $scope.showIncentive();

        $scope.$on('destroy', function () {
            $timeout.cancel();
        })
    }


    app.controller('HomeController', HomeController);


}(window, angular));