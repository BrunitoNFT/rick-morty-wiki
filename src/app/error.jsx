'use client';
import { Alert } from '@/components/index';

const error = () => {
  return (
    <Alert severity="error" sx={{ my: 2, m: 1 }}>
      There was an error with the API or the daily request limit was reached.
      Please try again later.
    </Alert>
  );
};

export default error;
