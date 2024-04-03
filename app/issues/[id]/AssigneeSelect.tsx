'use client';

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

function AssigneeSelect() {
  const [users, setUsers] = useState<ReadonlyArray<User>>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await fetch('/api/users');
      const data = await result.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    users && (
      <Select.Root defaultValue='apple'>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    )
  );
}

export default AssigneeSelect;
