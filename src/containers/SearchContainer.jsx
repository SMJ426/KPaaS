'use client';

import CategoryComponents from '@compoents/components/minicategory/CategoryComponents';
import Pagination from '@compoents/components/pagination/Paginations';
import Link from 'next/link';
import CommuPosts from '@compoents/components/posts/CommuPost';
import styled from 'styled-components';
import SearchSection from '@compoents/components/items/SearchSection';
import AnnouncementPolicy from '@compoents/components/main/announcementPolicy/AnnouncementPolicy';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchContainer({ postData, accessToken, nick_name }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_GROUP_SIZE = 3;

  const handlePageChange = (page) => {
    router.push(`/${searchTerm}/${page}`);
  };
  const goToPreviousPageGroup = () => {
    setCurrentPage((prev) => prev - PAGE_GROUP_SIZE);
  };
  const goToNextPageGroup = () => {
    setCurrentPage((prev) => prev + PAGE_GROUP_SIZE);
  };

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.id);
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryId ? null : categoryId
    );
  };

  return (
    <StyledWrapper>

      {/* 검색 바 */}
      <SearchSection />

      {/* 메인 배경 이미지 */}
      <img
        src="/images/png/PTSD-main-logo.png"
        alt="메인 이미지"
        className="main-img"
      />

      {/* 공지사항 및 신규정책 */}
      <AnnouncementPolicy />

      {/* 강사 등록 btn 우선 비황성화 */}
      <Link href="/newpost">
        <button className="btn-newpost">
          <div className="Add">강사등록</div>
        </button>
      </Link>

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
          nick_name={nick_name}
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
    margin-top: 150px;
  }

  .cateminibtn {
    display: none;
  }
`;