"use client"

import React from 'react'

import { useQuery } from '@apollo/client';
import { Box, Typography, Alert } from '@mui/material';
import GET_CHARACTER from "@/gql/queries/character"
import Image from 'next/image';

interface Props {
    params: {
    characterId: string
  }
}


const Page = ({params:characterId}:Props) => {
    console.log("characterId: ",characterId)
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: {
          id: characterId.characterId
        },
      });
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      console.log("character",data.character)
      
  return (<>
          <Alert severity="info" sx={{margin:2}}>
          <strong>Apollo dynamic route:</strong> One more time we use Apollo client combined with GraphQl and variables in the query such as the character ID. Obviously this page uses the “use client” because it uses client side features.          </Alert>
    <Box sx={{display:"flex",gap:"20px",justifyContent:"center"}}>
        <Image style={{borderRadius: "50%",background:"lightgray"}} src={data.character.image} width={300} height={300} alt={data.character.name} />
        <Box>
        <Typography variant="h2">{data.character.name}</Typography>
        <Typography variant="h5">{data.character.status}</Typography>
        <Typography variant="h5">{data.character.species}</Typography>

        </Box>
    
    
    </Box>
    </>
  )
}

export default Page