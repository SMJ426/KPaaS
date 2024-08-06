'use client';
import Link from 'next/link';
import SmallProfile from '../profile/SmallProfile';
import styled from 'styled-components';

export default function MainNavigation({ accessToken }) {
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
        <Link href="#">
          <p className="navigate">About</p>
        </Link>

        <Link href="#">
          <p>Character</p>
        </Link>

        <Link href="#">
          <p>Curriculum</p>
        </Link>

        <Link href="/chat">
          <p>채팅하기</p>
        </Link>

        <Link href="#">
          <p>Store</p>
        </Link>
      </div>

      {!accessToken && (
        <div className="btn-login">
          <Link href="/user/login" passHref>
            <button className="btn-login">로그인</button>
          </Link>
        </div>
      )}

      {accessToken && <SmallProfile accessToken={accessToken} />}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index:3;

  background-color: #ffffff;
  height: 80px;

  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;

    > img {
      width: 200px;
      height: 65px;
    }
  }

  .wrapper-navigate-menu {
    display: flex;
    gap: 50px;
    font-family: 'Pretendard';
    font-weight: bold;
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
