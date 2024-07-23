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
      <Image
        src={userInfo.profile_image || '/images/kakaoImg.jpg'}
        alt="이미지"
        width={200}
        height={200}
        className="profileImg"
        priority
      />
        <div className="profileNickName">
         {userInfo.nick_name}
        </div>
      <div className="Followes">
        <div>
          <button className="Followingbtn" onClick={onFollowingClick}>
            팔로잉 {userInfo.following}
          </button>
          <p className="profileName">{userInfo.user_name}</p>
          <p className="profileEmail">{userInfo.email}</p>
          <p className="profileMessage">{userInfo.member_info}</p>
        </div>
        <button className="Followingbtn" onClick={onFollowerClick}>
          팔로워 {userInfo.follower}
        </button>
        <button className="EditBtn" onClick={onEditClick}>
          프로필 수정
        </button>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  .profileImg {
    border-radius: 90%;
    cursor: pointer;
  }

  .profileNickName {
    position: absolute;
    color: var(--black, #191a1c);
    font-size: 28px;
    font-weight: 600;
    margin-left: -55px;
  }

  .Followes {
    display: flex;
    margin-top: 60px;
  }

  .Followingbtn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: var(--gray-800, #000000);
    font-size: 19px;
    font-weight: 400;
    margin-left: 50px;
    height: 35px;
    padding: 0 var(--unit-4);
    min-width: var(--unit-20);
    gap: var(--unit-2);
    transition:
      transform 0.2s,
      colors 0.2s,
      opacity 0.2s;
    &:hover {
      opacity: var(--opacity-hover);
    }
  }

  .profileName,
  .profileEmail,
  .profileMessage {
    color: var(--gray-400, #000000);
    font-size: 15px;
    font-weight: 400;
    margin-left: 50px;
  }

  .profileName {
    margin-top: 10px;
  }

  .profileEmail {
    position: absolute;
    margin-top: 0;
  }

  .profileMessage {
    margin-top: 40px;
  }


  .EditBtn {
    position: absolute;
    cursor: pointer;
    margin-left: 250px;
    margin-top: -55px;
    width: 110px;
    height: 35px;
    border-radius: 10px;
    background: var(--gray-800, #e8e9ec);
    color: var(--gray-400, #7b8196);
    font-size: 18px;
    font-weight: 600;
    border: 0;
  }
`;