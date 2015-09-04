(function (global, ng) {

    'use strict';

    function ExperimentResult (data, type) {

        this.IncentivesResults = [];
        this.AveragePerceivedRightWords =  0;

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

        function handleResults(incentiveItems) {
            var experimentResult = {
                incentives: [],
                averagePerceivedRightWords: 0
            };
            //handle count of right remembered words
            for (var i = 0; i < incentiveItems.length; i++) {
                var incentiveResult = {countPerceivedWords: 0 };

                for (var j = 0; j < incentiveItems[i].perceivedWords.length; j++) {
                    //remove duplicates
                    incentiveItems[i].perceivedWords = incentiveItems[i].perceivedWords.filter(function(word, position, array){
                        return  array.indexOf(word) === position;
                    });

                    if (checkContainValueIn2dArray(incentiveItems[i].incentives[i], incentiveItems[i].perceivedWords[j])) {
                        ++incentiveResult.countPerceivedWords;
                    }
                }
                experimentResult.incentives.push(incentiveResult);
            }

            experimentResult.incentives.forEach(function(incentive){
                experimentResult.averagePerceivedRightWords += incentive.countPerceivedWords;
            });

            experimentResult.averagePerceivedRightWords = experimentResult.averagePerceivedRightWords / experimentResult.incentives.length;

            return experimentResult;
        }


    }

}(window, angular));




