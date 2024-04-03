'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const statuses: ReadonlyArray<{ label: string; value?: Status }> = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

function IssueStatusFilter() {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || (null as unknown as string)}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
