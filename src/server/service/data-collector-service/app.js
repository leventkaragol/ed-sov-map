"use strict";

global.config = require("simpler-config").load(require("./config.json"));

let pg = require("pg"),
    request = require("request"),
    md5 = require("md5");

let Persister = require("../../infrastructure/persister"),
    EddbAdapter = require("../../infrastructure/eddb-adapter"),
    Logger = require("../../infrastructure/logger"),
    serviceBootstrapper = require("../../infrastructure/service-bootstrapper"),
    MinorFactionRepository = require("../../domain/minor-faction/minor-faction-repository"),
    MinorFactionService = require("../../domain/minor-faction/minor-faction-service"),
    PopulatedSystemRepository = require("../../domain/populated-system/populated-system-repository"),
    PopulatedSystemService = require("../../domain/populated-system/populated-system-service");

serviceBootstrapper.initialize(require("async-each-series"), require("underscore"), new Logger(pg, Persister));

setInterval(function () {

    let now = new Date().getHours().toString().padLeft(2, "0") + ":" + new Date().getMinutes().toString().padLeft(2, "0");

    // Work ones per day for each syncTimes in config
    if (global.config.syncTimes.indexOf(now) !== -1) {

        let persister = new Persister(pg, global.config.connectionString),
            eddbAdapter = new EddbAdapter(request),
            minorFactionRepository = new MinorFactionRepository(persister, eddbAdapter),
            minorFactionService = new MinorFactionService(minorFactionRepository, md5),
            populatedSystemRepository = new PopulatedSystemRepository(persister, eddbAdapter),
            populatedSystemService = new PopulatedSystemService(populatedSystemRepository);

        persister.connect()
            .then(function () {

                return persister.query("BEGIN TRANSACTION");
            })
            .then(function () {

                return populatedSystemService.importPopulatedSystemList();
            })
            .then(function (populatedSystemList) {

                return minorFactionService.importMinorFactionList(populatedSystemList);
            })
            .then(function () {

                return persister.query("COMMIT");
            })
            .then(function () {

                persister.closeConnection();
            })
            .catch(function (error) {

                console.log(error.stack); // Development purpose only

                _.writeLog("data-collector-service", error.stack);
            });
    }

}, 55 * 1000); // 55 seconds