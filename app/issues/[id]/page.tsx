import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import IssueDetails from './IssueDetails';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { Metadata } from 'next';
import { cache } from 'react';

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

const fetchIssue = cache(async (issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

async function IssueDetailPage({ params: { id } }: IssueDetailPageProps) {
  const session = await getServerSession(authOptions);

  const issueId = parseInt(id);
  if (typeof issueId !== 'number') {
    notFound();
  }

  const issue = await fetchIssue(issueId);

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction='column' gap='5'>
            <AssigneeSelect issueId={issue.id} assignedToUserId={issue.assignedToUserId} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export default IssueDetailPage;

export async function generateMetadata({ params: { id } }: IssueDetailPageProps) {
  const issue = await fetchIssue(parseInt(id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}
