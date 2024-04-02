import React from 'react';
import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function LoadingNewIssuesPage() {
  return (
    <Box>
      <Skeleton />
      <Skeleton height='20rem' />
    </Box>
  );
}

export default LoadingNewIssuesPage;
