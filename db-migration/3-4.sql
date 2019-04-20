ALTER TABLE public.minor_faction ADD color text;
ALTER TABLE public.minor_faction ADD controlling_system_count int4;
ALTER TABLE public.minor_faction ADD presence_system_count int4;
ALTER TABLE public.minor_faction ADD focus_coords jsonb;

UPDATE public.minor_faction SET color = '#ffffff', controlling_system_count = 0, presence_system_count = 0 ;

ALTER TABLE public.minor_faction ALTER COLUMN color SET NOT NULL;
ALTER TABLE public.minor_faction ALTER COLUMN controlling_system_count SET NOT NULL;
ALTER TABLE public.minor_faction ALTER COLUMN presence_system_count SET NOT NULL;
