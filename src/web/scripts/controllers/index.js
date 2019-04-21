"use strict";

angular.module("app")
    .controller("indexController",
        function ($scope, $rootScope, $serverAPI, notifierService, blockerService) {

            $scope.init = function () {

                blockerService.block();

                $serverAPI.getMinorFactionList()
                    .then(function (minorFactionList) {

                        $scope.minorFactionList = _.sortBy(minorFactionList, function (minorFaction) {

                            return -1 * minorFaction.controlling_system_count;
                        });

                        return $serverAPI.getPopulatedSystemList();
                    })
                    .then(function (populatedSystemList) {

                        $scope.populatedSystemList = populatedSystemList;

                        let mapData = $scope.buildMapData();

                        Ed3d.init({
                            container: "mapContainer",
                            json: mapData,
                            withHudPanel: false,
                            effectScaleSystem: [128, 1500]
                        });

                        blockerService.unblock();
                    })
                    .catch(function (error) {

                        blockerService.unblock();

                        notifierService.showError(error);
                    });
            };

            $scope.buildMapData = function () {

                let mapData = {
                    categories: {
                        factions: {}
                    },
                    systems: []
                };

                _.each($scope.minorFactionList, function (minorFaction) {

                    mapData.categories.factions[minorFaction.id] = {name: minorFaction.name, color: minorFaction.color.substr(1)};
                });

                _.each($scope.populatedSystemList, function (populatedSystem) {

                    mapData.systems.push({
                        name: populatedSystem.name,
                        coords: {x: populatedSystem.x, y: populatedSystem.y, z: populatedSystem.z},
                        cat: [populatedSystem.controller_id],
                        infos: ""
                    });
                });

                return mapData;

            };
        });