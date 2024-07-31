'use client';
import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const SearchSection = ({ accessToken }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('member');
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
        // const response = await fetch('http://KPaas-apigateway-service-1:8888/post/search/word', {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${accessToken}`,
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

  return (
    <StyledWrapper>
      <form id="search-form">
        {/* 검색바 영역 */}
        <div className="wrapper-search-section">
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
          <ul className="autoCompleteDropdown">
            {autoCompleteResults.slice(0, 9).map((item, index) => (
              <li key={index} className="autoCompleteItem">
                <div onClick={() => handleItemSelect(item)}>{item}</div>
                <div className="verticalLine"></div>
              </li>
            ))}
          </ul>
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

  .wrapper-search-section {
    display: flex;
    align-items: center;

    .wrapper-search-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 600px;
      height: 56px;
      border-radius: 40px;
      border: 4px solid #eeeeee;

      .inputSch {
        width: 550px;
        height: 40px;
        margin-left: 10px;
        border: none;
        outline: none;
        background-color: #ffffff;
        padding-left: 20px;
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

  .autoCompleteDropdown {
    top: calc(100% + 10px);
    left: 0;
    width: calc(100% - 2px);
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 999;
  }

  .autoCompleteItem {
    padding: 5px;
    cursor: pointer;
    margin-left: 3%;
    margin-top: 5px;
  }

  .verticalLine {
    border-top: 1px solid #e2e5ef;
    width: 100%;
    height: 1px;
    margin-top: 10px;
    padding: 0%;
  }
`;
