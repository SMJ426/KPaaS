'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { followUser } from '@compoents/util/http';
import { RefreshAccessToken } from '@compoents/util/http';

import OtherProfileInfo from './ProfileOptions/OtherMainProfile';
import FollowModal from './ProfileOptions/FollowModal';
import ProfileNavigation from './ProfileOptions/ProfileNavigation';
import ProfileContent from './ProfileOptions/ProfileContent';

export default function OtherProfileform({
  userInfo,
  accessToken,
  followerList,
  followingList,
  userproducts,
  isFollowing,
}) {
  const [currentView, setCurrentView] = useState('likes');
  const [modalType, setModalType] = useState(null);
  const [isfollow, setfollowing] = useState(isFollowing);

  useEffect(() => {
    if (userInfo.state === 'Jwt Expired') {
      const refreshAccessToken = async () => {
        try {
          const newAccessToken = await RefreshAccessToken();
        } catch (error) {
          console.error('accessToken 재발급 실패', error);
        }
      };
      refreshAccessToken();
    } else {
    }
  }, [userInfo]);

  // isfollowing false -> 팔로우 안된거
  const handleFollow = async () => {
    if (isfollow === false) {
      try {
        const response = await followUser(accessToken, userInfo.email);
        console.log('팔로우 요청이 성공했습니다.');
        setfollowing(true);
      } catch (error) {
        console.error('팔로우 요청 중 오류가 발생했습니다.', error);
      }
    } else {
      alert('이미 팔로우 하셨습니다.');
    }
  };


  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <StyledWrapper>
      <OtherProfileInfo
        userInfo={userInfo} 
        onfollowClick={handleFollow}
        isfollow={isfollow}
        onFollowingClick={() => openModal('following')}
        onFollowerClick={() => openModal('follower')}
      />
      
      {modalType === 'following' && (
        <FollowModal
          isOpen={true}
          onClose={closeModal}
          list={followingList}
        />
      )}
      
      {modalType === 'follower' && (
        <FollowModal
          isOpen={true}
          onClose={closeModal}
          list={followerList}
        />
      )}
      <ProfileNavigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        isTeacher={userInfo.role === 'ROLE_TEACHER'}
      />
      
      <div className="verticalLine"></div>
      
      <ProfileContent
        currentView={currentView}
        nick_name={userInfo.nick_name}
        accessToken={accessToken}
        userproducts={userproducts}
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  .verticalLine {
    position: absolute;
    border-top: 1px solid #e2e5ef;
    width: 60%;
    height: 1px;
    margin-top: 120px;
    margin-left: 13%;
    padding: 0%;
  }

`;
