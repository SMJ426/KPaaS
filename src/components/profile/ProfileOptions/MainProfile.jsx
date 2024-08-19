import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export default function ProfileInfo({
  userInfo,
  onEditClick,
  onFollowingClick,
  onFollowerClick,
}) {
  return (
    <StyledWrapper>
      <div className="profile-container">
        <div className="image-container">
          <Image
            src={userInfo.profile_image || '/images/kakaoImg.jpg'}
            alt="프로필 이미지"
            width={200}
            height={200}
            className="profileImg"
            priority
          />
        </div>
        <div className="info-container">
          <div className="header">
            <div className="profileNickName-container">
              <span className="profileNickName">{userInfo.nick_name}</span>
            </div>
            <div className="edit-button-container">
              <button className="EditBtn" onClick={onEditClick}>
                프로필 수정
              </button>
            </div>
          </div>
          <div className="follow-info">
            <button className="Followingbtn" onClick={onFollowingClick}>
              팔로잉 {userInfo.following}
            </button>
            <button className="Followingbtn" onClick={onFollowerClick}>
              팔로워 {userInfo.follower}
            </button>
          </div>
          <p className="profileName">{userInfo.user_name}</p>
          <p className="profileEmail">{userInfo.email}</p>
          <p className="profileMessage">{userInfo.member_info}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  .profile-container {
    display: flex;
    align-items: flex-start;
    max-width: 600px;
    width: 100%;
  }

  .image-container {
    flex-shrink: 0;
    margin-right: 30px;
  }

  .profileImg {
    border-radius: 50%;
    cursor: pointer;
  }

  .info-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .profileNickName-container {
    flex-grow: 1;
    margin-right: 15px;
  }

  .profileNickName {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--black, #191a1c);
    font-size: 28px;
    font-weight: 600;
  }

  .follow-info {
    display: flex;
    margin-bottom: 15px;
  }

  .Followingbtn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--gray-800, #000000);
    font-size: 16px;
    font-weight: 400;
    margin-right: 20px;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }

  .profileName,
  .profileEmail,
  .profileMessage {
    color: var(--gray-400, #000000);
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 5px;
  }

  .EditBtn {
    cursor: pointer;
    width: 110px;
    height: 35px;
    border-radius: 10px;
    background: var(--gray-800, #e8e9ec);
    color: var(--gray-400, #7b8196);
    font-size: 16px;
    font-weight: 600;
    border: 0;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #d0d2d9;
      color: #5a6075;
    }
  }
`;