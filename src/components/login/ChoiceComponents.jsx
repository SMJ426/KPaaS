'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

export default function ChoiceModal({ show, onClose }) {
  if (!show) return null;

  const router = useRouter();
  const [hoverTarget, setHoverTarget] = useState(null);

  const handleClickURL = (target) => {
    const clickURL = target === 'user' ? '/user/login' : '/user/teacherlogin';
    router.push(clickURL);
  };

  const handleMouseEnter = (target) => {
    setHoverTarget(target);
  };

  const handleMouseLeave = () => {
    setHoverTarget(null);
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <StyledWrapper>
        <div className="wrapper-top-section">
          <div className="wrapper-p">
            <p>가장 쉬운 방법으로</p>
            <p>운동 콘텐츠를 즐겨보세요!</p>
          </div>

          <p className="cancel" onClick={onClose}>
            x
          </p>
        </div>

        <div className="wrapper-bottom-section">
          <div className="wrapper-login-btns">
            <button
              className="btn-user"
              onMouseEnter={() => handleMouseEnter('user')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClickURL('user')}
            >
              <img src="/svgs/user-login.svg" alt="회원 로그인" />
              <p>회원 로그인</p>
            </button>

            <button
              className="btn-teacher"
              onMouseEnter={() => handleMouseEnter('teacher')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClickURL('teacher')}
            >
              <img src="/svgs/teacher-login.svg" alt="강사 로그인" />
              <p>강사 로그인</p>
            </button>
          </div>

          {/* 회원 / 강사 전용 간단한 툴팁을 구현해봤음 */}
          {hoverTarget === 'user' && (
            <Tooltip>
              <p>장애인 운동 정책 변화 소식을 한눈에 확인하고,</p>
              <p>다양한 맞춤형 운동 콘텐츠를 즐겨보세요!</p>
            </Tooltip>
          )}
          {hoverTarget === 'teacher' && (
            <Tooltip>
              <p>자신의 운동 강의를 올리고 </p>
              <p>더 많은 사람들과 나눠보세요! </p>
            </Tooltip>
          )}

          <div className="wrapper-explanatin-txt">
            <p>
              로그인은 개인정보보호 정책 및 서비스 약관에 동의하는 것을
              의미하며,
            </p>
            <p>서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.</p>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const StyledWrapper = styled.div`
  background-color: skyblue;
  position: fixed;
  top: 50%;
  left: 50%;

  width: 480px;
  height: 370px;
  transform: translate(-50%, -50%);
  z-index: 12;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;

  font-family: 'Pretendard';

  .wrapper-top-section {
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: relative;

    height: 230px;
    width: 100%;
    background-color: rgb(27, 27, 34);

    border-radius: 20px 20px 0 0;

    .wrapper-p {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        line-height: 26px;
        color: rgb(202, 202, 204);
      }
    }

    .cancel {
      position: absolute;
      top: 15px;
      right: 20px;

      font-size: 30px;
      color: rgb(202, 202, 204);

      cursor: pointer;
    }
  }

  .wrapper-bottom-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;

    width: 100%;
    height: 140px;
    border-radius: 0 0 20px 20px;

    background-color: rgb(59, 200, 242);

    .wrapper-login-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      > button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 11px;
        width: 160px;
        height: 50px;
        border-radius: 60px;
        border: none;

        font-weight: bold;
        font-size: 16px;
        line-height: 16px;

        cursor: pointer;
      }

      .btn-user {
        background-color: #111111;
        color: #ffffff;
        > img {
          width: 26px;
        }
      }
      .btn-teacher {
        background-color: #ffffff;
        color: #111111;
        border: 1px solid #dddddd;
        > img {
          width: 30px;
          height: 30px;
        }
      }
    }

    .wrapper-explanatin-txt {
      font-size: 10px;
      text-align: center;
      line-height: 15px;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard';

  width: 300px;
  max-height: 60px;

  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  line-height: 20px;

  z-index: 100;
`;
