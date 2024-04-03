'use client';

import { Button, Flex, Text } from '@radix-ui/themes';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function Pagination({ itemCount, pageSize, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const onChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => onChangePage(1)}>
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => onChangePage(currentPage - 1)}>
        <MdKeyboardArrowLeft />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <MdKeyboardArrowRight />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => onChangePage(pageCount)}>
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
}

export default Pagination;
