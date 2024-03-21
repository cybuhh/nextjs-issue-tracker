'use client';

import dynamic from 'next/dynamic';
import { TextField, Button, Text } from '@radix-ui/themes';
import { FieldValue, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Callout } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: zodResolver(createIssueSchema) });
  const router = useRouter();
  const [error, setError] = useState('');

  const Editor = dynamic(() => import('@/app/components/EditorController'), { ssr: false });

  const handleFormOnSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch('/api/issues', { method: 'post', body: JSON.stringify(data) });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      router.push('/issues');
    } catch (e) {
      setError('An unexpected error occured');
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
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Editor name='description' control={control} placeholder='Description' />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button>Submit new issue</Button>
    </form>
  );
}

export default NewIssuePage;
