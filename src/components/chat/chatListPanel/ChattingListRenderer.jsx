import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function ChattingListRenderer({ listData }) {
  const router = useRouter();

  const handleClickChatRoom = () => {
    router.push(`/chat/${decodeURIComponent(listData?.roomId)}`);
  };

  const hadleClickUserProfile = () => {
    router.push(`/profile/${listData?.nickName}`);
  };

  const handleClickUserPost = () => {
    router.push(`/${listData.roomId}`);
  };

  return (
    <StyledWrapper>
      <img
        src={listData.userProfile}
        alt={listData.nickName}
        className="profile-image"
        onClick={hadleClickUserProfile}
      />
      <div className="wrapper-text-img">
        <div className="wrapper-name-text" onClick={handleClickChatRoom}>
          {/* 유저 이름과 시간 */}
          <div className="wrapper-name">
            <p className="chatting-userName">
              {listData.post ? listData.post.nick_name : listData.nickName}
            </p>
          </div>
          {/* 최근 채팅 내역 */}
          <p className="chatting-text">{listData.lastMsg}</p>
        </div>

        {listData.post?.image_post && (
          <img
            src={listData.post.image_post}
            alt={listData.post.post_info}
            className="post-img"
            onClick={handleClickUserPost}
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
    object-fit: cover;
    object-position: center;

    cursor: pointer;
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
      object-fit: cover;
      object-position: center;
      border: 1px solid #dcdee3;

      cursor: pointer;
    }
  }
`;
