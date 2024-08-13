'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import RequestMessages from './RequestMessages';
import ReceivedMessages from './ReceivedMessages';
import ChatPartnerProfile from './ChatPartnerProfile';
import ChatClassOverview from './ChatClassOverview';

export default function ChatConversationPanel({ userInfo }) {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS(
      'http://default-chat-service-7c2a3-25892552-1d82f05544d5.kr.lb.naverncp.com:50/ws'
    );
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe('/sub/room1', (msg) => {
          const receivedMessage = JSON.parse(msg.body);

          // 상대방에게 받은 메세지일때만 추가
          if (receivedMessage.sender.nick_name !== userInfo.nick_name) {
            setAllMessages((prevMessages) => [
              ...prevMessages,
              { ...receivedMessage, type: 'received' },
            ]);
          }
        });
      },

      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const messageBody = {
        sender: userInfo.nick_name,
        content: message,
        type: 'TALK', // TALK or ENTER
        roomId: '1',
      };

      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify(messageBody),
      });

      setAllMessages((prevMessages) => [
        ...prevMessages,
        { ...messageBody, type: 'sent' },
      ]);

      setMessage('');
    } else {
      console.error('STOMP가 연결 안됐음');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <StyledWrapper>
      <div className="wrapper-messages">
        {/* 채팅 상대방 프로필 부분 */}
        <ChatPartnerProfile />
        {/* 간략한 수업 정보 부분 */}
        <ChatClassOverview />

        {/* 실제 채팅 부분 */}
        {allMessages.map((msg, index) =>
          msg.type === 'received' ? (
            <ReceivedMessages key={index} receiveMessages={msg} />
          ) : (
            <RequestMessages
              requestMessages={msg}
              userInfo={userInfo}
              key={index}
            />
          )
        )}
      </div>
      <div className="wrapper-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={sendMessage}>메시지 보내기</button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 800px;

  border: 1px solid #eaebee;

  .wrapper-messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 135px;
  }

  .wrapper-input {
    display: flex;
    width: calc(100% - 16px);
    height: 125px;
    position: absolute;
    bottom: 0;
    background-color: #fff;

    margin: 0 16px;
    padding: 10px;
    border: 1px solid #212124;
    border-radius: 8px;

    input {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 4px;
      margin-right: 10px;

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
  }
`;
