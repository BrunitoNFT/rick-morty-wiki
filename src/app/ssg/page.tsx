import React from 'react';
import Image from 'next/image';
import { Alert, Box } from '@/components/index';

export const metadata = {
  title: 'SSG | Static Site Generator',
  description:
    'Complete tutorial of how to use SSG (Static Site Generation) in Next.js',
};

const page = async () => {
  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' +
      process.env.UNSPLASH_ACCESS_KEY,
    { next: { tags: ['ssg'] } }
  );
  const image = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <Box sx={{ padding: 3 }}>
      <Alert severity="info" sx={{ my: 2 }}>
        <strong>SSG (Static Site Generation):</strong> This page is generated
        and rendered on the Next.js server and will always return the same
        image. As you can see it is the same image as the previous in SSR. Why
        is this happening? Well as a consequence of using the same endpoint in
        the default fetch, the second time will not request a new image, Next.js
        will get it back from the cache.
      </Alert>

      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        style={{ background: 'gray' }}
      />
    </Box>
  );
};

export default page;
