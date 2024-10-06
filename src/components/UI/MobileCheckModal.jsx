'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function MobileCheckModal() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    setIsMobile(isMobileDevice);
  }, []);

  if (!isMobile) return null;

  return (
    <StyledWrapper>
      {isMobile && (
        <section>
          <div className="wrapper-title">
            <h2 className="title-modal">PTFD</h2>
            <p className="subtitle-modal">모바일 접근 불가</p>
          </div>

          <img
            src="/images/svg/img-notice-megaphone-black.svg"
            alt="모바일 접근 불가 이미지"
          />

          <div className="wrapper-contents">
            <h2>모바일 접근이 제한됩니다</h2>
            <p>PC 환경에서 접속해시길 바랍니다</p>
            <p className="notice">※ 모바일 버전은 업데이트 예정입니다 ※</p>
          </div>
        </section>
      )}
    </StyledWrapper>
  );
}

export default MobileCheckModal;

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #25272b;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 350px;
    height: 450px;
    border-radius: 15px;
    font-family: 'SpoqaHanSansNeo';
    background-color: #ffffff;

    .wrapper-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;

      .title-modal {
        font-size: 20px;
        color: #999999;
      }
      .subtitle-modal {
        font-size: 30px;
        color: #333333;
        font-weight: bold;
      }
    }

    > img {
      width: 300px;
      height: 150px;
    }

    .wrapper-contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 10px;

      p,
      h2 {
        font-size: 20px;
        color: #666666;
      }

      .notice {
        font-size: 15px;
        margin-top: 10px;
      }
    }
  }
`;
