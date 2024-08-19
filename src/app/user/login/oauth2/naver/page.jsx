'use client';
import React, { useEffect } from 'react';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';
import styles from './page.module.css';

export default function NaverLogin() {
  useEffect(() => {
    const naverLogin = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/oauth2/naver?code=${code}`,
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
        const redirectUrl = 'http://default-front-84485-25569413-20a094b6a545.kr.lb.naverncp.com:30';
        window.location.href = redirectUrl;
        return;
      }
    };
    NaverLogin();
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
