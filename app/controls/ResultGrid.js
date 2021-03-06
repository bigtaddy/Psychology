(function (global, ng) {

    'use strict';

    /**
     * ResultGrid Directive for showing experiment results
     * @constructor
     */
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

                /**methods for creating result grids
                 * @experimentTypes {{1: *, 2: *, 3: *, 4: *, 5: *}}
                 */
                var resultGridCreationMethods = {
                    1: createResultGrid1,
                    2: createResultGridForWordsInGroups,
                    3: createResultGrid3,
                    4: createResultGrid3,
                    5: createResultGridForWordsInGroups
                };

                var colSpanValue = global.Words[scope.experimentType].length;
                var fragmentElement = document.createDocumentFragment();
                var trElement = document.createElement('tr');
                var tdElement = document.createElement('td');

                //равномерно распределенные на поверхности листа слова,
                // не связанные друг с другом по смыслу и не имеющие особых отличительных признаков
                function createResultGrid1() {
                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Номер набора слов';
                    tr.appendChild(td);
                    scope.result.IncentivesResults.forEach(function (intencive, index) {
                        var td = tdElement.cloneNode();
                        td.textContent = index + 1;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Количество воспринятых слов';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (intencive) {
                        var td = tdElement.cloneNode();
                        td.textContent = intencive.countRememberedWords;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Среднее количество воспринятых слов';
                    tr.appendChild(td);
                    td = tdElement.cloneNode();
                    td.textContent = scope.result.AverageRememberedWords;
                    td.setAttribute('colspan', colSpanValue);
                    tr.appendChild(td);
                    fragmentElement.appendChild(tr);

                    element[0].appendChild(fragmentElement);
                }

                /**
                 * Опыт 2 -не связанные друг с другом по смыслу слова объединены в группы
                 */
                /**
                 *
                 * Опыт 5 - равномерно распределенные на поверхности листа слова,
                 * не связанные друг с другом по смыслу, объединены в группы и кроме того отдельные группы имеют больший размер шрифта
                 */

                function createResultGridForWordsInGroups() {
                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Номер набора слов';
                    tr.appendChild(td);
                    scope.result.IncentivesResults.forEach(function (intencive, index) {
                        var td = tdElement.cloneNode();
                        td.textContent = index + 1;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Количество воспринятых слов (nслов)';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (incentive) {
                        var td = tdElement.cloneNode();
                        td.textContent = incentive.countRememberedWords;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Количество групп, в которые входят воспринятые слова (nгр)';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (incentive) {
                        var td = tdElement.cloneNode();
                        td.textContent = incentive.countGroupsWithRememberedWords;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Относительное распределение слов по группам (nсл/nгр)';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (incentive) {
                        var td = tdElement.cloneNode();
                        td.textContent = incentive.relativeDistributionWordOnGroups;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Среднее относительное распределение слов по группам';
                    tr.appendChild(td);
                    td = tdElement.cloneNode();
                    td.textContent = scope.result.AverageRelativeDistributionWordOnGroups;
                    td.setAttribute('colspan', colSpanValue);
                    tr.appendChild(td);
                    fragmentElement.appendChild(tr);


                    if(scope.experimentType === 5) {
                        tr = trElement.cloneNode();
                        td = tdElement.cloneNode();
                        td.className = 'bold';
                        td.textContent = 'Количество групп со словами, имеющими отличительный признак (nгр. отл.)';
                        tr.appendChild(td);

                        scope.result.IncentivesResults.forEach(function (incentive) {
                            var td = tdElement.cloneNode();
                            td.textContent = incentive.countGroupsWithRememberedWordsWithFeatures;
                            tr.appendChild(td);
                        });
                        fragmentElement.appendChild(tr);

                        tr = trElement.cloneNode();
                        td = tdElement.cloneNode();
                        td.className = 'bold';
                        td.textContent = 'Среднее количество групп со словами, имеющими отличительный признак';
                        tr.appendChild(td);

                        td = tdElement.cloneNode();
                        td.textContent = scope.result.AverageCountGroupsWithRememberedWordsWithFeatures;
                        td.setAttribute('colspan', colSpanValue);
                        tr.appendChild(td);
                        fragmentElement.appendChild(tr);
                    }

                    element[0].appendChild(fragmentElement);
                }



                /**
                 * отличительный признак размер шрифта или жирность шрифта
                 */
                function createResultGrid3() {
                    var tr = trElement.cloneNode();
                    var td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Номер набора слов';
                    tr.appendChild(td);
                    scope.result.IncentivesResults.forEach(function (intencive, index) {
                        var td = tdElement.cloneNode();
                        td.textContent = index + 1;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Количество воспринятых слов';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (intencive) {
                        var td = tdElement.cloneNode();
                        td.textContent = intencive.countRememberedWords;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Из них, обладающих отличительным признаком,%';
                    tr.appendChild(td);

                    scope.result.IncentivesResults.forEach(function (intencive) {
                        var td = tdElement.cloneNode();
                        var rememberedWordsWithFeature = 0;
                        if(intencive.countRememberedWords) {
                            rememberedWordsWithFeature =  (intencive.countRememberedWordsWithFeature / intencive.countRememberedWords * 100).toFixed();
                        }
                        td.textContent = rememberedWordsWithFeature;
                        tr.appendChild(td);
                    });
                    fragmentElement.appendChild(tr);

                    tr = trElement.cloneNode();
                    td = tdElement.cloneNode();
                    td.className = 'bold';
                    td.textContent = 'Среднее количество воспринятых слов, обладающих отличительным признаком, %';
                    tr.appendChild(td);
                    td = tdElement.cloneNode();

                    var averageCountRememberedWordsWithFeature = 0;
                    if(scope.result.CommonCountRememberedWords) {
                        averageCountRememberedWordsWithFeature =  (scope.result.CommonCountRememberedWordsWithFeature / scope.result.CommonCountRememberedWords * 100).toFixed();
                    }
                    td.textContent = averageCountRememberedWordsWithFeature;
                    td.setAttribute('colspan', colSpanValue);
                    tr.appendChild(td);
                    fragmentElement.appendChild(tr);

                    element[0].appendChild(fragmentElement);
                }
                
                resultGridCreationMethods[scope.experimentType]();

          
            }
        };
    }

    app.directive('resultGrid', [
        ResultGrid
    ]);

}(window, angular));




