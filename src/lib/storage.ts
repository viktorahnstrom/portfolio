import { supabase } from './supabase';

export async function uploadProjectMedia(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  const { error } = await supabase.storage
    .from('project-images')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Keep old function name for backwards compatibility
export const uploadProjectImage = uploadProjectMedia;

export async function deleteProjectMedia(url: string): Promise<boolean> {
  const match = url.match(/project-images\/(.+)$/);
  if (!match) return false;

  const filePath = match[1];

  const { error } = await supabase.storage
    .from('project-images')
    .remove([filePath]);

  if (error) {
    console.error('Error deleting file:', error);
    return false;
  }

  return true;
}

// Helper to check if URL is a video
export function isVideoUrl(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
  return videoExtensions.some(ext => url.toLowerCase().includes(ext));
}