import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export default function OtherProfileInfo({
  userInfo,
  onfollowClick,
  isfollow,
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
            <div className="follow-button-container">
              {isfollow ? (
                <button onClick={onfollowClick} className="profileBtn">
                  팔로잉
                </button>
              ) : (
                <button onClick={onfollowClick} className="profileBtned">
                  팔로우
                </button>
              )}
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

  .profileBtn,
  .profileBtned {
    width: 100px;
    height: 36px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    border: 0;
    cursor: pointer;
  }

  .profileBtn {
    background: var(--gray-200, #f4f5f9);
    color: var(--gray-400, #bec0c6);
  }

  .profileBtned {
    background: var(--gray-200, #2945b7c7);
    color: var(--gray-400, #fff);
  }
`;