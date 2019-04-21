"use strict";

angular.module("app")
    .factory("$serverAPI", function ($http, $q) {

        let send = function (action) {

            let deferred = $q.defer();

            let xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function (response) {

                try {

                    deferred.resolve(JSON.parse(response.currentTarget.response));

                } catch (error) {

                    deferred.reject("An error occurred during connecting to server. Please check your internet connection and try again.");
                }

            }, false);

            xhr.addEventListener("error", function () {

                deferred.reject("An error occurred during connecting to server. Please check your internet connection and try again.");
            }, false);

            xhr.addEventListener("abort", function () {

                deferred.reject("Operation cancelled during connecting to server");
            }, false);

            xhr.open("GET", "http://127.0.0.1:8595/" + action);

            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhr.send();

            return deferred.promise;
        };

        return {
            getMinorFactionList: function () {

                return send("minorFactions");
            },
            getPopulatedSystemList: function () {

                return send("populatedSystems");
            }
        }
    });
