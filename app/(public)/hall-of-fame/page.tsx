import { Metadata } from 'next';
import { HallOfFameView } from '../../../src/views/HallOfFameView';

export const metadata: Metadata = {
  title: 'Hall of Fame | GCEK Naval NCC',
  description:
    'Distinguished roll of alumni, commissioned officers, national gold medalists, and exemplary leaders of GCEK Naval NCC.',
};

export default function HallOfFamePage() {
  return <HallOfFameView />;
}
