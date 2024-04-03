'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';

interface AssigneeSelectProps {
  issueId: number;
  assignedToUserId: string | null;
}

function AssigneeSelect({ issueId, assignedToUserId }: AssigneeSelectProps) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<ReadonlyArray<User>>({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await fetch('/api/users');
      const data = await result.json();
      return data;
    },
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  const handleOnValueChange = async (userId: string) => {
    fetch(`/api/issues/${issueId}`, { method: 'PATCH', body: JSON.stringify({ assignedToUserId: userId }) });
  };

  if (isLoading) {
    return <Skeleton />;
  }
  if (error) {
    null;
  }

  return (
    <Select.Root value={assignedToUserId || undefined} onValueChange={handleOnValueChange}>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={null as unknown as string}>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
