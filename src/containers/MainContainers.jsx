'use client';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainNavigation from '@compoents/components/layout/main-navigation';
import CategoryComponents from '@compoents/components/minicategory/CategoryComponents';
import { useState } from 'react';
import CommuPosts from '@compoents/components/posts/CommuPost';
import SearchSection from '../components/items/SearchSection';
import AnnouncementPolicy from '@compoents/components/main/announcementPolicy/AnnouncementPolicy';
import SendPostButton from '@compoents/components/posts/Interaction/SendPostbtn';
import { getPostsFile, LogingetPostsFile } from '@compoents/util/post-util';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';

export default function MainContainers({
  initialPostData,
  accessToken,
  role,
  nick_name,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['posts', !!accessToken, selectedCategories, selectedLocations],
      queryFn: ({ pageParam = 0 }) =>
        accessToken
          ? LogingetPostsFile(
              pageParam,
              encodeURI(nick_name),
              selectedCategories,
              selectedLocations
            )
          : getPostsFile({
              pageParam,
              categories: selectedCategories,
              locations: selectedLocations,
            }),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.last) return undefined;
        return pages.length;
      },
      refetchOnWindowFocus: false,
      initialData: { pages: [initialPostData], pageParams: [0] },
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

  const allPosts = data?.pages.flatMap((page) => page.content) || [];

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledWrapper>
      <MainNavigation accessToken={accessToken} />
      <SearchSection accessToken={accessToken} />

      <div className="wrapper-down-section">
        <AnnouncementPolicy />
        {role === 'ROLE_TEACHER' ? (
          <SendPostButton nick_name={nick_name} />
        ) : (
          <div className="pt-list-title">예약 가능한 장애인 전용 PT 목록</div>
        )}
        <div className="wrapper-body-card">
          <div className="wrapper-cate">
            <CategoryComponents
              handleCategoryChange={handleCategoryChange}
              handleLocationChange={handleLocationChange}
            />
          </div>
          <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="Loading">
                <LoadingIndicator />
              </div>
            }
          >
            <CommuPosts postData={allPosts} accessToken={accessToken} />
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
    display: flex; /* Added flex display */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    flex-direction: column; /* Stack children vertically */
  }

  .main-img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  .wrapper-body-card {
    display: flex;
    height: 100%;
    margin-top: 30px;

    .Loading {
      margin-left: 50%;
    }
  }

  .cateminibtn {
    display: none;
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
.pt-list-title {
  width: 100%; 
  font-size: 24px; 
  font-weight: bold; 
  color: #333; 
  margin: 50px 0 0; 
  text-align: center; 
  background: none; 
  border: 2px solid #e7e7e7; 
  border-radius: 8px; 
  transition: color 0.3s ease, border-color 0.3s ease; 
  font-family: 'Roboto', sans-serif; 
  letter-spacing: 0.5px; 
  padding: 10px; 
}
`;
