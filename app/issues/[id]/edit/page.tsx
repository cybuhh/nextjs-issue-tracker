import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface EditIssuePageProps {
  params: {
    id: string;
  };
}

async function EditIssuePage({ params: { id } }: EditIssuePageProps) {
  const issueId = parseInt(id);
  if (typeof issueId !== 'number') {
    notFound();
  }

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });

  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
