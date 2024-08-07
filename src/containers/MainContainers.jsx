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

export default function MainContainers({ initialPostData, accessToken, role, nick_name }) {
  const [selectedCategory, setSelectedCategory] = useState([]);

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
        ? LogingetPostsFile(pageParam, encodeURI(nick_name))
        : getPostsFile({ pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.last) return undefined;
      return pages.length;  // 페이지 배열의 길이를 반환하여 다음 페이지 번호로 사용
    },
    refetchOnWindowFocus: false,
    initialData: { pages: [initialPostData], pageParams: [0] },
  });

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.id);
    if (Array.isArray(selectedCategory)) {
      if (selectedCategory.includes(categoryId)) {
        setSelectedCategory((prevCategories) =>
          prevCategories.filter((id) => id !== categoryId)
        );
      } else {
        setSelectedCategory((prevCategories) => [
          ...prevCategories,
          categoryId,
        ]);
      }
    } else {
      setSelectedCategory([categoryId]);
    }
  };

  const allPosts = data?.pages.flatMap(page => page.content) || [];


  return (
    <StyledWrapper>
      <MainNavigation accessToken={accessToken} />
      <SearchSection accessToken={accessToken} />
      <img
        src="/images/png/PTSD-main-logo.png"
        alt="메인 이미지"
        className="main-img"
      />
      <AnnouncementPolicy />
      {role === 'ROLE_TEACHER' && <SendPostButton nick_name={nick_name} />}
      <div className="wrapper-body-card">
        <div className="wrapper-cate">
          <CategoryComponents handleCategoryChange={handleCategoryChange} />
        </div>
        <InfiniteScroll
          dataLength={allPosts.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
          endMessage={<p>모든 게시물을 불러왔습니다.</p>}
        >
          <CommuPosts
            postData={allPosts}
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
    margin-top: 50px;
  }

  .cateminibtn {
    display: none;
  }
`;
