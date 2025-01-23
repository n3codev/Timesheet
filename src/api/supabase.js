import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rtdtpyryimnxklpfptog.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0ZHRweXJ5aW1ueGtscGZwdG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MzIzNzcsImV4cCI6MjA1MzEwODM3N30.Y8VVCwAKEKUi0DKnbbZPZ9Jrt3Tzrh1z_R_vuLjFNvs";
export const supabase = createClient(supabaseUrl, supabaseKey);
