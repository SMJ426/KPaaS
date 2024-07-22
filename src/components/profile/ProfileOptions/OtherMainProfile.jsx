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
      <div className="profileInfo">
        <div>
          <Image
            src={userInfo.profile_image || '/images/kakaoImg.jpg'}
            alt="이미지"
            width={200}
            height={200}
            className="profileImg"
            priority
          />
        </div>
        <div className="userInfo">
          <div className="profileNickName">{userInfo.nick_name}</div>
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
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
    .profileInfo {
    display: flex;
    justify-content: center;
  }
  .profileImg {
    border-radius: 90%;
    cursor: pointer;
  }
  .profileNickName {
    position: absolute;
    color: var(--black, #191a1c);
    font-family: 'Pretendard Variable';
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 50px;
  }

  .Followes {
    display: flex;
    margin-top: 60px;
  }

  .flex {
    display: flex;
  }

  .Followingbtn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    appearance: none;
    user-select: none;
    white-space: nowrap;
    font-weight: normal;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    padding-left: var(--unit-4);
    padding-right: var(--unit-4);
    min-width: var(--unit-20);
    height: var(--unit-10);
    font-size: var(--text-small);
    gap: var(--unit-2);
    border-radius: var(--rounded-medium);
    background-color: var(--bg-default);
    color: var(--text-default-foreground);
    z-index: 10;
    transition:
      transform 0.2s,
      colors 0.2s,
      opacity 0.2s;
    &:hover {
      opacity: var(--opacity-hover);
    }
    background-color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: var(--gray-800, #000000);
    font-family: 'Pretendard Variable';
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 50px;
    height: 35px;
  }
    .profileName {
    margin-left: 50px;
    margin-top: 10px;
    color: var(--gray-400, #000000);
    font-family: 'Pretendard Variable';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .profileEmail {
    position: absolute;
    margin-left: 50px;
    margin-top: 0px;
    color: var(--gray-400, #000000);
    font-family: 'Pretendard Variable';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .profileMessage {
    color: var(--gray-400, #000000);
    font-family: 'Pretendard Variable';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 50px;
    margin-top: 40px;
  }

  .profileBtn {
    margin-left: 0px;
    margin-top: -60px;
    width: 113px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--gray-200, #f4f5f9);
    color: var(--gray-400, #bec0c6);
    font-family: 'Pretendard Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border: 0;
  }

  .profileBtned {
    margin-left: 0px;
    margin-top: -60px;
    width: 113px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--gray-200, #2945b7c7);
    color: var(--gray-400, #fff);
    font-family: 'Pretendard Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border: 0;
  }
`;
