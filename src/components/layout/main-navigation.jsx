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

  const handleAboutClick = (e) => {
    router.push('/about');
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

      <div className="wrapper-navigate-menu">
        <div className="navigate-about" onClick={handleAboutClick}>
          <p>맞춤형 트레이닝, PTFD에서 시작하세요</p>
        </div>

        <div className="navigate-chat" onClick={handleChatClick}>
          <p>채팅하기</p>
        </div>

        {!accessToken ? (
          <div className="wrapper-login">
            <button className="btn-login" onClick={toggleModal}>
              로그인
            </button>
          </div>
        ) : (
          <SmallProfile accessToken={accessToken} />
        )}
      </div>

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
    justify-content: center;
    align-items: center;
    gap: 30px;

    font-family: 'Pretendard';
    color: black;
    font-size: 16px;

    .navigate-about {
      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 280px;
      height: 42px;
      border-radius: 20px;

      cursor: pointer;

      transition: background-color 0.3s ease;

      &:hover {
        background-color: #efefef;
        opacity: 0.8;
      }
    }

    .navigate-chat {
      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 100px;
      height: 42px;
      border-radius: 20px;

      cursor: pointer;

      transition: background-color 0.3s ease;

      &:hover {
        background-color: #efefef;
        opacity: 0.8;
      }
    }
  }

  .btn-login {
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 100px;
    height: 42px;
    border-radius: 20px;
    font-size: 15px;

    border: solid 1px black;

    cursor: pointer;

    background-color: #ffffff;

    transition: background-color 0.3s ease;

    &:hover {
      background-color: #efefef;
      opacity: 0.8;
    }
  }
`;
