'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { NoticeBoardView } from '../../src/views/NoticeBoardView';

export function NoticesClient() {
  const router = useRouter();

  return (
    <NoticeBoardView
      onAdminOpen={() => router.push('/admin/notices')}
    />
  );
}
