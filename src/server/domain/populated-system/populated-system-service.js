"use strict";

module.exports = class PopulatedSystemService {

    constructor(repository) {

        this._repository = repository;
    }

    importPopulatedSystemList() {

        let that = this,
            populatedSystemList;

        return new Promise(function (resolve, reject) {

            that._repository.download()
                .then(function (response) {

                    populatedSystemList = response;

                    return that._repository.clear();
                })
                .then(function () {

                    _.eachAsync()(populatedSystemList, function (populatedSystem, next) {

                            that._repository.add(populatedSystem)
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

                                resolve(populatedSystemList);
                            }
                        });
                })
                .catch(function (error) {

                    reject(error);
                });
        });
    }

    getPopulatedSystemList() {

        return this._repository.getList();
    }
};