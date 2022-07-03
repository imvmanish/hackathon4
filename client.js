import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://okrvlyhibhdpzmuxqwuj.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcnZseWhpYmhkcHptdXhxd3VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY3NzEwNDQsImV4cCI6MTk3MjM0NzA0NH0.avnOEdZ2l42Pl1Fh0YZZkpHbttUvhmXG4upGzSs4tKY")