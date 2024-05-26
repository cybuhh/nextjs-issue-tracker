'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: ReadonlyArray<{ label: string; value?: Status }> = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOnValueChange = (status: string) => {
    const params = new URLSearchParams();
    if (status) {
      params.append('status', status);
    }
    if (searchParams.get('orderBy')) {
      params.append('orderBy', searchParams.get('orderBy')!);
    }

    const query = params.size ? '?' + params.toString() : '';
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root onValueChange={handleOnValueChange} defaultValue={searchParams.get('status')!}>
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
