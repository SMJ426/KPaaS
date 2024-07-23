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
    margin-left: -50px;
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

  .profileBtn,
  .profileBtned {
    position: absolute;
    margin-left: 350px;
    margin-top: -70px;
    width: 113px;
    height: 50px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    border: 0;
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