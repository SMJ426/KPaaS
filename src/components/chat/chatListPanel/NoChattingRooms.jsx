import React from 'react';
import styled from 'styled-components';

function NoChattingRooms() {
  return (
    <StyledWrapper>
      <p>채팅 목록이 비어있어요.</p>
      <span>PTFD에서 신규강의 강사 또는</span>
      <span>인기 강사와 채팅을 시작해보세요.</span>
    </StyledWrapper>
  );
}

export default NoChattingRooms;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  font-family: 'Pretendard';
  color: #4d5159;

  p {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
  }

  span {
    font-size: 14px;
    line-height: 150%;
  }
`;
