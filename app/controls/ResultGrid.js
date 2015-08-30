(function (global, ng) {

    'use strict';

    function ResultGrid () {
        return {
            restrict: 'E',
            replace: true,
            template: '<table class="result-grid pure-table pure-table-bordered"></table>',
            scope: {
                result: '=',
                experimentNumber: '='
            },
            link: function (scope, element) {

                if(!scope.result) {
                    return;
                }

                var fragmentElement = document.createDocumentFragment();
                var trElement =  document.createElement('tr');
                var tdElement =  document.createElement('td');

                if(scope.experimentNumber === 1) {

                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.textContent = 'Номер стимула';
                    tr.appendChild(td);
                    scope.result.incentives.forEach(function(intencive, index) {
                        var td = tdElement.cloneNode();
                        td.textContent = index + 1;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.textContent = 'Количество воспринятых слов';
                    tr.appendChild(td);

                    scope.result.incentives.forEach(function(intencive) {
                        var td = tdElement.cloneNode();
                        td.textContent = intencive.numberPerceivedWords;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.textContent = 'Среднее количество воспринятых слов';
                    tr.appendChild(td);
                    var td = tdElement.cloneNode();
                    td.textContent = scope.result.averageNumberPerceivedWords;
                    tr.appendChild(td);
                    fragmentElement.appendChild(tr);

                    element[0].appendChild(fragmentElement);
                }
            }
        };
    }

    app.directive('resultGrid', [
        ResultGrid
    ]);

}(window, angular));




