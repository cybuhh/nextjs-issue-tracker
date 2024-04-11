import type { PropsWithChildren } from 'react';
import { TextField, Button, Text } from '@radix-ui/themes';
import type { FieldError, Message, FieldErrorsImpl } from 'react-hook-form';

interface ErrorMessageProps<T> {
  children: T;
}

export default function ErrorMessage<T extends Message | FieldError | FieldErrorsImpl | undefined>({
  children,
}: ErrorMessageProps<T>) {
  if (typeof children !== 'string' || children?.length === 0) {
    return null;
  }

  return (
    <Text color='red' as='p' data-testid='error-message'>
      {children}
    </Text>
  );
}
