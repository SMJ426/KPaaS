import React from 'react';
import styled from 'styled-components';

function ReceivedMessages({ receiveMessages }) {
  return (
    <StyledWrapper>
      <p>
        {receiveMessages.sender.nick_name}:{receiveMessages.content}
      </p>
    </StyledWrapper>
  );
}

export default ReceivedMessages;

const StyledWrapper = styled.div`
  background-color: yellowgreen;
`;
