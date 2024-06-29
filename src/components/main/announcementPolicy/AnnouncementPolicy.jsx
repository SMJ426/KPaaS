import React from 'react';
import styled from 'styled-components';
import { AnnouncementTestDataSet } from '@compoents/constants/AnnouncementTestDataSet';
import AnnouncementRenderer from './AnnouncementRenderer';
import PolicyRenderer from './PolicyRenderer';

function AnnouncementPolicy() {
  return (
    <StyledWrapper>
      <div className="wrapper-announcement">
        <p className="title">공지사항</p>
        {AnnouncementTestDataSet.map((data, index) => (
          <AnnouncementRenderer key={data.desc} announcementData={data} />
        ))}
      </div>

      <div className="wrapper-policy">
        <p className="title">신규정책</p>
        {AnnouncementTestDataSet.map((data, index))}
        <PolicyRenderer />
      </div>
    </StyledWrapper>
  );
}

export default AnnouncementPolicy;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 272px;
  margin-top: 80px;

  .title {
    font-size: 30px;
    border-bottom: 1px solid #eeeeee;
    font-family: 'Pretendard';
    padding-bottom: 10px;
  }

  .wrapper-announcement {
    display: flex;
    flex-direction: column;

    width: 70%;
    border-right: 2px solid #eeeeee;
    padding-right: 40px;
  }

  .wrapper-policy {
    background-color: yellowgreen;
    display: flex;
    width: 30%;
    justify-content: center;
    padding-left: 40px;
  }
`;
