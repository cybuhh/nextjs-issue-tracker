'use client';

import { TextField, TextArea, Button } from '@radix-ui/themes';

function NewIssuePage() {
  return (
    <form className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='Title' />
      </TextField.Root>
      <TextArea placeholder='Description' />
      <Button>Submit new issue</Button>
    </form>
  );
}

export default NewIssuePage;
