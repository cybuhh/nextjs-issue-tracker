'use client';

import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function NewIssuePage() {
  return (
    <form className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='Title' />
      </TextField.Root>
      <SimpleMDE placeholder='Description' />
      <Button>Submit new issue</Button>
    </form>
  );
}

export default NewIssuePage;
