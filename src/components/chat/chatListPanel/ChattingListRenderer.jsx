import React from 'react';
import styled from 'styled-components';

export default function ChattingListRenderer({ listData }) {
  return (
    <StyledWrapper>
      <img
        src="https://via.placeholder.com/50"
        alt="test image"
        className="profile-image"
      />
      <div className="wrapper-name-text">
        {/* 유저 이름과 시간 */}
        <div className="wrapper-name-time">
          <p className="chatting-userName">{listData.userName}</p>
          <p className="time">{listData.time}</p>
        </div>
        {/* 최근 채팅 내역 */}
        <p className="chatting-text">{listData.lastMessage}</p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .wrapper-name-text {
    display: flex;
    flex-direction: column;

    .wrapper-name-time {
      display: flex;
      gap: 7px;
    }
  }
`;
