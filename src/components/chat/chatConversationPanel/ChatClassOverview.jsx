import React from 'react';
import styled from 'styled-components';

function ChatClassOverview() {
  return (
    <StyledWrapper>
      <img
        src="https://via.placeholder.com/40"
        alt="test image"
        className="post-image"
      />
      <div className="wrapper-post-info">
        <span className="info-post">This is a sample post info</span>
        <span className="price-post">900,000원</span>
      </div>
    </StyledWrapper>
  );
}

export default ChatClassOverview;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 15px;

  height: 64px;
  border-bottom: 1px solid #eaebee;

  .post-image {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  .wrapper-post-info {
    display: flex;
    flex-direction: column;

    .info-post {
    }

    .price-post {
      font-weight: bold;
    }
  }
`;
