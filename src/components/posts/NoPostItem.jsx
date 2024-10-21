import React from 'react';
import styled from 'styled-components';

function NoPostItem() {
  return (
    <StyledWrapper>
      <div className="wrapper-notice">
        <p>표시할 PT가 없습니다 🥲</p>
        <a href="/" className="btn-to-go-like">
          🏃 PT 찾으러 가기 🏃
        </a>
      </div>
    </StyledWrapper>
  );
}

export default NoPostItem;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  .wrapper-notice {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 250px;
    height: 250px;

    background-color: #efefefef;
    font-family: 'Pretendard';
    border-radius: 15px;
    font-size: 20px;

    .btn-to-go-like {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 200px;
      height: 40px;
      border-radius: 15px;

      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #ffffff;
        opacity: 0.8;
      }
    }
  }
`;
