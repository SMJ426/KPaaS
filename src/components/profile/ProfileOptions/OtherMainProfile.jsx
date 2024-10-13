import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { fetchUserProfile } from '@compoents/util/http';
import ChoiceModal from '@compoents/components/login/ChoiceComponents';

export default function OtherProfileInfo({
  userInfo,
  onfollowClick,
  isfollow,
  onFollowingClick,
  onFollowerClick,
  accessToken,
}) {
  const router = useRouter();
  const params = useParams();
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const isProfileUser =
    decodeURIComponent(params.nick_name) === userProfileInfo?.nick_name;

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await fetchUserProfile(accessToken);
          setUserProfileInfo(data);
        } catch (error) {
          console.error('유저 프로필을 가져오는 중 오류 발생:', error);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  const handleChatClick = async () => {
    if (!accessToken || accessToken.trim() === '') {
      setShowChoiceModal(true);
      return;
    }

    try {
      // 채팅방 생성 요청 API
      const response = await axios.post(
        `http://default-api-gateway-serv-577d1-26867287-5499a5423fed.kr.lb.naverncp.com:8761/chatroom/make/${userInfo.nick_name}`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      
      if (response.status === 200) {
        const responseData = response.data; 
        if (responseData.startsWith("채팅방있음")) {
          const roomName = responseData.split("채팅방있음 ")[1];
          router.push(`/chat/${roomName}`);
        } else {
          router.push(`/chat/${userInfo.nick_name}`); 
        }
      }
    } catch (error) {
      alert('채팅방 생성 중 오류가 발생했습니다.');
    }
  };

  const handleCloseChoiceModal = () => {
    setShowChoiceModal(false);
  };

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
            {/* 팔로우, 메세지 버튼 */}
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
              {!isProfileUser && (
                <button onClick={handleChatClick} className="chatting-btn">
                  메세지 보내기
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
      <ChoiceModal show={showChoiceModal} onClose={handleCloseChoiceModal} />
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

    .follow-button-container {
      display: flex;
      gap: 10px;

      .chatting-btn {
        width: 120px;
        height: 36px;
        background-color: #f4f5f9;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        color: var(--gray-800, #000000);
        font-size: 16px;
        font-weight: 400;

        &:hover {
          text-decoration: underline;
        }
      }
    }
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
