'use client';

import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

function NavBar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  function getLinkClassNames(href: string) {
    return classnames('hover:text-zinc-800 transition-colors', {
      'text-zinc-900': currentPath === href,
      'text-zinc-500': currentPath !== href,
    });
  }

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex gap='5' justify='between'>
          <Flex gap='3' align='center'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <ul className='flex space-x-6'>
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={getLinkClassNames(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && <Link href='/api/auth/signout'>Log out</Link>}
            {status === 'unauthenticated' && <Link href='/api/auth/signin'>Log in</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;
