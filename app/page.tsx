import prisma from '@/prisma/client';
import IssuesSummary from './IssuesSummary';
import LatestIssues from './LatestIssues';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import { Metadata } from 'next';

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  const issueProps = { open, inProgress, closed };

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex gap='5' direction='column'>
        <IssuesSummary {...issueProps} />
        <IssueChart {...issueProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashbaord',
  description: 'View a summary of project issues',
};
