'use client';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

export default function UserHeader() {
  return (
    <StyledWrapper>
      <header className="headerContainer">
        <Link href="/" legacyBehavior passHref>
        <a className="logo">
          <Image
            className="main-logo"
            src="/images/png/PTFD-main-logo.png"
            alt="피티에프디"
            width={200}
            height={65}
          />
        </a>
        </Link>
      </header>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  .headerContainer {
    display: flex;
    background-color: #ffffff;
    height: 130px;
    /* width: 1440px; */
    flex-shrink: 0;
    border: 0px;

  }
  
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

    > img {
      width: 200px;
      height: 65px;
    }
  }

  @media screen and (max-width: 786px) {
    .headerContainer {
      display: flex;
      background-color: #456AE2;
      height: 80px;
      flex-shrink: 0;
      border: 0px;
      margin-left: 0;
    }
    
    .logo {
      color: #FFFFFF;
      font-family: "Gmarket Sans TTF";
      font-size: 25px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      width: 144px;
      height: 44px;
      margin-left: 64px;
      margin-top: 23px;
      cursor: pointer;
    }
  }

`;