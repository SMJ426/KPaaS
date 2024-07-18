import React from 'react';
import styled from 'styled-components';
import ChattingListRenderer from './ChattingListRenderer';
import { ChattingListTestDataSet } from './testData/ChattingListTestData';

const testData = ChattingListTestDataSet;

export default function ChatListPanel() {
  return (
    <StyledWrapper>
      <h2 className="userName">유저 이름</h2>
      {testData.map((list, index) => (
        <ChattingListRenderer key={index} listData={list} />
      ))}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 30%;
  height: 100vh;
  overflow-y: auto;
  background-color: skyblue;

  .userName {
    margin-bottom: 30px;
  }
`;
