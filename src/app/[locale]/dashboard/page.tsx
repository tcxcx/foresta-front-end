import React from 'react';
import { Resizable } from '@/components/dashboard/Resizable';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Resizable />
    </div>
  );
}
