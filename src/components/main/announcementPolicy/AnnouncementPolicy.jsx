'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnnouncementTestDataSet } from '../../../constants/AnnouncementTestDataSet';
import Mainsmallpage from '../announcementGym/Mainsmallpage';
import PolicyRenderer from './PolicyRenderer';

function AnnouncementPolicy() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPlaying = true;

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === AnnouncementTestDataSet.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? AnnouncementTestDataSet.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === AnnouncementTestDataSet.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <StyledWrapper>
      <div className="wrapper-main">
        <div className="wrapper-announcement">
          <p className="title">내 주변 체육시설 찾기</p>
          <Mainsmallpage />
        </div>

        <div className="wrapper-policy">
          <div className="wrapper-btns">
            <p className="title">체육 복지 프로그램, 제도 안내</p>
          </div>
          <PolicyRenderer policyData={AnnouncementTestDataSet[currentIndex]} />
          <div className="pagination">
            {AnnouncementTestDataSet.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default AnnouncementPolicy;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 40px;

  .title {
    font-size: 24px;
    border-bottom: 2px solid #e7e6e6;
    padding-bottom: 10px;
    margin: 20px auto 0;
    text-align: center;
    font-weight: 500;
  }

  .wrapper-main {
    display: flex;
    width: 100%;
    border: 0;
    width: 100%;
  }

  .wrapper-announcement {
    flex: 7;
    padding-right: 20px;
    background-color: #f5f7fa;
    border-radius: 12px;
    margin-right: 10px;
  }

  .wrapper-policy {
    flex: 3;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch; 
    background-color: #f8f9fb;
    border-radius: 12px;
    margin: 0;
    
    .wrapper-btns {
      width: 100%;
      padding: 0 20px;

      .title {
        width: 100%; 
        border-bottom: 2px solid #e7e6e6;
        margin: 20px 0; 
        padding: 0 0 10px 0; 
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      margin-bottom: 13px;

      .dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background-color: #d3d3d3;
        margin: 0 3px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .dot.active {
        background-color: #000;
        width: 20px;
        border-radius: 10px;
      }
    }
  }

   @media (max-width: 1250px) {
    .title {
      font-size: 20px;
    }
  }

  @media (max-width: 1072px) {
    .title {
      font-size: 17px;
    }
  }
`;