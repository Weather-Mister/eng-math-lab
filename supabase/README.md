# Supabase backend

The GitHub Pages site continues to use the existing Supabase backend directly from the browser.

- Live table: `public.engineering_math_profiles`
- Load RPC: `load_engineering_math_profile_v4(text)`
- Save RPC: `save_engineering_math_profile_v4(text, jsonb, bigint)`
- Row-level security remains enabled.
- The frontend uses the existing Supabase publishable key. No service-role key or private database credential is committed.
- `engineering-math-schema.sql` is a schema/RPC backup only. It intentionally contains no user profile data.

The live Supabase project was left unchanged during the hosting migration so existing usernames, progress, notes, whiteboard state, and saved course state continue using the same backend.
