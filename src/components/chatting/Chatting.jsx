import React from 'react';
import styled from 'styled-components';

function Chatting() {
  return (
    <StyledWrapper>
      <img src="/images/png/icon-message-circle.png" alt="채팅 이모티콘" />
    </StyledWrapper>
  );
}

export default Chatting;

const StyledWrapper = styled.div`
  border: none;
  background-color: #ffffff;
  img {
    width: 20px;
    height: 20px;
  }
`;
