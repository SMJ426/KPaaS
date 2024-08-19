'use clients';

import React from 'react';
import styled from 'styled-components';

export default function SocialLogin() {
  const handleKakaoLogin = () => {
    const KAKAO_REST_API_KEY = 'b9759cba8e0cdd5bcdb9d601f5a10ac1';
    const KAKAO_REDIRECT_URI =
      'http://default-front-84485-25569413-20a094b6a545.kr.lb.naverncp.com:30/user/login/oauth2/kakao';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=talk_message,profile_nickname,profile_image,account_email`;
  };

  const handleNaverLogin = () => {
    const NAVER_REST_API_KEY = 'rIplkSnE1AiVy4P8_7Xh';
    const NAVER_REDIRECT_URI =
      'http://default-front-84485-25569413-20a094b6a545.kr.lb.naverncp.com:30/user/login/oauth2/naver';
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&state=default1234&redirect_uri=${NAVER_REDIRECT_URI}`;
  };

  return (
    <StyledWrapper>
      <button className="btn-social naver" onClick={handleNaverLogin}>
        <img src="/images/svg/naver-logo.svg" alt="네이버로 로그인하기" />
        <p className="social-text">네이버로 로그인</p>
      </button>

      <button className="btn-social kakao" onClick={handleKakaoLogin}>
        <img src="/images/svg/kakao-logo.svg" alt="카카오로 로그인하기" />
        <p className="social-text">카카오로 로그인</p>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  .btn-social {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    padding: 9px;
    background-color: #ffffff;

    cursor: pointer;

    .social-text {
      margin: 0 auto;
      padding-right: 30px;
    }
  }

  .naver {
    border: 1px solid #00bf18;

    &:hover {
      background-color: #00bf18;
      color: #ffffff;
    }
  }
  .kakao {
    border: 1px solid #f2c94c;

    &:hover {
      background-color: #f2c94c;
      color: #ffffff;
    }
  }
`;
