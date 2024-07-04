import React, { useState } from 'react';
import styled from 'styled-components';

export default function CategoryComponents({ handleCategoryChange }) {
  const [isRegionSelected, setIsRegionSelected] = useState(false);

  const handleRegionToggle = () => {
    setIsRegionSelected(!isRegionSelected);
  };

  const regionArr = [
    '서울 강서',
    '서울 강동',
    '서울 강북',
    '서울 강남',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '경기도',
    '강원도',
    '충청도',
    '전라도',
  ];

  return (
    <StyledWrapper>
      <div className="categoryTitle">
        <p className="categoryText">카테고리</p>
      </div>
      <form className="categoryForm">
        <div className="categoryContainer">
          <div className="cateMg">
            <input
              type="checkbox"
              id="3001"
              className="Checkboxes"
              onChange={handleCategoryChange}
            />
            <p className="cateTexts">가정방문</p>
          </div>
          <div className="cateMg">
            <input
              type="checkbox"
              id="3002"
              className="Checkboxes"
              onChange={handleCategoryChange}
            />
            <p className="cateTexts">수영장</p>
          </div>
          <div className="cateMg">
            <input
              type="checkbox"
              id="3003"
              className="Checkboxes"
              onChange={handleCategoryChange}
            />
            <p className="cateTexts">헬스장</p>
          </div>
          <div className="cateMg">
            <input
              type="checkbox"
              id="3004"
              className="Checkboxes"
              onChange={(e) => {
                handleCategoryChange(e);
                handleRegionToggle();
              }}
            />
            <p className="cateTexts">지역</p>
          </div>
          {isRegionSelected && (
            <div className="subCategories">
              {regionArr.map((region, index) => (
                <div className="cateMg" key={index}>
                  <input
                    type="checkbox"
                    id={`region-${index}`}
                    className="Checkboxes"
                    onChange={handleCategoryChange}
                  />
                  <p className="cateTexts">{region}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  padding-top: 150px;

  .categoryTitle {
    height: 60px;
    flex-shrink: 0;
    border-radius: 10px 10px 0px 0px;
    border: 1px solid #bec0c6;
    background: #f4f5f9;
    .categoryText {
      color: #191a1c;
      font-family: 'Pretendard Variable';
      font-size: 20px;
      font-weight: 600;
      padding-left: 20px;
      padding-top: 18px;
    }
  }

  .categoryForm {
    max-height: 800px;
    overflow-y: auto;
    border: 1px solid #bec0c6;
    border-top: none;
    background: #fff;
    padding-bottom: 29px;

    /* 이 아래 부분은 스크롤 커스텀 디자인 */
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
    &:hover::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    .Checkboxes {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      border: 1px solid #bec0c6;
      margin-top: 30px;
      margin-left: 20px;
    }

    .cateMg {
      display: flex;
      align-items: center;
    }

    .cateTexts {
      color: #737a8d;
      font-family: 'Pretendard Variable';
      font-size: 16px;
      font-weight: 500;
      margin-left: 8px;
      margin-top: 29px;
    }
  }

  .subCategories {
    padding-left: 15px;
    display: flex;
    flex-direction: column;

    .cateMg {
      margin-top: 10px;
    }
    .cateTexts {
      /* margin-top: 10px; */
    }
  }
`;
