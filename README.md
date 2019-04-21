# ed-sov-map
Elite Dangerous Sovereignty Map

Well, I couldn't find time to make a build script yet so explaining things to do to run application step by step.

Summarly, there are two deamon service which are written with nodejs, data-collector-service (to download eddb data to local database) and  http-server (to serve data over http api for the web client) and a web client which is written with angularjs.




1- ed-sov-map need a postgresql db. First create a role with the following command.

```
CREATE ROLE ed_sov_map_user LOGIN PASSWORD 'ed_sov_map_password' SUPERUSER REPLICATION VALID UNTIL 'infinity';
```

Then create a db with the following command.

```
CREATE DATABASE ed_sov_map WITH ENCODING='UTF8' OWNER=ed_sov_map_user CONNECTION LIMIT=-1;
```

Finally execute sql scripts in db-migration folder one by one like 1-2.sql then 2-3.sql then 3-4.sql etc.

2- eddb data must be imported via data-collector-service so run it with the following command (Before that you may need to change "syncTimes" in src\server\service\data-collector-service\config.json)

```
node src\server\service\data-collector-service\app.js
```

PS: It may takes 30 minutes and can't see anything before the end beacuse of trasaction so run it and go to take care of your family, come back later after 1 hour.

3- http-service must be run before web-client so run it with the following command.

```
node src\server\service\data-collector-service\app.js
```

If everything ok atm, following url must return minor faction list with JSON format.

```
http://127.0.0.1:8595/minorFactions
```

4- open src\web\index.html (Because it makes ajax call, you may need to open it on a local web server)