'use client';
import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const SearchSection = ({ accessToken }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('product');
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
        if (searchType === 'product') {
          endpoint = 'http://localhost:8888/product/search/word';
        } else if (searchType === 'member') {
          endpoint = 'http://localhost:8888/member/search/word';
        }
        // const response = await fetch('http://KPaas-apigateway-service-1:8888/product/search/word', {
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
    if (searchType === 'product') {
      router.push(`/search/${searchTerm}`);
    } else if (searchType === 'member') {
      router.push(`/profile/${searchTerm}`);
    }
  };

  const handleItemSelect = (item) => {
    setSearchTerm(item);
    searchElement.current.value = item;
    setAutoCompleteResults([]);
    if (searchType === 'product') {
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
        <div className="headerd">
          <select
            onChange={handleSearchTypeChange}
            value={searchType}
            className="selects"
          >
            <option value="product">상품</option>
            <option value="member">회원</option>
          </select>
          <input
            type="search"
            ref={searchElement}
            className="inputSch"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit" className="SchBtn" onClick={handleSubmit}>
            <img
              src="/images/png/header-search.png"
              alt="검색하기 버튼"
              className="SchBtn"
            />
          </button>
        </div>

        {autoCompleteResults.length > 0 && (
          <ul className="autoCompleteDropdown">
            {autoCompleteResults.slice(0, 9).map((item, index) => (
              <>
                <li
                  key={index}
                  className="autoCompleteItem"
                  onClick={() => handleItemSelect(item)}
                >
                  {item}
                </li>
                <div className="verticalLine"></div>
              </>
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

  width: 65%;

  .headerd {
    display: flex;
    align-items: center;
    justify-content: center;

    .selects {
      width: 10%;
      height: 48px;
      border: none;
      border-radius: 10px;
      background: var(--gray-200, #f4f5f9);
      padding-left: 10px;
      margin-right: 10px;
      font-family: 'Pretendard Variable';
    }
  }

  .inputSch {
    width: 100%;
    height: 48px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: var(--gray-200, #f4f5f9);
    padding-left: 20px;
  }

  .SchBtn {
    width: 30px;
    height: 30px;
    border: none;
    cursor: pointer;

    .searchIcon {
      width: 30px;
      height: 30px;
    }
  }

  .autoCompleteDropdown {
    position: absolute;
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

  @media screen and (max-width: 786px) {
    .searchWrapper {
      position: relative;
      width: 80%;
    }

    .SearchForm {
      position: relative;
      width: 65%;
      margin-left: 5%;
    }

    .headerd {
      position: relative;
      height: 48px;
      width: 100%;
    }

    .selects {
      width: 20%;
      height: 28px;
      border: 3px solid #4a5ab9;
      border-radius: 10px;
      background: var(--gray-200, #f4f5f9);
      padding-left: 2px;
      margin-right: 0px;
      margin-left: 25px;
      margin-right: 10px;
      font-family: 'Pretendard Variable';
      font-size: 10px;
    }

    .inputSch {
      width: 80%;
      height: 28px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 0px;
      padding-left: 25px;
    }

    .SchBtn {
      width: 24px;
      height: 20px;
      border: none;
      cursor: pointer;
      margin-left: -25px;
      margin-top: 2px;
    }

    .autoCompleteDropdown {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      width: 100%;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      z-index: 999;
    }

    .autoCompleteItem {
      padding: 10px;
      cursor: pointer;
    }
  }
`;
