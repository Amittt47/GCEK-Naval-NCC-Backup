import { Metadata } from 'next';
import { CareersView } from '../../../src/views/CareersView';

export const metadata: Metadata = {
  title: 'Defence Careers & Commissioning Routes | GCEK Naval NCC',
  description:
    'Comprehensive pathways into the Indian Armed Forces for GCEK engineering students: Indian Navy Special Entry, CDS, AFCAT, Technical Graduate Course, and Coast Guard.',
};

export default function CareersPage() {
  return <CareersView />;
}
