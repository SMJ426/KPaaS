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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim().length !== 0) {
        sendMessage();
      }
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
        <div className="wrapper-messages-list">
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
      </div>
      <div className="wrapper-input">
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="메시지를 입력해주세요"
          maxLength={1000}
        />
        <div className="input-footer">
          <span className="char-count">{message.length}/1000자</span>
          <button onClick={sendMessage} disabled={message.trim().length === 0}>
            전송
          </button>
        </div>
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
    margin-bottom: 135px;

    .wrapper-messages-list {
      overflow-y: auto;
      width: 100%;
      height: 530px;
    }
  }

  .wrapper-input {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 8px;
    width: calc(100% - 16px);
    height: 125px;
    position: absolute;
    bottom: 30px;
    background-color: #fff;

    margin: 0 16px;
    padding: 16px;
    border: 1px solid #212124;
    border-radius: 8px;

    textarea {
      flex: 1;
      width: 100%;
      height: 64px;
      border: none;
      font-size: 14px;
      border-radius: 4px;
      resize: none;
      overflow-y: auto;

      &:focus {
        outline: none;
      }
    }

    .input-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;

      .char-count {
        font-size: 12px;
        color: #888;
      }

      button {
        width: 64px;
        height: 32px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;

        &:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      }
    }
  }
`;
