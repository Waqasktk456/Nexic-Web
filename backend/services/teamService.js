const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Upload image to Supabase Storage
const uploadImage = async (file, folder = 'team') => {
  const fileExt = path.extname(file.originalname);
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('nexicweb-images')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('nexicweb-images')
    .getPublicUrl(filePath);

  return publicUrl;
};

// Delete image from Supabase Storage
const deleteImage = async (imageUrl) => {
  try {
    const urlParts = imageUrl.split('/nexicweb-images/');
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];

    await supabase.storage
      .from('nexicweb-images')
      .remove([filePath]);
  } catch (error) {
    console.error('Delete image error:', error);
  }
};

// Get all team members
exports.getAllTeamMembers = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }

  return data;
};

// Get team member by ID
exports.getTeamMemberById = async (id) => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Database query failed: ${error.message}`);
  }

  return data;
};

// Create team member
exports.createTeamMember = async (memberData, file) => {
  if (!file) {
    throw new Error('Image is required');
  }

  const imageUrl = await uploadImage(file, 'team');
  memberData.image_url = imageUrl;

  const { data, error } = await supabase
    .from('team_members')
    .insert([memberData])
    .select()
    .single();

  if (error) {
    await deleteImage(imageUrl);
    throw new Error(`Failed to create team member: ${error.message}`);
  }

  return data;
};

// Update team member
exports.updateTeamMember = async (id, memberData, file) => {
  const existingMember = await this.getTeamMemberById(id);
  if (!existingMember) {
    throw new Error('Team member not found');
  }

  if (file) {
    const newImageUrl = await uploadImage(file, 'team');
    
    if (existingMember.image_url) {
      await deleteImage(existingMember.image_url);
    }
    
    memberData.image_url = newImageUrl;
  }

  const { data, error } = await supabase
    .from('team_members')
    .update(memberData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update team member: ${error.message}`);
  }

  return data;
};

// Delete team member
exports.deleteTeamMember = async (id) => {
  const member = await this.getTeamMemberById(id);
  
  if (!member) {
    throw new Error('Team member not found');
  }

  if (member.image_url) {
    await deleteImage(member.image_url);
  }

  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete team member: ${error.message}`);
  }
};
