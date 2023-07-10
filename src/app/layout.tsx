import GQLProvider from '@/gql/graphql-client-provider';
import './globals.css';
import { Inter } from 'next/font/google';

import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js 13 | Rendering types',
  description: `This web page teaches you how to render different types of pages in Next.js 13 with an adittion of GraphQL with some queries, typescript, metadata, ico, loading, errors, Server side components and much more!.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GQLProvider>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </GQLProvider>
    </html>
  );
}
