'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const Editor = dynamic(() => import('@/app/components/EditorController'), { ssr: false });

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

      const response = await fetch('/api/issues', { method: 'post', body: JSON.stringify(data) });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
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
      <TextField.Root>
        <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Editor name='description' defaultValue={issue?.description} control={control} placeholder='Description' />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting}>
        Submit new issue
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
}

export default IssueForm;
