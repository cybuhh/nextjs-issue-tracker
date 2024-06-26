import React from 'react';
import { Badge } from '@radix-ui/themes';
import { Status } from '@prisma/client';

interface IssueStatusBadge {
  status: Status;
}

export const statusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'green' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

function IssueStatusBadge({ status }: IssueStatusBadge) {
  return (
    <Badge color={statusMap[status].color} data-testid='status-badge'>
      {statusMap[status].label}
    </Badge>
  );
}

export default IssueStatusBadge;
