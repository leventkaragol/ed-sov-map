"use strict";

let cluster = require("cluster");

let args = process.argv.slice(2);

global.config = require("simpler-config").load(require("./config.json"));

if (cluster.isMaster && (args.length !== 0 && args[0] !== "debug")) {

    console.log("Master cluster setting up " + global.config.workerProcessCount + " workers...");

    for (let i = 0; i < global.config.workerProcessCount; i++) {

        cluster.fork();
    }

    cluster.on("online", function (worker) {

        console.log("Worker " + worker.process.pid + " is online");
    });

    cluster.on("exit", function (worker, code, signal) {

        console.log("Worker " + worker.process.pid + " died with code: " + code + ", and signal: " + signal);

        console.log("Starting a new worker");

        cluster.fork();
    });

} else {

    let express = require("express"),
        bodyParser = require("body-parser"),
        compress = require("compression"),
        pg = require("pg");

    let Logger = require("../../infrastructure/logger"),
        serviceBootstrapper = require("../../infrastructure/service-bootstrapper"),
        Persister = require("../../infrastructure/persister");

    serviceBootstrapper.initialize(require("async-each-series"), require("underscore"), new Logger(pg, Persister));

    let app = express();

    app.use(bodyParser.json({limit: "5mb"}));
    app.use(compress());
    app.enable("trust proxy");

    app.listen(global.config.port);

    app.all("*", function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-type");

        next();
    });

    app.get("/minorFactions", function (request, response) {

        let MinorFactionRepository = require("../../domain/minor-faction/minor-faction-repository"),
            MinorFactionService = require("../../domain/minor-faction/minor-faction-service");

        let persister = new Persister(pg, global.config.connectionString),
            minorFactionRepository = new MinorFactionRepository(persister, null),
            minorFactionService = new MinorFactionService(minorFactionRepository, null);

        persister.connect()
            .then(function () {

                return minorFactionService.getMinorFactionList();
            })
            .then(function (minorFactionList) {

                response.send(minorFactionList);

                persister.closeConnection();
            })
            .catch(function (error) {

                console.log(error.stack); // Development purpose only

                _.writeLog("get-minor-factions", error.stack);
            });
    });

    app.get("/populatedSystems", function (request, response) {

        let PopulatedSystemRepository = require("../../domain/populated-system/populated-system-repository"),
            PopulatedSystemService = require("../../domain/populated-system/populated-system-service");

        let persister = new Persister(pg, global.config.connectionString),
            populatedSystemRepository = new PopulatedSystemRepository(persister, null),
            populatedSystemService = new PopulatedSystemService(populatedSystemRepository);

        persister.connect()
            .then(function () {

                return populatedSystemService.getPopulatedSystemList();
            })
            .then(function (populatedSystemList) {

                response.send(populatedSystemList);

                persister.closeConnection();
            })
            .catch(function (error) {

                console.log(error.stack); // Development purpose only

                _.writeLog("get-populated-systems", error.stack);
            });
    });
}