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
          <p className="titles">내 주변 체육시설 찾기</p>
          <Mainsmallpage />
        </div>

        <div className="wrapper-policy">
          <div className="wrapper-btns">
            <p className="titles">체육 복지 프로그램, 제도 안내</p>
          </div>
          <PolicyRenderer policyData={AnnouncementTestDataSet[currentIndex]} />
          <div className="wrapper-btnns">
            <button className="slide-btn left-btn" onClick={handlePrev}>
              ◀︎
            </button>
            <div className="pagination">
              {AnnouncementTestDataSet.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                ></span>
              ))}
            </div>
            <button className="slide-btn right-btn" onClick={handleNext}>
              ▶
            </button>
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

  .titles-es {
    font-size: 20px;
    text-align: center;
    font-weight: 500;
    margin-top: 20px;
  }

  .titles {
    font-size: 20px;
    border-bottom: 2px solid #e7e6e6;
    padding-bottom: 10px;
    margin-top: 20px;
    margin-left: 35px;
    margin-bottom: 0px;
    font-weight: 500;
  }

  .wrapper-main {
    display: flex;
    width: 100%;
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

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f7fa;
    border-radius: 12px;

    > .wrapper-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      > p {
        border-bottom: 2px solid #e7e6e6;
        margin: 20px 35px 0px;
        width: calc(100% - 70px);
        text-align: center;
      }
    }

    > .wrapper-btnns {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;

      margin-bottom: 15px;

      .slide-btn {
        width: 20px;
        height: 20px;
        font-size: 20px;

        background-color: #f5f7fa;
        border: none;
        color: black;
        user-select: none;
        cursor: pointer;
      }

      > .left-btn {
        margin-right: 2px;
      }

      > .right-btn {
        margin-left: 2px;
      }

      > .pagination {
        display: flex;
        justify-content: center;
        align-items: center;

        > .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #c6c6c6;
          margin: 0 3px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        > .dot.active {
          background-color: #000;
          width: 23px;
          border-radius: 10px;
        }
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
