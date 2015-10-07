(function (global, ng) {

    'use strict';

    function ResultGrid() {
        return {
            restrict: 'E',
            replace: true,
            template: '<table class="result-grid pure-table pure-table-bordered"></table>',
            scope: {
                result: '=',
                experimentType: '='
            },
            link: function (scope, element) {

                if (!scope.result) {
                    return;
                }

                var fragmentElement = document.createDocumentFragment();
                var trElement = document.createElement('tr');
                var tdElement = document.createElement('td');

                function createResultGrid1() {
                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Номер стимула';
                    tr.appendChild(td);
                    scope.result.IncentivesResults.forEach(function (intencive, index) {
                        var td = tdElement.cloneNode();
                        td.textContent = index + 1;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Количество воспринятых слов';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (intencive) {
                        var td = tdElement.cloneNode();
                        td.textContent = intencive.countRememberedWords;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Среднее количество воспринятых слов';
                    tr.appendChild(td);
                    var td = tdElement.cloneNode();
                    td.textContent = scope.result.AverageRememberedWords;
                   // td.setAttribute('colspan', 2);
                    tr.appendChild(td);
                    fragmentElement.appendChild(tr);

                    element[0].appendChild(fragmentElement);
                }


                function createResultGrid3() {
                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Номер стимула';
                    tr.appendChild(td);
                    scope.result.IncentivesResults.forEach(function (intencive, index) {
                        var td = tdElement.cloneNode();
                        td.textContent = index + 1;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Количество воспринятых слов';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (intencive) {
                        var td = tdElement.cloneNode();
                        td.textContent = intencive.countRememberedWords;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Из них, обладающих отличительным признаком,%';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (intencive) {
                        var td = tdElement.cloneNode();
                        var rememberedWordsWithFeature = 0;
                        if(intencive.countRememberedWords) {
                            rememberedWordsWithFeature =  intencive.countRememberedWordsWithFeature / intencive.countRememberedWords * 100;
                        }
                        td.textContent = rememberedWordsWithFeature;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Среднее количество воспринятых слов, обладающих отличительным признаком, %';
                    tr.appendChild(td);
                    var td = tdElement.cloneNode();
                    var averageRememberedWordsWithFeature = 0;
                    if(scope.result.CommonCountRememberedWords) {
                        averageRememberedWordsWithFeature =  scope.result.AverageRememberedWordsWithFeature / scope.result.CommonCountRememberedWords * 100;
                    }
                    td.textContent = averageRememberedWordsWithFeature;
                    // td.setAttribute('colspan', 2);
                    tr.appendChild(td);
                    fragmentElement.appendChild(tr);

                    element[0].appendChild(fragmentElement);
                }

                if (scope.experimentType === 1) {
                    createResultGrid1();
                } else if (scope.experimentType === 2) {
                    createResultGrid2();
                } else if (scope.experimentType === 3) {
                    createResultGrid3();
                } else if (scope.experimentType === 4) {
                    createResultGrid3();
                } else if (scope.experimentType === 5) {
                    createResultGrid5();
                }
            }
        };
    }

    app.directive('resultGrid', [
        ResultGrid
    ]);

}(window, angular));




