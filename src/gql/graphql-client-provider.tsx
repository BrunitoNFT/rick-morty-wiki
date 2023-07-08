"use client"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';

export const GQLClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
    });

interface GQLProviderProps{
    children: React.ReactNode;
}

const GQLProvider = ({children}: GQLProviderProps) =>    
  <ApolloProvider client={GQLClient}>
    {children}
  </ApolloProvider>

export default GQLProvider;
