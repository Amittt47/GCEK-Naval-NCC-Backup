'use client';

import React from 'react';
import { AdminProvider, useAdmin } from '../../components/admin/AdminContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';

function AdminShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useAdmin();

  return (
    <div className="min-h-screen bg-[#001428] text-slate-100 flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
