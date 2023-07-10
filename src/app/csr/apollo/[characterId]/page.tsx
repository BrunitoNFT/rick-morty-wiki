import CharacterGQL from '@/components/CharacterGQL';

interface Props {
  params: {
    characterId: string;
  };
}

export async function generateMetadata({ params }: Props) {
  return {
    title: 'CSR | ' + params?.characterId,
    description:
      'Complete tutorial of how to use CSR (Client Side Rendering) in Next.js in Rick and Morty with the character n°' +
      params?.characterId,
  };
}

const Page = ({ params }: Props) => {
  return <CharacterGQL id={params.characterId} />;
};

export default Page;
