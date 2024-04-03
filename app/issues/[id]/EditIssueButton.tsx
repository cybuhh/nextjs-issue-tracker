import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';

interface EditIssueButtonProps {
  issueId: number;
}

function EditIssueButton({ issueId }: EditIssueButtonProps) {
  return (
    <Button>
      <BsPencilSquare />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
}

export default EditIssueButton;
