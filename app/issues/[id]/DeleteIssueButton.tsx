'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

interface DeleteIssueButtonProps {
  issueId: number;
}

function DeleteIssueButton({ issueId }: DeleteIssueButtonProps) {
  const router = useRouter();

  const handleOnDeleteButtonClick = async () => {
    const response = await fetch(`/api/issues/${issueId}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    router.push('/issues');
    router.refresh();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button color='gray' variant='soft'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red' onClick={handleOnDeleteButtonClick}>
              Delete issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default DeleteIssueButton;
