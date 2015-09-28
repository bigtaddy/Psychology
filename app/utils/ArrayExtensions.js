
(function (global) {
    'use strict';


    Array.prototype.split = function(splitSize) {
        var array = this;
        return [].concat.apply([],
            array.map(function (elem, i) {
                return i % splitSize ? [] : [array.slice(i, i + splitSize)];
            })
        );
    };

}(window));




