import React from 'react';
import { Alert, Box } from '@/components/index';

const page = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Alert severity="info" sx={{ marginBottom: '10px' }}>
        This project was created in the first week of onBoarding in Solvd. The
        main objective is to test and teach while I learn Next.js 13.
        Specifically all rendering types, optimization, cache and revalidation.
        I&apos;m using two API, Rick and Morty with graphQl integration:{' '}
        <a href="https://rickandmortyapi.com/graphql" target="_blank">
          {' '}
          https://rickandmortyapi.com/graphql{' '}
        </a>
        and this great API of images:{' '}
        <a href="https://unsplash.com/developers" target="_blank">
          {' '}
          https://unsplash.com/developers{' '}
        </a>
        where all the request returns random images, this feature give us the
        capacity of understanding the rendering types visually :D.{' '}
      </Alert>
    </Box>
  );
};

export default page;
