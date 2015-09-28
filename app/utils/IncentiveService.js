(function (global, ng) {

    'use strict';

    function ExperimentService () {

        var _this = this;

        this.experimentType = 5;

        function rand (min, max) {
            return Math.random() * (max - min) + min;
        }

        function getRandomItem (list, weight) {
            var total_weight = weight.reduce(function (prev, cur, i, arr) {
                return prev + cur;
            });

            var random_num = rand(0, total_weight);
            var weight_sum = 0;
            //console.log(random_num)

            for (var i = 0; i < list.length; i++) {
                weight_sum += weight[i];
                weight_sum = +weight_sum.toFixed(2);

                if (random_num <= weight_sum) {
                    return list[i];
                }
            }
        }

        this.getIndexesOfWordsWithFeatures = function (countOfWords) {
            var indexesFeatures = [];
           if(_this.experimentType === 3 || _this.experimentType === 4 || _this.experimentType === 5) {
               var list = [1, 0];
               var weight = [0.25, 0.75];
               var randomItem;

               for (var i = 0; i < countOfWords; i++) {
                   randomItem = getRandomItem(list, weight);
                   if(randomItem) {
                       indexesFeatures.push(i);
                   }
               }

           }

            return indexesFeatures;
        };

        this.saveExpeiment = function (experimentResult) {

            return id;
        };

        this.getExperiment1 = function (id) {

            return experimentResult;
        };

    }

    app.service('ExperimentService', [
        ExperimentService
    ]);

}(window, angular));




