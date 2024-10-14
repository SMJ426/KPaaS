'use client';
import React, { useEffect } from 'react';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';
import styles from './page.module.css';

export default function KakaoLogin() {
  useEffect(() => {
    const kakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/oauth2/kakao?code=${code}&role=ROLE_TEACHER`,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          }
        );
        if (response.status === 500) {
          alert('이미 같은 회원 정보로 가입한 SNS 계정이 있습니다.');
          window.location.href = '/'; 
          return;
        }
        if (!response.ok) {
          throw new Error('로그인 실패');
        }
        const data = await response.json();

        const { accessToken, refreshToken } = data;
        document.cookie = `Authorization=Bearer ${accessToken}; path=/`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
        const redirectUrl =
          'http://default-front-07385-26867304-b1e33c76cd35.kr.lb.naverncp.com:30';
        window.location.href = redirectUrl;
        return;
      }
    };
    kakaoLogin();
  }, []);

  return (
    <div>
      <div className={styles.mid}>
        <LoadingIndicator />
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
