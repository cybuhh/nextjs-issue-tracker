import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { BsPencilSquare } from 'react-icons/bs';

interface DeleteIssueButtonProps {
  issueId: number;
}

function DeleteIssueButton({ issueId }: DeleteIssueButtonProps) {
  return (
    <Button color='red'>
      <BsPencilSquare />
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
}

export default DeleteIssueButton;
