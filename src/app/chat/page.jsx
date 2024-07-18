'use client';
import styled from 'styled-components';
import ChatListPanel from '@compoents/components/chat/chatListPanel/ChatListPanel';
import ChatConversationPanel from '@compoents/components/chat/chatConversationPanel/ChatConversationPanel';

export default function ChatPage() {
  return (
    <StyledWrapper>
      <ChatListPanel />
      <ChatConversationPanel />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
`;
