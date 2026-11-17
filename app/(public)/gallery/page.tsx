import { Metadata } from 'next';
import { GalleryView } from '../../../src/views/GalleryView';
import { getGalleryItems } from '../../../lib/queries/gallery';

export const metadata: Metadata = {
  title: 'Visual Archives & Activity Photos | GCEK Naval NCC',
  description:
    'Photographic history of GCEK Naval NCC: ceremonial guard of honor, whaler boat pulling at Chilika, AINSC ship modeling, and social service drives.',
};

export default async function GalleryPage() {
  await getGalleryItems();
  return <GalleryView />;
}
