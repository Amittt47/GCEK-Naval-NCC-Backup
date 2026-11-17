import { Metadata } from 'next';
import { EventCalendarView } from '../../../src/views/EventCalendarView';

export const metadata: Metadata = {
  title: 'Event Calendar & Training Schedule | GCEK Naval NCC',
  description:
    'Official parade schedules, weekly Saturday & Sunday NCC classes, camp selection trials, and ceremonial events of GCEK Naval NCC.',
};

export default function CalendarPage() {
  return <EventCalendarView />;
}
