import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CampsClient } from '../../../components/public/CampsClient';

export const metadata: Metadata = {
  title: 'Naval Camps Hub | GCEK Naval NCC',
  description:
    'Comprehensive guide to All India Nau Sainik Camp (AINSC), Republic Day Camp (RDC), Naval Technical Attachment Camp (NTAC), and Combined Annual Training Camps.',
};

export default function CampsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-amber-300">Loading Camps Hub...</div>}>
      <CampsClient />
    </Suspense>
  );
}
