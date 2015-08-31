
(function (global) {
    'use strict';


    Array.prototype.split = function(splitSize) {
        var array = this;
        return [].concat.apply([],
            array.map(function (elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + splitSize)];
            })
        );
    };

}(window));




