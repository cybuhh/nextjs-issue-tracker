import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

async function page({ params: { id } }: IssueDetailPageProps) {
  const issueId = parseInt(id);
  if (typeof issueId !== 'number') {
    notFound();
  }

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}

export default page;
