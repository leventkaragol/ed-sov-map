CREATE TABLE public.populated_system
(
   id integer NOT NULL,
   edsm_id integer,
   name text,
   x numeric,
   y numeric,
   z numeric,
   population bigint,
   government_id integer,
   government text,
   allegiance_id integer,
   allegiance text,
   states jsonb,
   security_id integer,
   security text,
   primary_economy_id integer,
   primary_economy text,
   power text,
   power_state_id integer,
   power_state text,
   needs_permit boolean,
   simbad_ref text,
   controlling_minor_faction_id integer,
   controlling_minor_faction text,
   reserve_type_id integer,
   reserve_type text,
   minor_faction_presences jsonb,

   CONSTRAINT pk_populated_system PRIMARY KEY (id)
)
WITH (
  OIDS = FALSE
);

CREATE INDEX ix_populated_system_states ON public.populated_system USING gin(states);
CREATE INDEX ix_populated_system_minor_faction_presences ON public.populated_system USING gin(minor_faction_presences);