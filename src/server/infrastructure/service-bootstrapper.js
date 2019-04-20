"use strict";

exports.initialize = function (asyncEachSeries, _, logger) {

    String.prototype.padRight = function (length, char) {

        return this + Array(length - this.length + 1).join(char || " ");
    };

    String.prototype.padLeft = function (length, char) {

        return Array(length - this.length + 1).join(char || " ") + this;
    };

    String.prototype.replaceAll = function (search, replace) {

        if (!replace || this.length === 0) {

            return this;
        }

        return this.split(search).join(replace)
    };

    global._ = _;

    _.mixin({
        eachAsync: function () {

            return asyncEachSeries;
        },
        writeLog: function (category, content) {

            logger.writeLog(category, content);
        },
    });
};
