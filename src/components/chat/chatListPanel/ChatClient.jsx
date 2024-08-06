'use client';

import styled from 'styled-components';
import ChatListPanel from '@compoents/components/chat/chatListPanel/ChatListPanel';
import ChatConversationPanel from '@compoents/components/chat/chatConversationPanel/ChatConversationPanel';

export default function ChatClient({ userInfo }) {
  return (
    <StyledWrapper>
      <ChatListPanel userInfo={userInfo} />
      <ChatConversationPanel />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
`;
