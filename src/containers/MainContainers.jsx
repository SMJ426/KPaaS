'use client';
import styled from 'styled-components';
import MainNavigation from '@compoents/components/layout/main-navigation';
import { FaPen } from 'react-icons/fa6';
import Link from 'next/link';
import MiniCategoryComponents from '@compoents/components/minicategory/Minicategory';
import CategoryComponents from '@compoents/components/minicategory/Category';
import Pagination from '@compoents/components/pagination/Paginations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CommuPosts from '@compoents/components/posts/commu-post';
import SearchSection from '../components/items/SearchSection';

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
      <MainNavigation accessToken={accessToken} />

      <div className="between-section">
        <div className="search-bar">
          <SearchSection accessToken={accessToken} />
        </div>
      </div>

      <div className="wrapper-body">
        <div className="wrapper-btn">
          <Link href="/newpost">
            <button className="btn-newpost">
              <FaPen className="pencli" />
              <div className="Add">강사등록</div>
            </button>
          </Link>
        </div>

        <div className="cateSticky">
          <CategoryComponents handleCategoryChange={handleCategoryChange} />
          <MiniCategoryComponents
            className="cateminibtn"
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <CommuPosts
          postData={postData}
          selectedCategory={selectedCategory}
          accessToken={accessToken}
          nick_name={nick_name}
        />

        <Pagination
          currentPage={currentPage}
          postData={postData}
          PAGE_GROUP_SIZE={PAGE_GROUP_SIZE}
          handlePageChange={handlePageChange}
          goToPreviousPageGroup={goToPreviousPageGroup}
          goToNextPageGroup={goToNextPageGroup}
        />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .between-section {
    background-image: url('/images/png/main-page.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 740px;

    .search-bar {
    }
  }

  .wrapper-btn {
    position: absolute;
    right: 1px;
    margin-bottom: 20px;
    margin-top: -100px;
  }

  .btn-newpost {
    display: flex;
    margin-top: 10px;
    height: 48px;
    padding: 15px 18px;
    font-size: 16px;
    background-color: #9ebbc3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .pencli {
    margin-top: 2px;
  }
  .Add {
    margin-left: 15px;
    font-family: 'Pretendard Variable';
  }

  .btn-newpost:hover {
    background-color: #45a049;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .cateminibtn {
    display: none;
  }

  .cateSticky {
    position: sticky;
    top: 150px;
  }

  @media screen and (max-width: 786px) {
    .cateminibtn {
      display: flex;
      text-align: center;
    }

    .pageContainer {
      background: #f3f5fa;
      height: 200%;
    }

    .flexSection1 {
      height: 246px;
      background: #456ae2;
      border: 0;
    }

    .flexSection2 {
      background: #f3f5fa;
      position: relative;
      margin-top: 0px;
    }

    .wrapper-btn {
      position: absolute;
      right: 0px;
      margin-top: -50px;
    }

    .btn-newpost {
      padding: 5px 10px;
      font-size: 16px;
      background-color: #9ebbc3;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      height: auto;
    }

    .btn-newpost:hover {
      background-color: #45a049;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .cateSticky {
      position: sticky;
      top: 70px;
      z-index: 1;
    }
  }
`;
