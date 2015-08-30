(function (global, ng) {

    'use strict';

    function IncentiveService () {

        function checkContainValueIn2dArray(array, value) {
            var result = false;

            for (var i = 0, length = array.length; i < length; i++) {
                if (!!~array[i].indexOf(value)) {
                    result = true;
                    break;
                }
            }
            return result;
        }

        function handleResults(results, incentives) {
            //handle count of right remembered words
            for (var i = 0; i < results.length; i++) {
                for (var j = 0; j < results[i].rememberedWords.length; j++) {
                    //remove duplicates
                    results[i].rememberedWords = results[i].rememberedWords.filter(function(word, position, array){
                        return  array.indexOf(word) === position;
                    });

                    if (checkContainValueIn2dArray(incentives[i], results[i].rememberedWords[j])) {
                        ++results[i].countRightWords;
                    }
                }
            }
        }

        this.saveExpeiment1 = function (results, incentives) {

            return id;
        };

        this.getExperiment1 = function (id) {

        };

        this.handleResults = handleResults;
    }

    app.service('IncentiveService', [
        IncentiveService
    ]);

}(window, angular));




