// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://erbvgqhrhygxliocahns.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYnZncWhyaHlneGxpb2NhaG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MjM1MjgsImV4cCI6MjA1NTQ5OTUyOH0.01H0eYYL4YPoxVtI8t_N5F6n_2cWJVroJ0BdxaupeU8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);