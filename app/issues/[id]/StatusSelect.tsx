'use client';

import { statusMap } from '@/app/components/IssueStatusBadge';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface StatusSelectProps {
  issueId: number;
  status: Status;
}

const statusList = Object.values(Status);

function StatusSelect({ issueId, status }: StatusSelectProps) {
  const router = useRouter();

  const handleOnValueChange = async (newStatus: string) => {
    try {
      fetch(`/api/issues/${issueId}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  return (
    <>
      <Select.Root defaultValue={status} onValueChange={handleOnValueChange}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statusList.map((i) => (
              <Select.Item key={i} value={i} color={statusMap[i].color}>
                {statusMap[i].label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

export default StatusSelect;
