'use client';

import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteIssueButtonProps {
  issueId: number;
}

function DeleteIssueButton({ issueId }: DeleteIssueButtonProps) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOnDeleteButtonClick = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/issues/${issueId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setError(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleErrorDialogOkButtonOnClick = () => setError(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            Delete Issue {isDeleting && <Spinner />}
          </Button>
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
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
          <Button color='gray' variant='soft' mt='2' onClick={handleErrorDialogOkButtonOnClick}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default DeleteIssueButton;
