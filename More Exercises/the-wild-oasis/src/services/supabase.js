import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jjukroftltbqwjjhwjqw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqdWtyb2Z0bHRicXdqamh3anF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MTM4NzEsImV4cCI6MjA0NTA4OTg3MX0.pyYBOCaLfhnI6rfHl76YSXeCuXgASmSzzZcRkGHjg7c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
