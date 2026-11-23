import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate if real credentials have been provided in .env
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseUrl.includes('YOUR_SUPABASE') &&
  !supabaseAnonKey.includes('your-anon-public-key') &&
  !supabaseAnonKey.includes('YOUR_SUPABASE')
);

// Security check: Guard against accidental usage of secret service_role key
if (supabaseAnonKey) {
  try {
    const tokenParts = supabaseAnonKey.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      if (payload.role === 'service_role') {
        console.error(
          'CRITICAL SECURITY WARNING: A secret service_role key was detected in VITE_SUPABASE_ANON_KEY! ' +
          'Never expose the service_role key in frontend client applications. ' +
          'Replace it immediately with the public "anon" key from Supabase Dashboard -> Project Settings -> API.'
        );
      }
    }
  } catch {
    // Ignore parsing issues for non-standard key formats
  }
}

// Create and export the Supabase client
// If not yet configured, creates a safe dummy client to avoid runtime crashes before .env is filled
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(
      'https://placeholder-project.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder'
    );

// Connection test helper function
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured) {
    return {
      connected: false,
      message: 'Supabase credentials are not configured yet in .env file.'
    };
  }

  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return {
        connected: false,
        message: `Connection error: ${error.message}`
      };
    }
    return {
      connected: true,
      message: 'Successfully connected to Supabase!',
      session: data?.session || null
    };
  } catch (err) {
    return {
      connected: false,
      message: `Failed to connect: ${err.message}`
    };
  }
}

export default supabase;
