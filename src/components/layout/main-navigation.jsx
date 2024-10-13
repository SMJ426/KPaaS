'use client';
import Link from 'next/link';
import { useState } from 'react';
import SmallProfile from '../profile/SmallProfile';
import styled from 'styled-components';
import ChoiceModal from '../login/ChoiceComponents';
import { useRouter } from 'next/navigation';

export default function MainNavigation({ accessToken }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const router = useRouter();

  const handleChatClick = (e) => {
    if (!accessToken || accessToken.trim() === '') {
      e.preventDefault();
      setShowModal(true);
    } else {
      router.push('/chat');
    }
  };
  return (
    <StyledWrapper>
      <Link href="/" legacyBehavior passHref>
        <a className="logo">
          <img
            className="main-logo"
            src="/images/png/PTFD-main-logo.png"
            alt="피티에프디"
          />
        </a>
      </Link>

      {/* 상단 바 중간 네비 게이터 */}
      <div className="wrapper-navigate-menu">
        <Link href="/about">
          <p className="navigate">PTFD란?</p>
        </Link>

        <div className="navigate-chat" onClick={handleChatClick}>
          <p>채팅하기</p>
        </div>
      </div>

      {!accessToken && (
        <div className="btn-login">
          <button className="btn-login" onClick={toggleModal}>
            로그인
          </button>
        </div>
      )}

      {accessToken && <SmallProfile accessToken={accessToken} />}
      <ChoiceModal show={showModal} onClose={toggleModal} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  top: 0;

  z-index: 10;

  background-color: #ffffff;
  width: 100vw;
  height: 80px;

  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 15px 0px;
  border-bottom: 1px solid rgb(238, 238, 238);

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    > img {
      width: 200px;
      height: 77px;
    }
  }

  .wrapper-navigate-menu {
    display: flex;
    gap: 50px;
    font-family: 'Pretendard';
    font-weight: bold;

    .navigate-chat {
      cursor: pointer;
    }
    p {
      min-width: 56px;
    }
  }

  .btn-login {
    width: 70px;
    height: 31px;
    border-radius: 20px;
    font-size: 16px;
    border: 0;

    cursor: pointer;

    background-color: #eeeeee;
    color: #2e6ff2;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
