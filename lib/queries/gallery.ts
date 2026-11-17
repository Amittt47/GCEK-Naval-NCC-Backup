import { createClient } from '../supabase/server';
import { GALLERY_ITEMS } from '../constants/mockData';
import { GalleryItem } from '../../src/types';

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return GALLERY_ITEMS as GalleryItem[];

    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('year', { ascending: false });

    if (error || !data || (data as any[]).length === 0) {
      return GALLERY_ITEMS as GalleryItem[];
    }

    return (data as any[]).map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      year: g.year,
      caption: g.description || 'Naval training activity at GCEK.',
      type: 'image',
      imageUrl: g.image_url || undefined,
    }));
  } catch (err) {
    console.warn('Supabase getGalleryItems error, using fallback:', err);
    return GALLERY_ITEMS as GalleryItem[];
  }
}
