import React, { useState } from 'react';
import styled from 'styled-components';
import Payment from './payment';
import { Likepost } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';

export default function ChoosePayModal({
  accessToken,
  postId,
  post,
  nick_name,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlebucketClick = async () => {
    try {
      let response = await Likepost(accessToken, postId);
  
      if (response.state === 'Jwt Expired') {
        const newAccessToken = await RefreshAccessToken();
        response = await Likepost(newAccessToken, postId);
      }
      setIsModalVisible(true);
    } catch (error) {
      console.error('장바구니에 담는중 오류가 발생했습니다.', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handlebucket = () => {
    window.location.href = `http://localhost:3000/bucket/${nick_name}`
  }

  return (
    <StyledDropdown>
      <div className="dropdownContent">
        <Payment
          accessToken={accessToken}
          postId={postId}
          post={post}
          nick_name={nick_name}
        >
          직접 구매
        </Payment>
        <div className="verticalLine"></div>
        <button onClick={handlebucketClick}>장바구니에 담기</button>
      </div>
      {isModalVisible && (
        <Modal>
          <div className="modalContent">
            <p>장바구니에 원하시는 PT가 담겼습니다. 이동하시겠습니까?</p>
            <button onClick={handlebucket}>장바구니로 이동</button>
            <button onClick={handleCloseModal}>상품 더보기</button>
          </div>
        </Modal>
      )}
    </StyledDropdown>
  );
}

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 140px;

  .dropdownContent {
    display: flex;
    flex-direction: column;
    padding: 8px;

    button {
      padding: 8px 12px;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f5f5f5;
      }
    }
    .verticalLine {
      border-top: 1px solid #e2e5ef;
      width: 80%;
      height: 1px;
      margin-left: 10px;
      padding: 0%;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;

  .modalContent {
    background: white;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;

    button {
      padding: 10px 20px;
      margin: 10px;
      background-color: #0070f3;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #005bb5;
      }
    }
  }
`;
