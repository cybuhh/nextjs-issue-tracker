'use client';
import { Skeleton } from '@/app/components';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import { usePathname } from 'next/navigation';
import LoadingNew from './new/loading';
import LoadingDetails from './[id]/loading';
import LoadingEdit from './[id]/edit/loading';

function LoadingIssuesPage() {
  const pathname = usePathname();
  if (pathname === '/issues/new') {
    return <LoadingNew />;
  }
  if (pathname.match(/^\/issues\/\d$/)) {
    return <LoadingDetails />;
  }
  if (pathname.match(/^\/issues\/\d\/edit$/)) {
    return <LoadingEdit />;
  }

  const issues = [1, 2, 3, 4, 5];

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
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className='block md:hidden'>
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default LoadingIssuesPage;
