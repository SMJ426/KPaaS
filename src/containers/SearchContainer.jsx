'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchSection from '@compoents/components/items/SearchSection';
import AnnouncementPolicy from '@compoents/components/main/announcementPolicy/AnnouncementPolicy';
import CategoryComponents from '@compoents/components/minicategory/CategoryComponents';
import CommuPosts from '@compoents/components/posts/CommuPost';
import styled from 'styled-components';
import { fetchProductName, LoginfetchProductName } from '@compoents/util/search-util';

export default function SearchContainer({ initialSearchResults, searchTerm, accessToken, role, nick_name }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', !!accessToken],
    queryFn: ({ pageParam = 0 }) => 
      accessToken 
        ? LoginfetchProductName(pageParam, searchTerm, nick_name)
        : fetchProductName({ pageParam, searchTerm }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.last) return undefined;
      return pages.length;  
    },
    refetchOnWindowFocus: false,
    initialData: { pages: [initialSearchResults], pageParams: [0] },
  });

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.id);
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryId ? null : categoryId
    );
  };

  const allResults = data?.pages.flatMap(page => page.content) || [];

  return (
    <StyledWrapper>
      <SearchSection />
      <img
        src="/images/png/PTSD-main-logo.png"
        alt="메인 이미지"
        className="main-img"
      />
      <AnnouncementPolicy />
      <div className="wrapper-body-card">
        <div className="wrapper-cate">
          <CategoryComponents handleCategoryChange={handleCategoryChange} />
          {/* 필터 기능 우선 비활성화 */}
          {/* <MiniCategoryComponents
            className="cateminibtn"
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          /> */}
        </div>
        <InfiniteScroll
          dataLength={allResults.length}
          next={() => {
            console.log('Fetching next page');
            return fetchNextPage();
          }}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
          endMessage={<p>모든 검색 결과를 불러왔습니다.</p>}
        >
          <CommuPosts
            postData={allResults}
            selectedCategory={selectedCategory}
            accessToken={accessToken}
          />
        </InfiniteScroll>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .main-img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  .wrapper-body-card {
    display: flex;
    height: 100%;
    margin-top: 150px;
  }

  .cateminibtn {
    display: none;
  }
`;
