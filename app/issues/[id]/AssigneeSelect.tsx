'use client';

import { Select } from '@radix-ui/themes';
import React from 'react';

function AssigneeSelect() {
  return (
    <Select.Root defaultValue='apple'>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value='1'>Orange</Select.Item>
          <Select.Item value='2'>Apple</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value='carrot'>Carrot</Select.Item>
          <Select.Item value='potato'>Potato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
