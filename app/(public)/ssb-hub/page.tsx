import { Metadata } from 'next';
import { SsbHubView } from '../../../src/views/SsbHubView';

export const metadata: Metadata = {
  title: 'SSB Preparation Hub & OIR Engine | GCEK Naval NCC',
  description:
    'Dedicated Services Selection Board (SSB) preparation portal for Naval NCC cadets. Officer Intelligence Rating (OIR), Situation Reaction Test (SRT), and interview coaching.',
};

export default function SsbHubPage() {
  return <SsbHubView />;
}
