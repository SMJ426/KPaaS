import Chatting from '@compoents/components/chatting/Chatting';
import ChoosePayModal from '@compoents/components/payment/ChoosePay';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useDropdown } from '@compoents/components/payment/payDropdown';

export default function ActionButtons({
  likedBtnSrc,
  handleLikeClick,
  accessToken,
  postId,
  post,
}) {
  const { showDropdown, handleOpenDropdown, dropdownRef } = useDropdown();

  return (
    <StyledWrapper>
      <button className="btn-like" onClick={handleLikeClick}>
        <img src={likedBtnSrc} alt="좋아요 버튼" />
      </button>
      <Chatting />
      <div className="dropdown-container" ref={dropdownRef}>
        <button onClick={handleOpenDropdown} className="btn-choose">
          <img src="/images/svg/icon-shopping-cart.svg" alt="구매하기" />
        </button>
        {showDropdown && (
          <ChoosePayModal
            accessToken={accessToken}
            postId={postId}
            post={post}
          />
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  display: flex;
  gap: 9px;

  .btn-like {
    background-color: #ffffff;
    border: none;
    > img {
      width: 20px;
      height: 20px;
    }
  }
  .dropdown-container {
    position: relative;
    .btn-choose {
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: #ffffff;
      border: none;
      font-family: 'Pretendard Variable';

      > img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
`;
