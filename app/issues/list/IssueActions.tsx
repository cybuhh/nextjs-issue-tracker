import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

function IssueActions() {
  return (
    <Button>
      <Link href='/issues/new'>New issue</Link>
    </Button>
  );
}

export default IssueActions;
