import React from 'react';
import { Badge } from '@radix-ui/themes';
import { Status } from '@prisma/client';

interface IssueStatusBadge {
  status: Status;
}

const statusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'green' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

function IssueStatusBadge({ status }: IssueStatusBadge) {
  return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
}

export default IssueStatusBadge;
