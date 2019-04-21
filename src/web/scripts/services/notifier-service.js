"use strict";

angular.module("app")
    .factory("notifierService", function () {

        return {
            showInfo: function (title, text) {

                PNotify.prototype.options.styling = "bootstrap3";

                PNotify.prototype.options.delay = 2000;

                new PNotify({
                    title: title,
                    text: text,
                    type: 'info',
                    icon: "fa fa-info"
                });
            },

            showSuccess: function (title, text) {

                PNotify.prototype.options.styling = "bootstrap3";

                PNotify.prototype.options.delay = 2000;

                new PNotify({
                    title: title,
                    text: text,
                    type: 'success',
                    icon: "fa fa-check"
                });
            },

            showWarning: function (title, text) {

                PNotify.prototype.options.styling = "bootstrap3";

                PNotify.prototype.options.delay = 5000;

                new PNotify({
                    title: title,
                    text: text,
                    type: 'error',
                    icon: "fa fa-warning"
                });
            },

            showError: function (errorDescription) {

                PNotify.prototype.options.styling = "bootstrap3";

                PNotify.prototype.options.delay = 5000;

                new PNotify({
                    title: "Error",
                    text: errorDescription,
                    type: 'error',
                    icon: "fa fa-warning"
                });
            }
        };
    });