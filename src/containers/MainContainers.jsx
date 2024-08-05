'use client';
import styled from 'styled-components';
import Link from 'next/link';
import MainNavigation from '@compoents/components/layout/main-navigation';
import CategoryComponents from '@compoents/components/minicategory/CategoryComponents';
import Pagination from '@compoents/components/pagination/Paginations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CommuPosts from '@compoents/components/posts/CommuPost';
import SearchSection from '../components/items/SearchSection';
import AnnouncementPolicy from '@compoents/components/main/announcementPolicy/AnnouncementPolicy';
import SendPostButton from '@compoents/components/posts/Interaction/SendPostbtn';

export default function MainContainers({
  postData,
  accessToken,
  role,
  nick_name,
}) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_GROUP_SIZE = 5;

  const handlePageChange = (page) => {
    router.push(`/${page}`);
  };
  const goToPreviousPageGroup = () => {
    setCurrentPage((prev) => prev - PAGE_GROUP_SIZE);
  };
  const goToNextPageGroup = () => {
    setCurrentPage((prev) => prev + PAGE_GROUP_SIZE);
  };

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

  return (
    <StyledWrapper>
      {/* 메인 상단바 */}
      <MainNavigation accessToken={accessToken} />

      {/* 검색 바 */}
      <SearchSection accessToken={accessToken} />

      {/* 메인 배경 이미지 */}
      <img
        src="/images/png/PTSD-main-logo.png"
        alt="메인 이미지"
        className="main-img"
      />

      {/* 공지사항 및 신규정책 */}
      <AnnouncementPolicy />

      {/* 강사 등록 btn 우선 비황성화 */}
      {role === 'ROLE_TEACHER' && <SendPostButton nick_name={nick_name} />}
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

        <CommuPosts
          postData={postData}
          selectedCategory={selectedCategory}
          accessToken={accessToken}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        postData={postData}
        PAGE_GROUP_SIZE={PAGE_GROUP_SIZE}
        handlePageChange={handlePageChange}
        goToPreviousPageGroup={goToPreviousPageGroup}
        goToNextPageGroup={goToNextPageGroup}
      />
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
