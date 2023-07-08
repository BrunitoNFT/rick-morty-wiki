"use client"


import GET_CHARACTERS from '@/gql/queries/characters'
import { Character } from '@/interfaces/characters-interfaces'
import { useQuery } from '@apollo/client';
import { Box,Alert } from '@mui/material';
import Link from 'next/link';



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


  /**
   * This is the second way to fetch the data with GraphQL
   * useQuery
   */

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <>
  <Alert severity="info" sx={{margin:2}}>

  <strong>Apollo:</strong> This page in the project is the only one that uses GraphQL with Apollo Client. This page uses the “use client” next.js 13 feature to change the rendering type from server side as default to client side. Why we need to do this? Well from next.js 13 the components are pre-rendered in the server and saved in the cache to avoid unnecessary rendering in the client. Therefore Apollo doesn’t run in the server because is a client side library.

  </Alert>

  {data.characters.results?.map((character: Character) => <Box key={character.id} sx={{border: "1px solid black", p: 2}}><Link href={"/csr/apollo/"+character.id}>{character.name}</Link></Box>)}
  </>
}