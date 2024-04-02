import React from 'react';
import IssueForm from '../../_components/IssueForm';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

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
