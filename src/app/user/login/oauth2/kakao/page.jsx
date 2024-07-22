'use client';
import React, { useEffect } from 'react';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';
import styles from './page.module.css';

export default function KakaoLogin() {
  useEffect(() => {
    const kakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        //  const response = await fetch(`http://KPaas-apigateway-service-1:8888/oauth2/kakao?code=${code}`, {
        const response = await fetch(
          `http://default-api-gateway-05ed6-25524816-d29a0f7fe317.kr.lb.naverncp.com:8761/oauth2/kakao?code=${code}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          }
        );
        if (!response.ok) {
          throw new Error('로그인 실패');
        }
        const data = await response.json();
        console.log(data);

        const { accessToken, refreshToken } = data;
        document.cookie = `Authorization=Bearer ${accessToken}; path=/`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
        const redirectUrl = 'http://localhost:3000';
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
