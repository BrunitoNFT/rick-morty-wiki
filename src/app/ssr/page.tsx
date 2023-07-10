import Link from 'next/link';
import { Episode } from '@/interfaces/episode-interfaces';
import { Box, Alert } from '@/components/index';
import Image from 'next/image';

export const metadata = {
  title: 'SSR | Server Side Rendering',
  description:
    'Complete tutorial of how to use SSR (Server Side Rendering) in Next.js',
};

const page = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/episode');
  const data = await res.json();

  const response2 = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' +
      process.env.UNSPLASH_ACCESS_KEY,
    { next: { tags: ['ssr'] } }
  );
  const image2 = await response2.json();
  const width2 = Math.min(500, image2.width);
  const height2 = (width2 / image2.width) * image2.height;

  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' +
      process.env.UNSPLASH_ACCESS_KEY,
    { cache: 'no-store' }
  );
  const image = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <Box sx={{ padding: 3 }}>
      <Alert severity="info" sx={{ my: 2 }}>
        This rendering type is done on the server. In each request the Next.js
        server fetches info and renders all the code saving it into the cache,
        for that reason if we go to the same url twice we won&apos;t have any
        delay because the page is cached in the server storage. Therefore at the
        first time that we click the page we will have a small delay before the
        content is processed in the server and once the new page is loaded we
        won&apos;t have any loading since the fetch was done on the server. What
        happens here? If we have a fetch the first time is going to be dynamic,
        but later next.js`s server will save on the cache this result. Therefore
        in the following calls the server is going to return cached data and
        will not do the fetch again. Because in Next.js 13 the default cache
        parameter in fetch is:
        <Box sx={{ margin: 1 }}>
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
              {"fetch('https://...') // cache: 'force-cache' is the default"}
            </code>
          </pre>
        </Box>
        How can we solve this issue? Well if we want the server to always do the
        fetch dynamically in each request we have several options. First of all
        we should understand the following concepts: First of all we should
        understand the following concepts: Revalidate ( known as Incremental
        Static Regeneration): When a request is made to the route that was
        statically rendered at build time, it will initially show the cached
        data. Any requests to the route after the initial request and before 60
        seconds are also cached and instantaneous. After the 60-second window,
        the next request will still show the cached (stale) data. Next.js will
        trigger a regeneration of the data in the background. Once the route
        generates successfully, Next.js will invalidate the cache and show the
        updated route. If the background regeneration fails, the old data would
        still be unaltered. When a request is made to a route segment that
        hasn`t been generated, Next.js will dynamically render the route on the
        first request. Future requests will serve the static route segments from
        the cache. If you are using fetch in your project you can use the
        revalidate feature it in this way:
        <Box sx={{ margin: 1 }}>
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
        </Box>
        But if you for example are using an external library to fetch you can do
        it at the page level:
        <Box sx={{ margin: 1 }}>
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
        </Box>
        But if you want to solve the problem of not doing the fetch in each
        request and change it to a dynamic way you have this options: Inside the
        fetch:
        <Box sx={{ margin: 1 }}>
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
              {"fetch('https://...', { cache: 'no-store' })"}
            </code>
          </pre>
        </Box>
        How does cache work in Next.js 13? If two requests with the same fetch
        data are done, the second one is going to get the data from the cache
        and we are going to have a single request from two fetches. If you are
        using an external library to fetch react provides a feature to wrap a
        function and use cache.
        <Box sx={{ margin: 1 }}>
          <pre>
            <code
              style={{
                display: 'block',
                backgroundColor: 'black',
                padding: 5,
                borderRadius: '5px',
                color: 'white',
              }}
            >{`import { cache } from 'react'
 
 export const getUser = cache(async (id: string) => {
   const user = await db.user.findUnique({ id })
   return user
  })`}</code>
          </pre>
        </Box>
        TODO: Preload article
        https://nextjs.org/docs/app/building-your-application/data-fetching/caching
        TODO: Server actions
        https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
      </Alert>

      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        style={{ background: 'gray', maxWidth: '90%' }}
      />

      <Alert severity="info" sx={{ my: 2 }}>
        The default behavior of this above image fetch is caching the fetch
        result. Therefore all users are going to instantly see the same image.
        To disable this, and change it into a dynamic render in the server, I
        will add:{' '}
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
            {"fetch('https://...', { cache: 'no-store' })"}
          </code>
        </pre>
        Because of that change next.js will not return cache code and in each
        request will refetch the image again.
      </Alert>
      <Image
        src={image2.urls.raw}
        width={width2}
        height={height2}
        alt={image2.description}
        style={{ background: 'gray', maxWidth: '90%' }}
      />
      <Alert severity="info" sx={{ my: 2 }}>
        This above fetch is cached so is going to be the same image for all the
        users.
      </Alert>
      <Box>
        {data.results.map((item: Episode) => (
          <Box key={item.id} sx={{ border: '1px solid #ccc', padding: '10px' }}>
            <Link href={'/ssr/' + item.id}>{item.name}</Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default page;
