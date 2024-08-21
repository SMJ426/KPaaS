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
  position: sticky;
  top: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 15px;
  background-color: #ffffff;

  height: 64px;
  border-bottom: 1px solid #eaebee;

  .post-image {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    object-fit: cover;
    object-position: center;
    border: 1px solid #dcdee3;
  }
  .wrapper-post-info {
    display: flex;
    flex-direction: column;

    .info-post {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }

    .price-post {
      font-weight: bold;
    }
  }
`;
