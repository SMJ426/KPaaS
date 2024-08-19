'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import PostItem from '@compoents/components/posts/post-item';
import MainNavigation from '@compoents/components/layout/main-navigation';

const BASE_URL =
  'http://default-api-gateway-05ed6-25524816-d29a0f7fe317.kr.lb.naverncp.com:8761';

const fetchPosts = async ({ pageParam = 0 }) => {
  const response = await fetch(`${BASE_URL}/post/search?page=${pageParam}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_name: 'post' }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.last) return undefined;
        return pages.length;
      },
      refetchOnWindowFocus: false,
    });

  const allPosts = data ? data.pages.flatMap((page) => page.content) : [];

  return (
    <>
      <MainNavigation />
      <StyledWrapper>
        <h3 className="title-postCard">강사님</h3>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <p>Error fetching data</p>
        ) : (
          <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={<p>모든 게시물을 불러왔습니다.</p>}
          >
            <StyledPostsGrid>
              {allPosts.map((post) => (
                <PostItem
                  key={post.post_id}
                  postData={post}
                  posts={{
                    content: allPosts,
                    pageable: { pageNumber: data.pages.length - 1 },
                  }}
                  accessToken={null} // accessToken 설정 필요
                />
              ))}
            </StyledPostsGrid>
          </InfiniteScroll>
        )}
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  margin-left: 50px;
  .title-postCard {
    font-size: 30px;
    font-family: 'Pretendard';
    padding-bottom: 10px;
    font-weight: 500;
  }
`;

const StyledPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;

  @media (max-width: 2000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1625px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default PostList;
