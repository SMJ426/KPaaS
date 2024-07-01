import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnnouncementTestDataSet } from '../../../constants/AnnouncementTestDataSet';
import AnnouncementRenderer from './AnnouncementRenderer';
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
        <p className="title">공지사항</p>
        {AnnouncementTestDataSet.map((data, index) => (
          <AnnouncementRenderer key={index} announcementData={data} />
        ))}
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
    font-size: 30px;
    border-bottom: 1px solid #eeeeee;
    font-family: 'Pretendard';
    padding-bottom: 10px;
  }

  .wrapper-announcement {
    width: 70%;
    border-right: 2px solid #eeeeee;
    padding-right: 40px;
  }

  .wrapper-policy {
    width: 30%;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    align-items: space-between;

    .wrapper-btns {
      background-color: yellowgreen;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > p {
        border: none;
      }
      .controls {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }

      .controls button {
        font-size: 20px;
        margin: 0 10px;
        padding: 5px 10px;
      }
    }
  }
`;
