
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://erbvgqhrhygxliocahns.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYnZncWhyaHlneGxpb2NhaG5zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTkyMzUyOCwiZXhwIjoyMDU1NDk5NTI4fQ.tcngGwv0fVyIa3trYraVSm6TVt52koHxQUeWG-yS0Fw";

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
