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
              onChange={() => handleCategoryChange('3001')}
            />
            <p className="cateTexts">가정방문</p>
          </div>
          <div className="cateMg">
            <input
              type="checkbox"
              id="3002"
              className="Checkboxes"
              onChange={() => handleCategoryChange('3002')}
            />
            <p className="cateTexts">수영장</p>
          </div>
          <div className="cateMg">
            <input
              type="checkbox"
              id="3003"
              className="Checkboxes"
              onChange={() => handleCategoryChange('3003')}
            />
            <p className="cateTexts">헬스장</p>
          </div>
          <div className="cateMg">
            <input
              type="checkbox"
              id="region"
              className="Checkboxes"
              onChange={handleRegionToggle}
            />
            <p className="cateTexts">지역</p>
          </div>
          {isRegionSelected && (
            <div className="subCategories">
              {regionArr.map((region, index) => (
                <div className="cateMg" key={index}>
                  <input
                    type="checkbox"
                    id={`region-${region}`}
                    className="Checkboxes"
                    onChange={() => handleCategoryChange(region)}
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
  width: 120px;
  position: sticky;
  top: 10%;

  .categoryTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    flex-shrink: 0;
    border-radius: 10px 10px 0px 0px;
    border: 1px solid #bec0c6;
    background: #f4f5f9;
    .categoryText {
      color: #191a1c;
      font-family: 'Pretendard Variable';
      font-size: 20px;
      font-weight: bold;
    }
  }

  .categoryForm {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-height: 800px;
    overflow-y: auto;
    border: 1px solid #bec0c6;
    border-top: none;
    background: #fff;
    padding-bottom: 10px;

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
      width: 15px;
      height: 15px;
      border: 1px solid #bec0c6;
    }

    .cateMg {
      display: flex;
      align-items: center;
      justify-content: start;
      margin: 14px 0;
    }

    .cateTexts {
      color: #737a8d;
      font-family: 'Pretendard Variable';
      font-size: 15px;
      font-weight: 500;
      margin-left: 8px;
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
