import { Metadata } from 'next';
import { HomeClient } from '../../components/public/HomeClient';
import { getUnitInfo } from '../../lib/queries/unit';

export const metadata: Metadata = {
  title: 'GCEK Naval NCC | 4 Odisha Naval Unit NCC Bhawanipatna',
  description:
    'Government College of Engineering Kalahandi Naval NCC portal. Official military training, parade schedules, camp achievements, and officer commissioning hub.',
};

export default async function HomePage() {
  // Pre-fetch unit info on server
  await getUnitInfo();

  return <HomeClient />;
}
