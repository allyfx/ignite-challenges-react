import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [imageUrl, setImageUrl] = useState('');

  function handleViewImage(url: string): void {
    setImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing={40}>
        {cards.map(card => (
          <Card key={card.id} viewImage={handleViewImage} data={card} />
        ))}
      </SimpleGrid>

      <ModalViewImage imgUrl={imageUrl} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
