'use client';

import { Skeleton } from '@/app/components';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';

function AssigneeSelect() {
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

  if (isLoading) {
    return <Skeleton />;
  }
  if (error) {
    null;
  }

  return (
    <Select.Root defaultValue='apple'>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
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
