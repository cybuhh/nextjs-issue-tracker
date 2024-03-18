'use client';

import dynamic from 'next/dynamic';
import { TextField, Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Callout } from '@radix-ui/themes';

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
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
      <Editor fieldName='description' control={control} />
      <Button>Submit new issue</Button>
    </form>
  );
}

export default NewIssuePage;
