import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Payment from './payment';
import { Likepost } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import ChoiceModal from '../login/ChoiceComponents';
import { useRouter } from 'next/navigation';

export default function ChoosePayModal({ accessToken, postId, post }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const router = useRouter();

  const handlebucketClick = async () => {
    if (!accessToken || accessToken.trim() === '') {
      setShowChoiceModal(true);
      return;
    } else {
      if (post.like) {
        handlebucket();
        return;
      }

      try {
        let response = await Likepost(accessToken, postId);

        if (response.state === 'Jwt Expired') {
          const newAccessToken = await RefreshAccessToken();
          response = await Likepost(newAccessToken, postId);
        }
        setIsModalVisible(true);
      } catch (error) {
        console.error('장바구니에 담는 중 오류가 발생했습니다.', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseChoiceModal = () => {
    setShowChoiceModal(false);
  };

  const handlebucket = () => {
    window.location.href = `http://default-front-07385-26867304-b1e33c76cd35.kr.lb.naverncp.com:30/bucket`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalVisible &&
        event.target.closest('.choosePayModalContent') === null
      ) {
        setIsModalVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalVisible]);

  return (
    <StyledDropdown>
      <div className="dropdownContent">
        <Payment accessToken={accessToken} postId={postId} post={post}>
          직접 구매
        </Payment>
        <button onClick={handlebucketClick}>장바구니에 담기</button>
      </div>
      {isModalVisible && (
        <Modal>
          <div
            className="choosePayModalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <p>장바구니에 원하시는 PT가 담겼습니다.</p>
            <button className="modalBtn" onClick={handlebucket}>
              장바구니로 이동
            </button>
            <button className="modalBtn" onClick={handleCloseModal}>
              PT 더보기
            </button>
          </div>
        </Modal>
      )}
      {showChoiceModal && (
        <ChoiceModal show={showChoiceModal} onClose={handleCloseChoiceModal} />
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
  font-family: 'Spoqa Han Sans Neo';

  .dropdownContent {
    display: flex;
    flex-direction: column;
    padding: 8px;

    > button {
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

  .choosePayModalContent {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 90%;
    max-width: 400px;

    p {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
    }

    .modalBtn {
      width: 100%;
      padding: 12px 0;
      margin: 10px 0;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition:
        background-color 0.3s,
        color 0.3s;

      &:first-of-type {
        background-color: #007bff;
        color: white;

        &:hover {
          background-color: #0056b3;
        }
      }

      &:last-of-type {
        background-color: #f8f9fa;
        color: #007bff;
        border: 1px solid #007bff;

        &:hover {
          background-color: #e2e6ea;
        }
      }
    }
  }
`;
