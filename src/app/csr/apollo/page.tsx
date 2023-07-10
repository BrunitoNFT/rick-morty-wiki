import CharactersGQL from '@/components/CharactersGQL';

export const metadata = {
  title: 'CSR | Client Side Rendering with GraphQL',
  description:
    'Complete tutorial of how to use CSR (Client Side Rendering) with GraphQL and Apollo Client in Next.js',
};

/**
 * getCharacterf
 * This is just a way to fetch the data with GraphQL
 * There is a React hook for this use case that is much better
 

  async function getCharacter(){
    const res = await GQLClient.query<Promise<{character: CharactersResponse}>>({
      query: GET_CHARACTERS
    })
    return res

}
*/

export default function Home() {
  return <CharactersGQL />;
}
