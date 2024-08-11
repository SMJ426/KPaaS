import React from 'react';
import styled from 'styled-components';

function ChatPartnerProfile() {
  return (
    <StyledWrapper>
      <img
        src="https://via.placeholder.com/40"
        alt="test image"
        className="profile-image"
      />
      <span className="chatPartner-nick">상대방 nick_name</span>
    </StyledWrapper>
  );
}

export default ChatPartnerProfile;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 15px;

  height: 64px;
  border-bottom: 1px solid #eaebee;

  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .chatPartner-nick {
    font-size: 16px;
  }
`;
