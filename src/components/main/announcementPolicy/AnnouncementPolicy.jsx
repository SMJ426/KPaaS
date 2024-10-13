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
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 0px;
    font-weight: 500;
  }

  .wrapper-main {
    display: flex;
    border: 0;
  }

  .wrapper-announcement {
    width: 70%;
    padding-right: 40px;
    background-color: #f5f7fa;
    border-radius: 12px;
    margin-right: 10px;
  }

  .wrapper-policy {
    width: 30%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    background-color: #eef1f5;
    border-radius: 12px;

    .wrapper-btns {
      display: flex;

      > p {
        border: none;
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
`;
