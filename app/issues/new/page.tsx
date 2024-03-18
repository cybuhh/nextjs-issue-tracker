'use client';

import { TextField, Button } from '@radix-ui/themes';
import type { SimpleMDEReactProps, SimpleMdeReact } from 'react-simplemde-editor';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import type { ControllerRenderProps } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { forwardRef, useState } from 'react';
import { Callout } from '@radix-ui/themes';

// eslint-disable-next-line react/display-name
const Editor = forwardRef((props: SimpleMDEReactProps, ref: React.LegacyRef<HTMLDivElement> | undefined) => (
  <SimpleMDE {...props} ref={ref} />
));

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
  } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleControllerRender = ({ field }: { field: ControllerRenderProps<IssueForm, 'description'> }) => {
    return <SimpleMDE placeholder='Description' {...field} />;
  };
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
      <Controller name='description' control={control} render={handleControllerRender} />
      <Button>Submit new issue</Button>
    </form>
  );
}

export default NewIssuePage;
