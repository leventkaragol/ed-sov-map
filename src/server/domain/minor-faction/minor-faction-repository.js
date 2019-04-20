"use strict";

module.exports = class MinorFactionRepository {

    constructor(persister, eddbAdapter) {

        this._persister = persister;
        this._eddbAdapter = eddbAdapter;
    }

    download() {

        return this._eddbAdapter.getMinorFactionList();
    }

    clear() {

        return this._persister.query("DELETE FROM public.minor_faction");
    }

    add(minorFaction) {

        return this._persister.query(
            "INSERT INTO public.minor_faction(" +
            " id, " +
            " \"name\", " +
            " government_id, " +
            " government, " +
            " allegiance_id, " +
            " allegiance, " +
            " home_system_id, " +
            " is_player_faction," +
            " color," +
            " controlling_system_count," +
            " presence_system_count," +
            " focus_coords)" +
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
            " $12)",
            [
                minorFaction.id,
                minorFaction.name,
                minorFaction.government_id,
                minorFaction.government,
                minorFaction.allegiance_id,
                minorFaction.allegiance,
                minorFaction.home_system_id,
                minorFaction.is_player_faction,
                minorFaction.color,
                minorFaction.controlling_system_count,
                minorFaction.presence_system_count,
                minorFaction.focus_coords
            ]);
    }
};