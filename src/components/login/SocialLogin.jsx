'use clients';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export default function SocialLogin() {
  const handleKakaoLogin = () => {
    const REST_API_KEY = 'b9759cba8e0cdd5bcdb9d601f5a10ac1';
    const REDIRECT_URI =
      'http://default-front-84485-25569413-20a094b6a545.kr.lb.naverncp.com:30/user/login/oauth2/kakao';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=talk_message,profile_nickname,profile_image,account_email`;
  };

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  return (
    <StyledWrapper>
      <button className="social-button" onClick={handleNaverLogin}>
        <img src="/images/svg/naver-logo.svg" alt="네이버로 로그인하기" />
        <p className="social-text">네이버로 로그인</p>
      </button>
      <button className="social-button" onClick={handleKakaoLogin}>
        <div className="ellipse-container">
          <img src="/images/svg/kakao-logo.svg" alt="카카오로 로그인하기" />
          <p className="social-text">카카오로 로그인</p>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
