import React from 'react';
import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface LinkProps {
  href: string;
}

function Link({ href, children }: React.PropsWithChildren<LinkProps>) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
}

export default Link;
