'use client';

import React from 'react';
import { AboutView } from '../../src/views/AboutView';
import { useUnitData } from '../../src/context/UnitDataContext';

export function AboutClient() {
  const { openCustomizer } = useUnitData();
  return <AboutView onOpenCustomizer={openCustomizer} />;
}
