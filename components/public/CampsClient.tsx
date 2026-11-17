'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { CampsView } from '../../src/views/CampsView';
import { useUnitData } from '../../src/context/UnitDataContext';

export function CampsClient() {
  const searchParams = useSearchParams();
  const camp = searchParams?.get('camp') || undefined;
  const { openCustomizer } = useUnitData();

  return <CampsView initialCampSlug={camp} onOpenCustomizer={openCustomizer} />;
}
