'use client';

import { Dashboard } from '@/presentation/views';

import { withPrivatePage } from '@/core/HOC/withPrivatePage';

function DashboardPage() {
  return <Dashboard />;
}

export default withPrivatePage(DashboardPage);
