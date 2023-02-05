import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.REACT_APP_SUPABASE_ANON;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase