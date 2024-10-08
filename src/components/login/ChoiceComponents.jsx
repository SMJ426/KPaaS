'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { FaUserAlt, FaChalkboardTeacher } from 'react-icons/fa'; // 아이콘 추가

export default function ChoiceModal({ show, onClose }) {
  if (!show) return null;
  const linkMemberLogin = `/user/login`;
  const linkTeacherLogin = `/user/teacherlogin`;

  return (
    <>
      <Overlay onClick={onClose} />
      <StyledWrapper>
        <Title>PTFD 로그인</Title> {/* 제목 추가 */}
        <ButtonWrapper>
          <button className="wrapper-Member-Btn">
            <FaUserAlt className="icon" />
            <Link href={linkMemberLogin}>회원 로그인</Link>
          </button>
          <button className="wrapper-Teacher-Btn">
            <FaChalkboardTeacher className="icon" />
            <Link href={linkTeacherLogin}>강사 로그인</Link>
          </button>
          <button className="wrapper-Cancle" onClick={onClose}>
            닫기
          </button>
        </ButtonWrapper>
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
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  z-index: 10;
`;

const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f0f4ff, #d8d8d8);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 40px;
  color: #333;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  button {
    width: 220px;
    height: 60px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 30px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition:
      background-color 0.3s ease,
      transform 0.3s ease;

    a {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      background-color: #005bb5;
      transform: translateY(-3px);
    }

    &:active {
      background-color: #003a75;
    }

    .icon {
      font-size: 24px;
    }
  }

  .wrapper-Member-Btn {
    background-color: #307dff;
  }

  .wrapper-Teacher-Btn {
    background-color: #00c5ff;
  }

  .wrapper-Cancle {
    background-color: #aaaaaa;
  }

  .wrapper-Member-Btn:hover {
    background-color: #307dff;
  }

  .wrapper-Teacher-Btn:hover {
    background-color: #00c5ff;
  }

  .wrapper-Cancle:hover {
    background-color: #aaaaaa;
  }
`;
