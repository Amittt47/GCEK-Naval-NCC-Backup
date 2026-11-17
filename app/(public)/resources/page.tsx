import { Metadata } from 'next';
import { ResourcesView } from '../../../src/views/ResourcesView';

export const metadata: Metadata = {
  title: 'Cadet Resources & Seamanship Manuals | GCEK Naval NCC',
  description:
    'Study materials, technical notes on naval knots, bends & hitches, words of command, armed forces rank comparative charts, and uniform guidelines.',
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
