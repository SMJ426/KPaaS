import React from 'react';
import styled from 'styled-components';

function ChatClassOverview({ postData }) {
  const formattedPrice = `${postData?.price.toLocaleString()}원`;

  return (
    <StyledWrapper>
      <img
        src={postData?.image_post}
        alt="상품 이미지"
        className="post-image"
      />
      <div className="wrapper-post-info">
        <span className="info-post">{postData?.post_info}</span>
        <span className="price-post">{formattedPrice}</span>
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
