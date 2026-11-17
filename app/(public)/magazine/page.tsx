import { Metadata } from 'next';
import { MagazineView } from '../../../src/views/MagazineView';

export const metadata: Metadata = {
  title: 'Naval Vanguard Magazine | GCEK Naval NCC',
  description:
    'Cadet articles, camp memoirs from INS Shivaji, defence analysis, and leadership essays by GCEK Naval NCC officers and cadets.',
};

export default function MagazinePage() {
  return <MagazineView />;
}
