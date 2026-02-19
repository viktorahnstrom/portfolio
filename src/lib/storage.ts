import { supabase } from './supabase';

export async function uploadProjectImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  const { error } = await supabase.storage
    .from('project-images')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteProjectImage(url: string): Promise<boolean> {
  // Extract file path from URL
  const match = url.match(/project-images\/(.+)$/);
  if (!match) return false;

  const filePath = match[1];

  const { error } = await supabase.storage
    .from('project-images')
    .remove([filePath]);

  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }

  return true;
}