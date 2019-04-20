"use strict";

module.exports = class Logger {

    constructor(pg, Persister) {

        this._Persister = Persister;
        this._pg = pg;
    }

    writeLog(category, content) {

        let persister = new this._Persister(this._pg, global.config.connectionString);

        persister.connect()
            .then(function () {

                return persister.query(
                    "INSERT INTO public.log(" +
                    " insert_datetime, " +
                    " category," +
                    " content) " +
                    " VALUES (" +
                    " $1, " +
                    " $2, " +
                    " $3);",
                    [
                        new Date(),
                        category,
                        content
                    ]);
            })
            .then(function () {

                persister.closeConnection()
            })
            .catch(function (error) {

                persister.closeConnection()
            });
    }
};
