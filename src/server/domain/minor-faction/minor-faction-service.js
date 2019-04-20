"use strict";

module.exports = class MinorFactionService {

    constructor(repository) {

        this._repository = repository;
    }

    importMinorFactionList() {

        let that = this,
            minorFactionList;

        return new Promise(function (resolve, reject) {

            that._repository.download()
                .then(function (response) {

                    minorFactionList = response;

                    return that._repository.clear();
                })
                .then(function () {

                    _.eachAsync()(minorFactionList, function (minorFaction, next) {

                            that._repository.add(minorFaction)
                                .then(function () {

                                    next();
                                })
                                .catch(function (error) {

                                    reject(error);
                                });
                        },
                        function (error) {

                            if (error) {

                                reject(error);

                            } else {

                                resolve();
                            }
                        });
                })
                .catch(function (error) {

                    reject(error);
                });
        });
    }
};