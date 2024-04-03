import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import { default as Link, default as NextLink } from 'next/link';
import { FaArrowUp } from 'react-icons/fa';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface IssueTableProps {
  searchParams: IssueQuery;
  issues: ReadonlyArray<Issue>;
}

function IssueTable({ searchParams, issues }: IssueTableProps) {
  return (
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
  );
}

export default IssueTable;

const columns: ReadonlyArray<{ label: string; value: keyof Issue; className?: string }> = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map((column) => column.value);
