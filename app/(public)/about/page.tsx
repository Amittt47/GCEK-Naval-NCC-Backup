import { Metadata } from 'next';
import { AboutClient } from '../../../components/public/AboutClient';
import { getUnitInfo } from '../../../lib/queries/unit';

export const metadata: Metadata = {
  title: 'About Us | GCEK Naval NCC',
  description:
    'About Government College of Engineering Kalahandi Naval NCC Sub-Unit, under 4 Odisha Naval Unit NCC Bhawanipatna. Command leadership, ANO credentials, and cadet lineage.',
};

export default async function AboutPage() {
  await getUnitInfo();
  return <AboutClient />;
}
