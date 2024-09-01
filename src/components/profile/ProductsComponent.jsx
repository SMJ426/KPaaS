'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommuPosts from '../posts/CommuPost';
import styled from 'styled-components';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';
import { getSelling } from '@compoents/util/http';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

export default function ProductsComponent({ initialProducts, accessToken, nick_name }) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['selling-products', nick_name],
      queryFn: async ({ pageParam = 0 }) => {
        if (pageParam === 0 && initialProducts) {
          return initialProducts;
        }
        const result = await getSelling(nick_name, pageParam);
        console.log(result)
        return result;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.last || !lastPage.content || lastPage.content.length === 0) {
          return undefined;
        }
        const nextPage = lastPage.number + 1;
        return nextPage;
      },
      refetchOnWindowFocus: false,
      initialData: initialProducts 
        ? { pages: [initialProducts], pageParams: [0] } 
        : undefined,
      enabled: isClient,
    });

  const allProducts = data?.pages.flatMap((page) => page.content) || [];

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <StyledWrapper>
      <section className="section">
        <InfiniteScroll
          dataLength={allProducts.length}
          next={handleLoadMore}
          hasMore={hasNextPage}
          loader={
            <div className="Loading">
              <LoadingIndicator />
            </div>
          }
        >
          <CommuPosts postData={allProducts} accessToken={accessToken} />
        </InfiniteScroll>
      </section>
    </StyledWrapper>
  );
}

ProductsComponent.propTypes = {
  initialProducts: PropTypes.object,
  accessToken: PropTypes.string.isRequired,
  nick_name: PropTypes.string.isRequired,
};

const StyledWrapper = styled.header`
  .section {
    min-height: 100vh;
  }
  .Loading {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  @media screen and (max-width: 786px) {
    .section {
      margin-top: 0;
      margin-left: 0;
    }
  }
`;