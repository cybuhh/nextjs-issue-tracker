'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import Editor from '@/app/components/EditorController';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

interface IssueFormProps {
  issue?: Issue;
}

function IssueForm({ issue }: IssueFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: zodResolver(issueSchema) });
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormOnSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      const body = JSON.stringify(data);
      if (issue) {
        const response = await fetch(`/api/issues/${issue.id}`, { method: 'PATCH', body });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const response = await fetch('/api/issues', { method: 'POST', body });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      router.push('/issues');
      router.refresh();
    } catch (e) {
      setError('An unexpected error occured');
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={handleFormOnSubmit} className='max-w-xl space-y-3'>
      {error.length > 0 && (
        <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Editor name='description' defaultValue={issue?.description} control={control} placeholder='Description' />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting}>
        {issue ? 'Update issue' : 'Submit new issue'} {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
}

export default IssueForm;
