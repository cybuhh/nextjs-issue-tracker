import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';
import { cache } from 'react';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface EditIssuePageProps {
  params: {
    id: string;
  };
}

const fetchIssue = cache(async (issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

async function EditIssuePage({ params: { id } }: EditIssuePageProps) {
  const issueId = parseInt(id);
  if (typeof issueId !== 'number') {
    notFound();
  }

  const issue = await fetchIssue(issueId);

  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
}

export default EditIssuePage;

export async function generateMetadata({ params: { id } }: EditIssuePageProps) {
  const issue = await fetchIssue(parseInt(id));

  return {
    title: issue?.title,
    description: 'Edit issue ' + issue?.id,
  };
}
