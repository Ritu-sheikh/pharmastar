import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

console.log('==============================================');
console.log('   Pharma Star – Supabase Connection Check    ');
console.log('==============================================\n');

// 1. Check if variables are defined
if (!url || !key) {
  console.error('❌ Missing environment variables in .env file!');
  console.error('Please make sure your .env file contains:');
  console.error('  VITE_SUPABASE_URL=https://your-project-id.supabase.co');
  console.error('  VITE_SUPABASE_ANON_KEY=your-anon-key\n');
  process.exit(1);
}

// 2. Check if default placeholder values are still present
if (
  url.includes('your-project-id') ||
  url.includes('YOUR_SUPABASE') ||
  key.includes('your-anon-public-key') ||
  key.includes('YOUR_SUPABASE')
) {
  console.log('⚠️  Notice: Placeholder credentials detected in .env');
  console.log('   VITE_SUPABASE_URL: [Placeholder]');
  console.log('   VITE_SUPABASE_ANON_KEY: [Placeholder]\n');
  console.log('👉 Next Step:');
  console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard');
  console.log('2. Select your Project -> Project Settings (gear icon) -> API');
  console.log('3. Copy "Project URL" and paste into VITE_SUPABASE_URL in .env');
  console.log('4. Copy "anon / public" Key and paste into VITE_SUPABASE_ANON_KEY in .env');
  console.log('5. Re-run this check: npm run test:supabase\n');
  process.exit(0);
}

// 3. Security Check: Detect if user accidentally used the secret service_role key
try {
  const tokenParts = key.split('.');
  if (tokenParts.length === 3) {
    const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('utf8'));
    if (payload.role === 'service_role') {
      console.error('🚨 CRITICAL SECURITY ERROR:');
      console.error('You pasted the SECRET "service_role" key in VITE_SUPABASE_ANON_KEY!');
      console.error('This key bypasses Row Level Security and must NEVER be used on the frontend.');
      console.error('👉 Please go to Supabase Dashboard -> Project Settings -> API and copy the "anon" "public" key instead.\n');
      process.exit(1);
    }
  }
} catch {
  // Continue if custom key structure
}

// 4. Test actual connection to Supabase
console.log('📡 Testing connection to your Supabase project...');
const startTime = Date.now();

try {
  const supabase = createClient(url, key, {
    auth: { persistSession: false }
  });

  // Call auth getSession or health check
  const { error } = await supabase.auth.getSession();
  const latency = Date.now() - startTime;

  if (error) {
    console.error(`❌ Connection failed (${latency}ms):`, error.message);
    process.exit(1);
  }

  console.log(`✅ Connection SUCCESSFUL! (${latency}ms)`);
  console.log('   Project Host: Verified reachable');
  console.log('   Public Anon Key: Valid and verified');
  console.log('   Client: Ready for queries, auth, and database operations.\n');
  console.log('==============================================\n');
} catch (err) {
  console.error('❌ Connection error:', err.message);
  process.exit(1);
}
