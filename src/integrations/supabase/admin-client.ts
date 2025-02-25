
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://erbvgqhrhygxliocahns.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYnZncWhyaHlneGxpb2NhaG5zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDcyMDMyOCwiZXhwIjoyMDE2Mjk2MzI4fQ.YxBX2XTWK-aX7glj2rjdz96Hm9oaZz2AnrZN4liJ0Gc";

export const supabaseAdmin = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
