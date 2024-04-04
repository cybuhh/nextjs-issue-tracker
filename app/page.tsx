import prisma from '@/prisma/client';
import IssuesSummary from './IssuesSummary';
import LatestIssues from './LatestIssues';
import { Flex } from '@radix-ui/themes';
import IssueChart from './IssueChart';

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return (
    <Flex gap='3' direction='column'>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
    </Flex>
  );
}
