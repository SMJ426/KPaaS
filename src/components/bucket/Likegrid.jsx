'use client';
import React from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LikeList } from '@compoents/util/post-util';
import LikeListComponent from './LikeLists';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';

export default function LikegridComponent({ nick_name, accessToken }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
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

  if (status === 'loading') return <LoadingIndicator />;
  if (status === 'error') return <p>에러가 발생했습니다.</p>;

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
    margin-left: 150px;
    width: 100%;
    margin-bottom: 5%;
    min-height: 100vh;
  }

  .postsGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
  }

  @media screen and (max-width: 768px) {
    .section {
      margin-top: 0;
      margin-left: 5%;
      width: 95%;
    }

    .postsGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 1200px) {
    .postsGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 480px) {
    .postsGrid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;