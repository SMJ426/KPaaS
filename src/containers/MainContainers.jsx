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
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledWrapper>
      <MainNavigation accessToken={accessToken} />
      <SearchSection accessToken={accessToken} />
      {/* <img
        src="/images/png/PTSD-main-logo.png"
        alt="메인 이미지"
        className="main-img"
      /> */}
      <AnnouncementPolicy />
      {role === 'ROLE_TEACHER' && <SendPostButton nick_name={nick_name} />}
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

  .main-img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  .wrapper-body-card {
    display: flex;
    height: 100%;
    margin-top: 50px;

    .Loading {
      margin-left: 50%;
    }
    .TopBtn {
      display: flex;
      position: sticky;
      top: 90%;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 1000;
      height: 50px;
      border-radius: 9px;
      margin-left: 50px;

      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .cateminibtn {
    display: none;
  }
`;
