(function (global, ng) {

    'use strict';

    function Incentive () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="incentive"></div>',
            scope: {
                incentiveWithGroups: '=',
                incentive: '='
            },
            link: function (scope, element) {

                var fragmentElement = document.createDocumentFragment();
                var ulElement =  document.createElement('ul');
                var liElement =  document.createElement('li');

                if(scope.incentiveWithGroups) {
                    //incentive contains groups (columns of words)
                    scope.incentiveWithGroups.forEach(function(group) {
                        var ul = ulElement.cloneNode();

                        group.forEach(function(word) {
                            var li = liElement.cloneNode();
                            li.textContent = word;
                            ul.appendChild(li);
                        });
                        fragmentElement.appendChild(ul);
                    });

                    element[0].appendChild(fragmentElement);

                } else if(scope.incentive) {
                    //incentive contains words
                    scope.incentive = scope.intencive.split(global.GroupWordsNumber);
                    scope.incentive.forEach(function(group) {
                        var ul = ulElement.cloneNode();

                        group.forEach(function(word, index) {
                            var li = liElement.cloneNode();
                            li.textContent = word;
                            ul.appendChild(li);
                        });
                        fragmentElement.appendChild(ul);
                    });

                    element[0].appendChild(fragmentElement);
                }

            }
        };
    }

    app.directive('incentive', [
        Incentive
    ]);

}(window, angular));




