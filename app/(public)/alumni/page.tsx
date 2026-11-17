import { Metadata } from 'next';
import { AlumniView } from '../../../src/views/AlumniView';
import { getAlumni } from '../../../lib/queries/alumni';

export const metadata: Metadata = {
  title: 'Alumni Network & Officer Mentorship | GCEK Naval NCC',
  description:
    'Directory of commissioned Indian Navy, Army, and Coast Guard officers and senior engineers from GCEK Naval NCC, offering career guidance and mentorship.',
};

export default async function AlumniPage() {
  await getAlumni();
  return <AlumniView />;
}
