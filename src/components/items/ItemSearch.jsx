'use client';
import React, { useState, useRef, useCallback } from 'react';
import { IoSearch } from 'react-icons/io5';
import styles from './ItemSearch.module.css';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const FindEventSection = ({ accessToken }) => {
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
    <form id="search-form" className={styles.SearchForm}>
      <header className={styles.headerd}>
        <select
          onChange={handleSearchTypeChange}
          value={searchType}
          className={styles.selects}
        >
          <option value="product">상품</option>
          <option value="member">회원</option>
        </select>
        <input
          type="search"
          ref={searchElement}
          className={styles.inputSch}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.SchBtn} onClick={handleSubmit}>
          <img
            src="/images/png/header-search.png"
            alt="검색하기 버튼"
            className={styles.SchBtn}
          />
        </button>
      </header>

      {autoCompleteResults.length > 0 && (
        <ul className={styles.autoCompleteDropdown}>
          {autoCompleteResults.slice(0, 9).map((item, index) => (
            <>
              <li
                key={index}
                className={styles.autoCompleteItem}
                onClick={() => handleItemSelect(item)}
              >
                {item}
              </li>
              <div className={styles.verticalLine}></div>
            </>
          ))}
        </ul>
      )}
    </form>
  );
};

export default FindEventSection;
