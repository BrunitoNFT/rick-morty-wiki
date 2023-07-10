import React from 'react';
import { Alert, Box } from '@/components/index';
import Image from 'next/image';

export const metadata = {
  title: 'ISR | Incremental Static Regeneration',
  description:
    'Complete tutorial of how to use ISR (Incremental Static Regeneration) in Next.js',
};

const page = async () => {
  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' +
      process.env.UNSPLASH_ACCESS_KEY,
    { next: { revalidate: 60 }, cache: 'no-store' }
  );
  const image = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <Box sx={{ p: 1 }}>
      <Alert severity="info" sx={{ my: 2 }}>
        <strong>ISR (Incremental Static Regeneration): </strong>This type of
        rendering is similar than a static build, but each 60 seconds (in this
        case specified in the fetch object) Next.js server is going to re-fetch
        the image and if there is no error the server will replace the previous
        cache rendering with the new one. So all users are going to see the same
        page in those 60 seconds. You can do it at fetch level:
        <pre>
          <code
            style={{
              display: 'block',
              backgroundColor: 'black',
              padding: 5,
              borderRadius: '5px',
              color: 'white',
            }}
          >
            {"fetch('https://...', { next: { revalidate: 60 } })"}
          </code>
        </pre>
        Or at the component level (If you are using a custom fetch function):
        <pre>
          <code
            style={{
              display: 'block',
              backgroundColor: 'black',
              padding: 5,
              borderRadius: '5px',
              color: 'white',
            }}
          >
            {
              'export const revalidate = 60 // revalidate this page every 60 seconds'
            }
          </code>
        </pre>
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
