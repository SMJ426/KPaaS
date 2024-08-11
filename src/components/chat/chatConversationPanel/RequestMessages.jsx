import React from 'react';
import styled from 'styled-components';

function RequestMessages({ requestMessages, userInfo }) {
  return (
    <StyledWrapper>
      <p>
        {userInfo.user_name}:{requestMessages.content}
      </p>
    </StyledWrapper>
  );
}

export default RequestMessages;

const StyledWrapper = styled.div`
  background-color: skyblue;
`;