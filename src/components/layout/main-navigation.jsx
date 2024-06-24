import Link from 'next/link';
import FindEventSection from '../items/ItemSearch';
import SmallProfile from '../profile/SmallProfile';
import styled from 'styled-components';

export default function MainNavigation({ accessToken }) {
  return (
    <StyledWrapper>
      <Link href="/" legacyBehavior passHref>
        <a className="logo">프로젝트명</a>
      </Link>
      <div className="search-bar">
        <FindEventSection accessToken={accessToken} />
      </div>
      {!accessToken && (
        <div className="navItem5">
          <Link href="/user/login" passHref>
            <button className="navLink">회원 로그인</button>
          </Link>
        </div>
      )}
      {!accessToken && (
        <div className="navItem3">
          <Link href="/user/teacherlogin" passHref>
            <button className="navLink">강사 로그인</button>
          </Link>
        </div>
      )}
      {accessToken && (
        <div className="navItem3">
          <SmallProfile accessToken={accessToken} />
        </div>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  height: 130px;
  border: none;
  position: sticky;
  top: 0;
  z-index: 2;

  .logo {
    color: var(--black, #191a1c);
    font-family: 'Gmarket Sans TTF';
    font-size: 38px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    width: auto;
    height: 64px;
    margin-left: 10%;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .search-bar {
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 50%;
    margin-left: 0px;
  }

  .navItem3 {
    font-size: 0.5rem;
    margin-top: 0px;
    margin-left: 90%;
    position: absolute;
  }
    .navItem5 {
    font-size: 0.5rem;
    margin-top: 0px;
    margin-left: 84%;
    position: absolute;
  }

  .navLink {
    width: 111px;
    height: 48px;
    border-radius: 10px;
    border: 0;
    background: rgba(73, 106, 243, 0.8);
    margin-right: 50px;
    color: #fff;
    font-family: 'Pretendard Variable';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
  }

  @media screen and (max-width: 786px) {
    .headerContainer {
      height: 70px;
    }

    .logo {
      margin-left: 30px;
      font-size: 1rem;
    }

    .search-bar {
      align-items: center;
      justify-content: center;
      margin-left: 0;
      width: 100%;
    }

    .navItem3 {
      font-size: 0.5rem;
      margin-top: 0px;
      margin-left: 87%;
      position: absolute;
    }

    .navLink {
      width: 41px;
      height: 28px;
      border-radius: 10px;
      border: 0;
      background: rgba(73, 106, 243, 0.8);
      margin-right: 13%;
      margin-top: 0px;
      color: #fff;
      font-family: 'Pretendard Variable';
      font-size: 8px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      cursor: pointer;
    }
  }
`;
