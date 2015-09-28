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
                scope.incentives = scope.incentives.split(Settings.NumberWordsInGroup);
                scope.incentives.forEach(function (group, groupIndex) {
                    var ul = ulElement.cloneNode();

                    group.forEach(function (word, wordIndex) {
                        var li = liElement.cloneNode();
                        var index = (wordIndex + 1) * (groupIndex + 1);
                        if (!!~scope.indexesFeatures.indexOf(index)) {
                            if (scope.experimentType === 3) {
                                li.className = ('fontSizeFeature');
                            } else if (scope.experimentType === 4) {
                                li.className = ('fontBoldFeature');
                            } else if (scope.experimentType === 5) {
                                 li.className = ('fontSizeFeature');
                                 li.className = ('fontBoldFeature');
                            }
                        }
                        li.textContent = word;
                        ul.appendChild(li);
                    });
                    fragmentElement.appendChild(ul);
                });

                element[0].appendChild(fragmentElement);

                if (scope.experimentType === 2) {
                    element[0].addClass('wordsInGroups');
                }

            }
        };
    }

    app.directive('incentive', [
        Incentive
    ]);

}(window, angular));




