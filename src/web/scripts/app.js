angular.module("app", ["ngRoute", "ngSanitize", "ui.bootstrap"]);

angular.module("app").config(function () {

    String.prototype.padRight = function (length, char) {

        return this + Array(length - this.length + 1).join(char || " ");
    };

    String.prototype.padLeft = function (length, char) {

        return Array(length - this.length + 1).join(char || " ") + this;
    };
});

angular.module("app").run(function ($rootScope) {

    $rootScope.dto = {};
});
