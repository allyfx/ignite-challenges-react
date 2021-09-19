/* eslint-disable no-return-await */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      if (pageParam !== null)
        return await api.get('/api/images', {
          params: {
            after: pageParam,
          },
        });
      return await api.get('/api/images');
    },
    {
      getNextPageParam: (lastPage, page) => lastPage.data.after,
    }
  );

  const formattedData = useMemo(() => {
    const images: any[] = [];

    if (data) {
      data.pages.map(page => {
        return page.data.data.map(image => images.push(image));
      });
    }

    return images;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            mt={40}
            onClick={() => {
              fetchNextPage();
            }}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
