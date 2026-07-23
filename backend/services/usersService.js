const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Get all users with filters
exports.getAllUsers = async (filters) => {
  let query = supabase
    .from('users')
    .select('id, name, email, role, is_verified, created_at')
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
  }

  if (filters.role) {
    query = query.eq('role', filters.role);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }

  return data;
};

// Update user role
exports.updateUserRole = async (id, role) => {
  const { data, error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', id)
    .select('id, name, email, role, is_verified, created_at')
    .single();

  if (error) {
    throw new Error(`Failed to update user role: ${error.message}`);
  }

  return data;
};

// Delete user
exports.deleteUser = async (id) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};
