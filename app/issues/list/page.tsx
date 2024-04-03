import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { FaArrowUp } from 'react-icons/fa';
import IssueActions from './IssueActions';

interface IssuesPageProps {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const validStatuses = Object.values(Status);

async function IssuesPage({ searchParams }: IssuesPageProps) {
  const columns: ReadonlyArray<{ label: string; value: keyof Issue; className?: string }> = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined;
  const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: 'asc',
      }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div className='space-y-3'>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{ query: { ...searchParams, orderBy: column.value } }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <FaArrowUp className='inline' />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = 'force-dynamic';
// export const revalidate = 0; // same as above

export default IssuesPage;
