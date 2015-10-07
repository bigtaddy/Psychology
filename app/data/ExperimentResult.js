(function (global, ng) {

    'use strict';

    function ExperimentResults(data, experimentType) {
        this.IncentivesResults = [];  //IncentivesResult = {countPerceivedWords:0}
        this.CommonCountRememberedWords = 0;
        this.AverageRememberedWords = 0;
        if (experimentType === 3 || experimentType === 4) {
            this.AverageRememberedWordsWithFeature = 0;
            this.CommonCountRememberedWordsWithFeature = 0;
        }
        
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

            for (var i = 0; i < incentivesData.length; i++) {
                var incentiveResult = {
                    countRememberedWords: 0,
                    countRememberedWordsWithFeature: 0
                };

                for (var j = 0; j < incentivesData[i].rememberedWords.length; j++) {
                    //remove duplicates
                    incentivesData[i].rememberedWords = incentivesData[i].rememberedWords.filter(function (word, position, array) {
                        return array.indexOf(word) === position;
                    });

                    if (checkContainValueInArray(incentivesData[i].incentive, incentivesData[i].rememberedWords[j])) {
                        ++incentiveResult.countRememberedWords;

                        if (experimentType === 3 || experimentType === 4) {
                            ++incentiveResult.countRememberedWordsWithFeature;
                        }

                    }

                }

                _this.IncentivesResults.push(incentiveResult);
            }

            _this.IncentivesResults.forEach(function (incentive) {
                _this.CommonCountRememberedWords += incentive.countRememberedWords;

                if (experimentType === 3 || experimentType === 4) {
                    _this.CommonCountRememberedWordsWithFeature += incentive.countRememberedWordsWithFeature;
                }
            });

            _this.AverageRememberedWords = _this.CommonCountRememberedWords / _this.IncentivesResults.length;

            if (experimentType === 3 || experimentType === 4) {
                _this.AverageRememberedWordsWithFeature = _this.CommonCountRememberedWordsWithFeature / _this.IncentivesResults.length;
            }
        }


    }

    global.ExperimentResults = ExperimentResults;

}(window, angular));




