import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface IssuesSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}

function IssuesSummary({ open, inProgress, closed }: IssuesSummaryProps) {
  const containers: ReadonlyArray<{ label: string; value: number; status: Status }> = [
    { label: 'Open issues', value: open, status: 'OPEN' },
    { label: 'In-progress issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap='4'>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link href={`/issues?status=${container.status}`} className='text-sm font-medium'>
              {container.label}
            </Link>
            <Text size='5' className='font-bold'>
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default IssuesSummary;
