'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HomeView } from '../../src/views/HomeView';
import { HubTab } from '../../src/types';
import { useUnitData } from '../../src/context/UnitDataContext';

export function HomeClient() {
  const router = useRouter();
  const { openCustomizer } = useUnitData();

  const handleSelectTab = (tab: HubTab, extraId?: string) => {
    if (tab === 'home') router.push('/');
    else if (tab === 'camps' && extraId) router.push(`/camps?camp=${extraId}`);
    else router.push(`/${tab}`);
  };

  return (
    <HomeView
      onSelectTab={handleSelectTab}
      onOpenCustomizer={openCustomizer}
    />
  );
}
