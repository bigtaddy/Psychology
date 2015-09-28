(function (global, ng) {

    'use strict';

    function ExperimentResults (data, experimentType) {
        this.IncentivesResults = [];  //IncentivesResult = {countPerceivedWords:0}
        this.AverageRememberedRightWords =  0;

        var _this = this;

        //indexesWithFeatures

        handleResults(data);

        function checkContainValueInArray(array, value) {
            var result = false;
            if (!!~array.indexOf(value)) {
                result = true;
            }
            return result;
        }

        function handleResults(incentivesData) {
            //handle count of right remembered words
            var commonCountRememberedWords = 0;

            for (var i = 0; i < incentivesData.length; i++) {
                var incentiveResult = {countRememberedWords: 0 };

                for (var j = 0; j < incentivesData[i].rememberedWords.length; j++) {
                    //remove duplicates
                    incentivesData[i].rememberedWords = incentivesData[i].rememberedWords.filter(function(word, position, array){
                        return  array.indexOf(word) === position;
                    });

                    if (checkContainValueInArray(incentivesData[i].incentive, incentivesData[i].rememberedWords[j])) {
                        ++incentiveResult.countRememberedWords;
                    }
                }

                _this.IncentivesResults.push(incentiveResult);
            }

            _this.IncentivesResults.forEach(function(incentive){
                commonCountRememberedWords += incentive.countRememberedWords;
            });

            _this.AverageRememberedRightWords = commonCountRememberedWords / _this.IncentivesResults.length;
        }


    }

    global.ExperimentResults = ExperimentResults;

}(window, angular));




