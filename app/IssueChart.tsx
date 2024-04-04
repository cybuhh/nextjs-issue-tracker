'use client';

import { Status } from '@prisma/client';
import { Card } from '@radix-ui/themes';
import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

interface IssueChartProps {
  open: number;
  inProgress: number;
  closed: number;
}

function IssueChart({ open, inProgress, closed }: IssueChartProps) {
  const data = [
    { label: 'Open', value: open },
    { label: 'In-progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar dataKey='value' barSize={60} style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart;
