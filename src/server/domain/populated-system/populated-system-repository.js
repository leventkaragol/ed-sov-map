"use strict";

module.exports = class PopulatedSystemRepository {

    constructor(persister, eddbAdapter) {

        this._persister = persister;
        this._eddbAdapter = eddbAdapter;
    }

    download() {

        return this._eddbAdapter.getPopulatedSystemList();
    }

    clear() {

        return this._persister.query("DELETE FROM public.populated_system");
    }

    add(populatedSystem) {

        return this._persister.query(
            "INSERT INTO public.populated_system(" +
            " id, " +
            "edsm_id, " +
            "\"name\"," +
            " x," +
            " y," +
            " z," +
            " population," +
            " government_id," +
            " government," +
            " allegiance_id," +
            " allegiance," +
            " states," +
            " security_id," +
            " \"security\"," +
            " primary_economy_id," +
            " primary_economy," +
            " power," +
            " power_state_id," +
            " power_state," +
            " needs_permit," +
            " simbad_ref," +
            " controlling_minor_faction_id," +
            " controlling_minor_faction," +
            " reserve_type_id," +
            " reserve_type," +
            " minor_faction_presences)" +
            " VALUES(" +
            " $1, " +
            " $2, " +
            " $3, " +
            " $4, " +
            " $5, " +
            " $6, " +
            " $7, " +
            " $8, " +
            " $9, " +
            " $10, " +
            " $11, " +
            " $12, " +
            " $13, " +
            " $14, " +
            " $15, " +
            " $16, " +
            " $17, " +
            " $18, " +
            " $19, " +
            " $20, " +
            " $21, " +
            " $22, " +
            " $23, " +
            " $24, " +
            " $25, " +
            " $26)",
            [
                populatedSystem.id,
                populatedSystem.edsm_id,
                populatedSystem.name,
                populatedSystem.x,
                populatedSystem.y,
                populatedSystem.z,
                populatedSystem.population,
                populatedSystem.government_id,
                populatedSystem.government,
                populatedSystem.allegiance_id,
                populatedSystem.allegiance,
                JSON.stringify(populatedSystem.states),
                populatedSystem.security_id,
                populatedSystem.security,
                populatedSystem.primary_economy_id,
                populatedSystem.primary_economy,
                populatedSystem.power,
                populatedSystem.power_state_id,
                populatedSystem.power_state,
                populatedSystem.needs_permit,
                populatedSystem.simbad_ref,
                populatedSystem.controlling_minor_faction_id,
                populatedSystem.controlling_minor_faction,
                populatedSystem.reserve_type_id,
                populatedSystem.reserve_type,
                JSON.stringify(populatedSystem.minor_faction_presences)
            ]);
    }

    getList() {

        let that = this;

        return new Promise(function (resolve, reject) {

            that._persister.query("SELECT " +
                " populated_system.\"name\", " +
                " populated_system.x, " +
                " populated_system.y, " +
                " populated_system.z, " +
                " populated_system.controlling_minor_faction_id as controller_id, " +
                " populated_system.controlling_minor_faction as controller " +
                " FROM public.populated_system" +
                " LEFT JOIN public.minor_faction ON populated_system.controlling_minor_faction_id = minor_faction.id" +
                " WHERE minor_faction.is_player_faction = 't'")
                .then(function (result) {

                    resolve(result.rows);
                })
                .catch(function (error) {

                    reject(error);
                })
        });
    }
};