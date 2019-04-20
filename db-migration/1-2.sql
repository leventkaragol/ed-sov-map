CREATE TABLE public.log
(
  id serial NOT NULL,
  insert_datetime timestamp with time zone NOT NULL,
  category text,
  content text NOT NULL,

  CONSTRAINT pk_public_log PRIMARY KEY (id)
)
WITH (
  OIDS = FALSE
);


CREATE TABLE public.minor_faction
(
   id integer NOT NULL,
   name text,
   government_id integer,
   government text,
   allegiance_id integer,
   allegiance text,
   home_system_id integer,
   is_player_faction boolean,

   CONSTRAINT pk_minor_faction PRIMARY KEY (id)
)
WITH (
  OIDS = FALSE
);