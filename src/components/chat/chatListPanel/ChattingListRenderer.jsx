import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function ChattingListRenderer({ listData }) {
  const router = useRouter();

  console.log('router.query', router.query);
  const handleClickChatRoom = () => {
    router.push(`/chat/${listData?.roomId}`);
  };
  return (
    <StyledWrapper onClick={handleClickChatRoom}>
      <img
        src={listData.userProfile}
        alt={listData.nickName}
        className="profile-image"
      />
      <div className="wrapper-text-img">
        <div className="wrapper-name-text">
          {/* 유저 이름과 시간 */}
          <div className="wrapper-name">
            <p className="chatting-userName">{listData.post.nick_name}</p>
          </div>
          {/* 최근 채팅 내역 */}
          <p className="chatting-text">{listData.lastMsg}</p>
        </div>

        {listData.post.image_post && (
          <img
            src={listData.post.image_post}
            alt={listData.post.post_info}
            className="post-img"
          />
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.button`
  display: flex;
  align-items: center;
  border: none;
  gap: 8px;
  padding: 12px 0;
  background: none;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid #eaebee;
  cursor: pointer;

  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
  }

  .wrapper-text-img {
    display: flex;
    align-items: center;
    gap: 8px;

    .wrapper-name-text {
      display: flex;
      flex-direction: column;

      .wrapper-name {
        display: flex;
        gap: 7px;
      }
      .chatting-text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 220px;
        max-width: 220px;
      }
    }

    .post-img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
  }
`;
