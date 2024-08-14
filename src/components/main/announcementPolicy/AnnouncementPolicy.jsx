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
      <div className="wrapper-announcement">
        <p className="title">내 주변 체육시설 찾기</p>
        <Mainsmallpage />
      </div>

      <div className="wrapper-policy">
        <div className="wrapper-btns">
          <p className="title">신규정책</p>
          <div className="controls">
            <button onClick={handlePrev}>{'<'}</button>
            <button onClick={handleNext}>{'>'}</button>
          </div>
        </div>
        <PolicyRenderer policyData={AnnouncementTestDataSet[currentIndex]} />
      </div>
    </StyledWrapper>
  );
}

export default AnnouncementPolicy;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 80px;

  .title {
    font-size: 24px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .wrapper-announcement {
    width: 70%;
    padding-right: 40px;
    border-right: 2px solid #eee;
  }

  .wrapper-policy {
    width: 30%;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    align-items: space-between;

    .wrapper-btns {
      display: flex;
      justify-content: space-between;

      > p {
        border: none;
      }
      .controls {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .controls button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        background-color: #ffffff;
        border: none;

        font-size: 20px;
      }
    }
  }
`;
