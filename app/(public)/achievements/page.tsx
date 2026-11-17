import { Metadata } from 'next';
import { AchievementsView } from '../../../src/views/AchievementsView';
import { getAchievements } from '../../../lib/queries/achievements';

export const metadata: Metadata = {
  title: 'Achievements & Roll of Honor | GCEK Naval NCC',
  description:
    'Cadet honors, national medals, AINSC ship modeling awards, Republic Day Kartavya Path marchers, and Governor Medallions.',
};

export default async function AchievementsPage() {
  await getAchievements();
  return <AchievementsView />;
}
