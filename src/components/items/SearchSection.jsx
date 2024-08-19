'use client';
import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const SearchSection = ({ accessToken }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('post');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const searchElement = useRef();

  const AutoSearch = useCallback(
    debounce(async (term) => {
      try {
        if (term.trim() === '') {
          setAutoCompleteResults([]);
          return;
        }
        let endpoint = '';
        if (searchType === 'post') {
          endpoint = `${process.env.NEXT_PUBLIC_API_URL}/post/search/word`;
        } else if (searchType === 'member') {
          endpoint = `${process.env.NEXT_PUBLIC_API_URL}/member/search/word`;
        }
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            word: term,
          }),
        });
        if (!response.ok) {
          throw new Error('Fetch 에러');
        }
        const data = await response.json();
        setAutoCompleteResults(data);
      } catch (error) {
        console.error('자동검색 에러', error);
      }
    }, 500),
    [searchType]
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    AutoSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTerm = searchElement.current.value;
    setSearchTerm(searchTerm);
    if (searchType === 'post') {
      router.push(`/search/${searchTerm}`);
    } else if (searchType === 'member') {
      router.push(`/profile/${searchTerm}`);
    }
  };

  const handleItemSelect = (item) => {
    setSearchTerm(item);
    searchElement.current.value = item;
    setAutoCompleteResults([]);
    if (searchType === 'post') {
      router.push(`/search/${item}`);
    } else if (searchType === 'member') {
      router.push(`/profile/${item}`);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <StyledWrapper>
      <form id="search-form">
        {/* 검색바 영역 */}
        <div className="wrapper-search-section">
          <select
            onChange={handleSearchTypeChange}
            value={searchType}
            className="selects-option"
          >
            <option value="post">상품</option>
            <option value="member">회원</option>
          </select>
          <div className="wrapper-search-bar">
            <input
              type="search"
              ref={searchElement}
              className="inputSch"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="검색어를 입력해주세요"
            />
            <button type="submit" className="btn-search" onClick={handleSubmit}>
              <img
                src="/images/svg/search-bar.svg"
                alt="검색하기 버튼"
                className="btn-search"
              />
            </button>
          </div>
        </div>

        {autoCompleteResults.length > 0 && (
          <AutoCompleteDropdown>
            {autoCompleteResults.slice(0, 9).map((item, index) => (
              <div className='ato'>
              <li key={index} className="autoCompleteItem">
              <img src='/images/svg/search-bar.svg' className='search_btn' />
                <div
                  className="itemContent"
                  onClick={() => handleItemSelect(item)}
                >
                  {item}
                </div>
              </li>
              </div>
            ))}
          </AutoCompleteDropdown>
        )}
      </form>
    </StyledWrapper>
  );
};

export default SearchSection;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 30px 0;
  position: relative;

  .wrapper-search-section {
    display: flex;
    align-items: center;
    width: 600px;
    margin: 0 auto;
}

.selects-option {
   display: flex;
    align-items: center;
    justify-content: space-between; /* 내부 요소 간격 조절 */
    height: 56px;
    border: 4px solid #eeeeee;
    border-right: none;
    border-radius: 40px 0 0 40px;
    padding: 0 5px 0 23px;
    background-color: #ffffff;
    width: 80px;
}

.wrapper-search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    height: 56px;
    border: 4px solid #eeeeee;
    border-left: none;
    border-radius: 0 40px 40px 0;
    background-color: #ffffff;
}

.inputSch {
    flex-grow: 1;
    height: 40px;
    border: none;
    outline: none;
    background-color: transparent;
    padding-left: 40px;
    font-size: 16px;
    color: #5a6a72;
}
      .inputSch::placeholder {
        display: flex;
        align-items: center;
        color: #5a6a72;
        font-size: 16px;
      }

      .btn-search {
        width: 32px;
        height: 32px;
        margin-right: 15px;
        border: none;
        cursor: pointer;
        background-color: #ffffff;
      }
    }
  }
`;

const AutoCompleteDropdown = styled.ul`
  position: absolute;
  top: 100%;
  margin-left: 80px;
  width: 500px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 10;
  

  .ato{
  display: flex;
    &:hover{
      background-color: #f0f0f0;
    }
  }
  

  .autoCompleteItem {
    display: flex;
  }

  .search_btn {
    padding: 10px 8px 8px 15px;
  }

  .itemContent {
    cursor: pointer;
    font-size: 14px;
    padding: 17px 20px 0 10px;
  }
`;
