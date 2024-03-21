'use client';

import dynamic from 'next/dynamic';
import { TextField, Button, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Callout } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
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

  const Editor = dynamic(() => import('@/app/ui/form/EditorController'), { ssr: false });

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
      {errors.title && (
        <Text color='red' as='p'>
          {errors.title.message as string}
        </Text>
      )}
      <Editor name='description' control={control} placeholder='Description' />
      {errors.description && (
        <Text as='p' color='red'>
          {errors.description.message as string}
        </Text>
      )}
      <Button>Submit new issue</Button>
    </form>
  );
}

export default NewIssuePage;
