import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

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
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose mt-4'>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
}

export default page;
