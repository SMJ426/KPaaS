'use client';
import styled from 'styled-components';
import MainNavigation from '@compoents/components/layout/main-navigation';
import MiniCategoryComponents from '@compoents/components/minicategory/Minicategory';
import CategoryComponents from '@compoents/components/minicategory/CategoryComponents';
import Pagination from '@compoents/components/pagination/Paginations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CommuPosts from '@compoents/components/posts/CommuPost';
import SearchSection from '../components/items/SearchSection';
import AnnouncementPolicy from '@compoents/components/main/announcementPolicy/AnnouncementPolicy';

export default function MainContainers({ postData, accessToken, nick_name }) {
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
        src="/images/png/main-page.png"
        alt="메인 이미지"
        className="main-img"
      />

      {/* 공지사항 및 신규정책 */}
      <AnnouncementPolicy />

      {/* 강사 등록 btn 우선 비황성화 */}
      {/* <Link href="/newpost">
        <button className="btn-newpost">
          <FaPen className="pencli" />
          <div className="Add">강사등록</div>
        </button>
      </Link> */}

      <CommuPosts
        postData={postData}
        selectedCategory={selectedCategory}
        accessToken={accessToken}
        nick_name={nick_name}
      />

      <div className="cateSticky">
        <CategoryComponents handleCategoryChange={handleCategoryChange} />
        <MiniCategoryComponents
          className="cateminibtn"
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
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

  .cateSticky {
    width: 180px;
    position: sticky;
    top: 10%;
  }

  .cateminibtn {
    display: none;
  }
`;
