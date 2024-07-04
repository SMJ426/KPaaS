import Link from 'next/link';
import SmallProfile from '../profile/SmallProfile';
import styled from 'styled-components';

export default function MainNavigation({ accessToken }) {
  return (
    <StyledWrapper>
      <Link href="/" legacyBehavior passHref>
        <a className="logo">PT에프디</a>
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

        <Link href="#">
          <p>Recruitment</p>
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

      {accessToken && (
        <div className="navigate-bar">
          <SmallProfile accessToken={accessToken} />
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;

  background-color: #ffffff;
  height: 80px;

  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;

    color: var(--black, #191a1c);
    font-family: 'Gmarket Sans TTF';
    font-size: 38px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .wrapper-navigate-menu {
    display: flex;
    gap: 50px;
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
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
