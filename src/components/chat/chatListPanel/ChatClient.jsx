'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'next/navigation';
import ChatListPanel from '@compoents/components/chat/chatListPanel/ChatListPanel';
import ChatConversationPanel from '@compoents/components/chat/chatConversationPanel/ChatConversationPanel';

export default function ChatClient({ userInfo }) {
  const [chatRooms, setChatRooms] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    const Authorization = document.cookie
      .split('; ')
      .find((row) => row.startsWith('Authorization='))
      ?.split('=')[1];

    if (Authorization) {
      const decodedToken = decodeURIComponent(Authorization);

      axios
        .get(
          'http://default-api-gateway-05ed6-25524816-d29a0f7fe317.kr.lb.naverncp.com:8761/chatroom/search',
          {
            headers: {
              Authorization: decodedToken,
            },
          }
        )
        .then((response) => {
          setChatRooms(response.data);
        })
        .catch((error) => {
          console.error('Error fetching chat rooms:', error);
        });
    }
  }, []);

  return (
    <StyledWrapper>
      <ChatListPanel userInfo={userInfo} chatRooms={chatRooms} />
      <ChatConversationPanel userInfo={userInfo} roomId={roomId} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1200px;
  height: calc(100vh - 80px);
  overflow: hidden;
`;
