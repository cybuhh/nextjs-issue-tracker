'use client';

import { Avatar, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import { Skeleton } from '@/app/components';

function NavBar() {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex gap='5' justify='between'>
          <Flex gap='3' align='center'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function NavLinks() {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  function getLinkClassNames(href: string) {
    return classnames('nav-link', {
      '!text-zinc-900': currentPath === href,
    });
  }

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className={getLinkClassNames(link.href)}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <Skeleton width='3rem' />;
  }

  if (status === 'unauthenticated') {
    return (
      <Link href='/api/auth/signin' className='nav-link'>
        Log in
      </Link>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback='?'
          size='2'
          radius='full'
          className='cursor-pointer'
          referrerPolicy='no-referrer'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size='2'>{session!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href='/api/auth/signout'>Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default NavBar;
