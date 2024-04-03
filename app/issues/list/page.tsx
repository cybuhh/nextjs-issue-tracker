import { Pagination } from '@/app/components';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface IssuesPageProps {
  searchParams: IssueQuery;
}

const validStatuses = Object.values(Status);

async function IssuesPage({ searchParams }: IssuesPageProps) {
  const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined;
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: 'asc',
      }
    : undefined;

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const where = { status };

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  );
}

export const dynamic = 'force-dynamic';
// export const revalidate = 0; // same as above

export default IssuesPage;
