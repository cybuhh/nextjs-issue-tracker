import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client';

interface IssuesPageProps {
  searchParams: {
    status: Status;
  };
}

const validStatuses = Object.values(Status);

async function IssuesPage({ searchParams }: IssuesPageProps) {
  const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined;

  const issues = await prisma.issue.findMany({ where: { status } });

  return (
    <div className='space-y-3'>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
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
