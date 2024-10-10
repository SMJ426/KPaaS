'use client';

import React from 'react';
import styled from 'styled-components';
import ChattingListRenderer from './ChattingListRenderer';
import { useRouter } from 'next/navigation';
import NoChattingRooms from './NoChattingRooms';

export default function ChatListPanel({ userInfo, chatRooms }) {
  const router = useRouter();

  const handleClickMyProfile = () => {
    router.push('/profile');
  };

  return (
    <StyledWrapper>
      {/* 현재 로그인 한 유저 프로필 정보 부분 */}
      <div className="wrapper-profile-img">
        <img
          src={userInfo.profile_image}
          alt={userInfo.nick_name}
          className="user-img"
          onClick={handleClickMyProfile}
        />
      </div>

      <div className="wrapper-chatting-rooms">
        <h2 className="userName">{userInfo.nick_name}</h2>

        <div className="divide-line" />

        {/* 채팅 목록 부분 */}
        {chatRooms ? (
          <div className="chatting-rooms">
            {chatRooms.map((room, index) => (
              <ChattingListRenderer key={index} listData={room} />
            ))}
          </div>
        ) : (
          <NoChattingRooms />
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  width: 400px;
  height: 100%;
  background-color: #ffffff;
  border-top: 1px solid #eaebee;
  border-right: 1px solid #eaebee;

  font-family: 'Pretendard';
  color: #212124;

  .wrapper-profile-img {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 60px;
    padding-bottom: 10px;

    padding-left: 1px;
    padding-top: 10px;
    background-color: #e7e8eb;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);

    .user-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;

      cursor: pointer;
    }
  }

  .wrapper-chatting-rooms {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;

    .userName {
      display: flex;
      align-items: center;
      height: 63px;
      margin-left: 30px;

      font-size: 16px;
      font-weight: bold;
    }
    .divide-line {
      height: 1px;
      background-color: #eaebee;
    }

    .chatting-rooms {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      overflow-y: auto;
    }
  }
`;
