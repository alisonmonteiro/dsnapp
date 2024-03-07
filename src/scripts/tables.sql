create table
  public.notes (
    id bigint generated by default as identity,
    title text not null,
    text text not null,
    status boolean null,
    uuid uuid not null default gen_random_uuid (),
    user_id uuid not null,
    updated_at timestamp with time zone null default now(),
    created_at timestamp with time zone not null default now(),
    constraint notes_pkey primary key (id),
    constraint public_notes_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;