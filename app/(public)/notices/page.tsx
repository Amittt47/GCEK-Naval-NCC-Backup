import { Metadata } from 'next';
import { NoticesClient } from '../../../components/public/NoticesClient';
import { getNotices } from '../../../lib/queries/notices';

export const metadata: Metadata = {
  title: 'Official Notice Board | GCEK Naval NCC',
  description:
    'Live parade orders, selection notifications, AINSC camp circulars, and official orders for GCEK Naval NCC cadets.',
};

export default async function NoticesPage() {
  await getNotices();
  return <NoticesClient />;
}
