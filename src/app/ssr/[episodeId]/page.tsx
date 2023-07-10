import { Episode } from '@/interfaces/episode-interfaces';
import { Box, Typography, Alert } from '@/components/index';

interface Props {
  params: {
    episodeId: string;
  };
}

export async function generateMetadata({ params: episodeId }: Props) {
  const res = await fetch(
    'https://rickandmortyapi.com/api/episode/' + episodeId?.episodeId
  );
  const data: Episode = await res.json();

  return {
    title: 'SSR | ' + data?.name,
  };
}

const page = async ({ params: episodeId }: Props) => {
  const res = await fetch(
    'https://rickandmortyapi.com/api/episode/' + episodeId?.episodeId
  );
  const data: Episode = await res.json();
  console.log('Res: ' + JSON.stringify(data) + data + episodeId);

  return (
    <>
      <Alert severity="info" sx={{ margin: 2 }}>
        <strong>SSR (Server Side Rendering): </strong>
        This rendering type is done in the server, all the code is returned
        rendered. Therefore when we click the page we have a small delay before
        the content without loading. In each request the Next.js server fetchs
        info and renders all the code saving it into the cache, for that reason
        if we go to the same url we wont have any delay because the page is
        cached in the server storage.
      </Alert>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 2,
          }}
        >
          <Typography variant="h3">{data.name}</Typography>
          <Typography variant="h5">{data.air_date}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default page;
