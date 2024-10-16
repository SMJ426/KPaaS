'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchSection from '@compoents/components/items/SearchSection';
import AnnouncementPolicy from '@compoents/components/main/announcementPolicy/AnnouncementPolicy';
import SendPostButton from '@compoents/components/posts/Interaction/SendPostbtn';
import CategoryComponents from '@compoents/components/minicategory/CategoryComponents';
import CommuPosts from '@compoents/components/posts/CommuPost';
import styled from 'styled-components';
import {
  fetchProductName,
  LoginfetchProductName,
} from '@compoents/util/search-util';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';

export default function SearchContainer({
  initialSearchResults,
  searchTerm,
  accessToken,
  role,
  nick_name,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts', !!accessToken, selectedCategories, selectedLocations],
    queryFn: ({ pageParam = 0 }) =>
      accessToken
        ? LoginfetchProductName(
            pageParam,
            searchTerm,
            nick_name,
            selectedCategories,
            selectedLocations
          )
        : fetchProductName({
            pageParam,
            searchTerm,
            categories: selectedCategories,
            locations: selectedLocations,
          }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.last ? undefined : pages.length;
    },
    refetchOnWindowFocus: false,
    initialData: { pages: [initialSearchResults], pageParams: [0] },
  });

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allResults = data?.pages.flatMap((page) => page.content) || [];

  return (
    <StyledWrapper>
      <SearchSection />
      <div className="wrapper-down-section">
        <AnnouncementPolicy />
        <div className="action-section">
          {role === 'ROLE_TEACHER' ? (
            <SendPostButton nick_name={nick_name} />
          ) : (
            <div className="pt-list-title">예약 가능한 장애인 전용 PT 목록</div>
          )}
        </div>
        <div className="wrapper-body-card">
          <div className="wrapper-cate">
            <CategoryComponents
              handleCategoryChange={handleCategoryChange}
              handleLocationChange={handleLocationChange}
            />
          </div>
          <InfiniteScroll
            dataLength={allResults.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="Loading">
                <LoadingIndicator />
              </div>
            }
          >
            <CommuPosts postData={allResults} accessToken={accessToken} />
          </InfiniteScroll>
        </div>
        <button className="TopBtn" onClick={MoveToTop}>
          <img src="/images/png/top1.png" alt="맨위로" />
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .wrapper-down-section {
    padding: 0 5%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .action-section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin: 20px 0;
    width: 100%;
  }

  .pt-list-title {
    width: 100%;
    font-size: 24px; 
    font-weight: bold; 
    color: #333; 
     margin: 20px 0 0; 
    text-align: center; 
    background: none; 
    border: 2px solid #e7e7e7; 
    border-radius: 8px; 
    transition: color 0.3s ease, border-color 0.3s ease; 
    font-family: 'Roboto', sans-serif; 
    letter-spacing: 0.5px; 
    padding: 10px; 
  }

  .wrapper-body-card {
    display: flex; 
     height: 100%;
    margin-top: 30px;
    .Loading {
      margin-left: 50%;
    }
  }

  .TopBtn {
    position: fixed;
    bottom: 10%;
    right: 0;
    background: none;
    border: none;
    z-index: 8;
    height: 50px;
    border-radius: 9px;
    margin-right: 50px;
    cursor: pointer;

    img {
      width: 50px;
      height: 50px;
    }
  }
`;