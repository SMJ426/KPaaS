import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

function ChatPartnerProfile({ postData }) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/profile/${postData?.nick_name}`);
  };

  return (
    <StyledWrapper>
      <img
        src={postData?.user_profile}
        alt={postData?.nick_name}
        className="profile-image"
        onClick={handleProfileClick}
      />
      <span className="chatPartner-nick">{postData?.nick_name}</span>
    </StyledWrapper>
  );
}

export default ChatPartnerProfile;

const StyledWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 15px;
  background-color: #ffffff;

  height: 64px;
  border-bottom: 1px solid #eaebee;

  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;

    cursor: pointer;
  }
  .chatPartner-nick {
    font-size: 16px;
  }
`;
