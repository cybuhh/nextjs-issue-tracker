import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

function LoadingNewIssuesPage() {
  return (
    <Box>
      <Skeleton />
      <Skeleton height='20rem' />
    </Box>
  );
}

export default LoadingNewIssuesPage;
