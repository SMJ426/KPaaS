'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { RefreshAccessToken } from '@compoents/util/http';
import ProfileInfo from './ProfileOptions/MainProfile';
import FollowModal from './ProfileOptions/FollowModal';
import ProfileNavigation from './ProfileOptions/ProfileNavigation';
import ProfileContent from './ProfileOptions/ProfileContent';

export default function UserProfile({
  userInfo,
  followerList,
  followingList,
  userproducts,
  accessToken,
}) {
  const [currentView, setCurrentView] = useState('likes');
  const [modalType, setModalType] = useState(null);
  const router = useRouter();

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
    }
  }, [userInfo]);

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleEditProfileClick = () => {
    router.push('/myedit');
  };

  return (
    <StyledWrapper>
      <ProfileInfo 
        userInfo={userInfo} 
        onEditClick={handleEditProfileClick}
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
