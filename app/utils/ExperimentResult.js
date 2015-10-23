(function (global, ng) {

    'use strict';

    function ExperimentResults(data, experimentType) {
        this.IncentivesResults = [];  //IncentivesResult = {countPerceivedWords:0}

        //����� ���������� ����������� ����
        this.CommonCountRememberedWords = 0;

        //������� ���������� ����������� ����
        this.AverageRememberedWords = 0;

        if (experimentType === 3 || experimentType === 4 || experimentType === 5) {
            //������� ���������� ����������� ����, ���������� ������������� ���������
            this.CommonCountRememberedWordsWithFeature = 0;
        }

        if (experimentType === 2 || experimentType === 5) {
            //������� ���������� ����������� ����, ���������� ������������� ���������
            this.AverageRelativeDistributionWordOnGroups = 0;
        }

        if(experimentType === 5) {
            this.AverageCountGroupsWithRememberedWordsWithFeatures = 0;
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
                    //���������� ����������� ����
                    countRememberedWords: 0,
                    //���������� ����������� ����, ���������� ������������� ���������
                    countRememberedWordsWithFeature: 0
                };

                if (experimentType === 2 || experimentType === 5) {
                    //���������� �����, � ������� ������ ����������� ����� (n��)
                    incentiveResult.countGroupsWithRememberedWords = 0;
                    var groupNumbersWithRememberedWords = [];
                    var groupNumberWithRememberedWords = 0;
                }

                if(experimentType === 5) {
                    incentiveResult.countGroupsWithRememberedWordsWithFeatures = 0;
                    var groupNumbersWithRememberedWordsWithFeatures = [];
                    var groupNumberWithRememberedWordsWithFeatures = 0;
                }


                for (var j = 0; j < incentivesData[i].rememberedWords.length; j++) {
                    //remove duplicates
                    incentivesData[i].rememberedWords = incentivesData[i].rememberedWords.filter(function (word, position, array) {
                        return array.indexOf(word) === position;
                    });

                    if (checkContainValueInArray(incentivesData[i].incentive, incentivesData[i].rememberedWords[j])) {
                        ++incentiveResult.countRememberedWords;

                        if (experimentType === 2 || experimentType === 5) {

                            //���������� �����, � ������� ������ ����������� ����� (n��)
                           var indexRememberedWord =  incentivesData[i].incentive.indexOf(incentivesData[i].rememberedWords[j]) + 1;
                            groupNumberWithRememberedWords = (Math.ceil(indexRememberedWord * global.Settings.ProbabilityWordFeature));
                            if(!~groupNumbersWithRememberedWords.indexOf(groupNumberWithRememberedWords)) {
                                groupNumbersWithRememberedWords.push(groupNumberWithRememberedWords);
                                ++incentiveResult.countGroupsWithRememberedWords;
                            }

                           // ���������� ����� �� �������, �������� ������������� �������
                            if(experimentType === 5) {
                                if(!!~incentivesData[i].indexesFeatures.indexOf(incentivesData[i].incentive.indexOf(incentivesData[i].rememberedWords[j]))) {
                                    var indexRememberedWordWithFeature = incentivesData[i].incentive.indexOf(incentivesData[i].rememberedWords[j]) + 1;
                                    groupNumberWithRememberedWordsWithFeatures = (Math.ceil(indexRememberedWordWithFeature * global.Settings.ProbabilityWordFeature));
                                    if(!~groupNumbersWithRememberedWordsWithFeatures.indexOf(groupNumberWithRememberedWordsWithFeatures)) {
                                        groupNumbersWithRememberedWordsWithFeatures.push(groupNumberWithRememberedWordsWithFeatures);
                                        ++incentiveResult.countGroupsWithRememberedWordsWithFeatures;
                                    }
                                }
                            }

                        }

                        if (experimentType === 3 || experimentType === 4) {
                            if(!!~incentivesData[i].indexesFeatures.indexOf(incentivesData[i].incentive.indexOf(incentivesData[i].rememberedWords[j])))
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

                if (experimentType === 2 || experimentType === 5) {
                    incentive.relativeDistributionWordOnGroups = incentive.countRememberedWords/incentive.countGroupsWithRememberedWords;
                    _this.AverageRelativeDistributionWordOnGroups += incentive.relativeDistributionWordOnGroups;
                }

                if(experimentType === 5) {
                    _this.AverageCountGroupsWithRememberedWordsWithFeatures += incentive.countGroupsWithRememberedWordsWithFeatures;
                }
            });

            if (experimentType === 2 || experimentType === 5) {
                _this.AverageRelativeDistributionWordOnGroups = _this.AverageRelativeDistributionWordOnGroups/ _this.IncentivesResults.length;
            }
            if(experimentType === 5) {
                _this.AverageCountGroupsWithRememberedWordsWithFeatures = _this.AverageCountGroupsWithRememberedWordsWithFeatures / _this.IncentivesResults.length;
            }

            _this.AverageRememberedWords = _this.CommonCountRememberedWords / _this.IncentivesResults.length;

        }


    }

    global.ExperimentResults = ExperimentResults;

}(window, angular));



