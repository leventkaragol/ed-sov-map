"use strict";

module.exports = class EddbAdapter {

    constructor(request) {

        this._request = request;
    }

    getMinorFactionList() {

        return this._post("https://eddb.io/archive/v6/factions.json");
    }

    getPopulatedSystemList() {

        return this._post("https://eddb.io/archive/v6/systems_populated.json");
    }

    getStationList() {

        return this._post("https://eddb.io/archive/v6/stations.json");
    }

    getCommodityList() {

        return this._post("https://eddb.io/archive/v6/commodities.json");
    }

    getModuleList() {

        return this._post("https://eddb.io/archive/v6/modules.json");
    }

    _post(url) {

        let that = this;

        return new Promise(function (resolve, reject) {

            that._request({
                method: "GET",
                url: url,
                headers: {
                    "Content-Type": "text/xml",
                    "charset": "utf-8"
                },
                strictSSL: false,
                timeout: 120000
            }, function (error, response, body) {

                if (error) {

                    reject(error);

                } else {

                    resolve(JSON.parse(body));
                }
            });
        });
    }
};