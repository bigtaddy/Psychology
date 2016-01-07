(function (global, ng) {

    'use strict';

    function Incentive () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="incentive"></div>',
            scope: {
                experimentType: '=',
                incentives: '=',
                indexesFeatures: '='
            },
            link: function (scope, element) {

                var fragmentElement = document.createDocumentFragment();
                var ulElement = document.createElement('ul');
                var liElement = document.createElement('li');


                //incentive contains words

                var wordElements = [];
                scope.incentives.forEach(function (word, wordIndex) {
                    var li = liElement.cloneNode();
                    if (!!~scope.indexesFeatures.indexOf(wordIndex)) {
                        if (scope.experimentType === 3) {
                            li.className = ('fontSizeFeature');
                        } else if (scope.experimentType === 4) {
                            li.className = ('fontBoldFeature');
                        } else if (scope.experimentType === 5) {
                            li.className = ('fontSizeFeature');
                        }
                    }
                    li.textContent = word;
                    wordElements.push(li);
                });

                wordElements= wordElements.split(Settings.numberWordsInGroup);
                wordElements.forEach(function (group) {
                    var ul = ulElement.cloneNode();
                    group.forEach(function (word) {
                        ul.appendChild(word);
                    });
                    fragmentElement.appendChild(ul);
                });

                element[0].appendChild(fragmentElement);

                if (scope.experimentType === 2 || scope.experimentType === 5) {
                    element[0].classList.add('words-in-groups');
                }

            }
        };
    }

    app.directive('incentive', [
        Incentive
    ]);

}(window, angular));




