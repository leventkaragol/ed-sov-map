"use strict";

module.exports = class MinorFactionService {

    constructor(repository, md5) {

        this._repository = repository;
        this._md5 = md5;
    }

    importMinorFactionList(populatedSystemList) {

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

                            minorFaction.color = that._generateColor(minorFaction);

                            minorFaction.controlling_system_count = that._calculateControllingSystemCount(populatedSystemList, minorFaction);

                            minorFaction.presence_system_count = that._calculatePresenceSystemCount(populatedSystemList, minorFaction);

                            minorFaction.focus_coords = that._findFocusCoords(populatedSystemList, minorFaction);

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

    getMinorFactionList() {

        return this._repository.getList();
    }

    _generateColor(minorFaction) {

        if (minorFaction.is_player_faction) {

            // Generates same color for same faction name
            // DB content is being cleared and regenerated from scratch every day
            // So same faction gets same color in this way
            return "#" + this._md5(minorFaction.name).substr(0, 6);

        } else {

            // NPC minor factions always return white
            return "#ffffff";
        }
    };

    _calculateControllingSystemCount(populatedSystemList, minorFaction) {

        return _.filter(populatedSystemList, function (populatedSystem) {

            return populatedSystem.controlling_minor_faction_id === minorFaction.id;

        }).length;
    }

    _calculatePresenceSystemCount(populatedSystemList, minorFaction) {

        return _.filter(populatedSystemList, function (populatedSystem) {

            return _.findWhere(populatedSystem.minor_faction_presences, {minor_faction_id: minorFaction.id}) !== undefined;

        }).length;
    }

    _findFocusCoords(populatedSystemList, minorFaction) {

        let firstControllingSystem = _.findWhere(populatedSystemList, {controlling_minor_faction_id: minorFaction.id});

        if (firstControllingSystem) {

            return {
                x: firstControllingSystem.x,
                y: firstControllingSystem.y,
                z: firstControllingSystem.z
            };

        } else {

            // Faction has no controlling system

            let firstPresencesSystem = _.find(populatedSystemList, function (populatedSystem) {

                return _.findWhere(populatedSystem.minor_faction_presences, {minor_faction_id: minorFaction.id}) !== undefined;
            });

            if (firstPresencesSystem) {

                return {
                    x: firstPresencesSystem.x,
                    y: firstPresencesSystem.y,
                    z: firstPresencesSystem.z
                };

            } else {

                // Faction has neither controlling nor presence system
                // Yes, they are exist

                return null;
            }
        }
    };
};