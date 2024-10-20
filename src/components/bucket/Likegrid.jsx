'use client';
import React from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LikeList } from '@compoents/util/post-util';
import LikeListComponent from './LikeLists';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';
import NoLikePT from './NoLikePT';

export default function LikegridComponent({ nick_name, accessToken }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['userLikes', nick_name],
    queryFn: ({ pageParam = 0 }) => LikeList(nick_name, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.last || lastPage.number >= lastPage.totalPages - 1) {
        return undefined;
      }
      return lastPage.number + 1;
    },
    enabled: !!accessToken,
  });

  const allLikes = data?.pages.flatMap((page) => page.content) || [];
  const noLikePT = allLikes.length === 0;

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <p>에러가 발생했습니다.</p>;
  if (noLikePT) return <NoLikePT />;

  return (
    <StyledWrapper>
      <section className="section">
        <InfiniteScroll
          dataLength={allLikes.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<LoadingIndicator />}
        >
          <ul className="postsGrid">
            {allLikes.map((like, index) => (
              <LikeListComponent
                key={`${like.id}-${index}`}
                nick_name={nick_name}
                like={like}
                accessToken={accessToken}
              />
            ))}
          </ul>
        </InfiniteScroll>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  .section {
    margin-top: 100px;
    margin-left: 20px;
    width: 100%;
  }

  .postsGrid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 24px;

    @media (max-width: 2000px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 1640px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1320px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 550px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
