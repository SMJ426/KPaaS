import React from 'react';
import styled from 'styled-components';

function NoChattingPartner() {
  return (
    <StyledWrapper>
      <img src="/svgs/chat_of_no_partner.svg" alt="채팅 상대방을 고르세요" />
      <p>채팅할 상대를 선택해주세요.</p>
    </StyledWrapper>
  );
}

export default NoChattingPartner;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 34px;

  height: 100%;
  width: 800px;
  border: 1px solid #eaebee;
  border-left: none;

  img {
    width: 96px;
    height: 81px;
  }

  p {
    font-family: 'Pretendard';
    font-size: 14px;
    color: #4d5159;
  }
`;
