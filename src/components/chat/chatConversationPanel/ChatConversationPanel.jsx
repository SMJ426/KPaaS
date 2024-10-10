'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import RequestMessages from './RequestMessages';
import ReceivedMessages from './ReceivedMessages';
import ChatPartnerProfile from './ChatPartnerProfile';
import ChatClassOverview from './ChatClassOverview';
import { useChatListQuery } from '../query/useChatListQuery';
import axios from 'axios';

export default function ChatConversationPanel({ userInfo, roomId }) {
  const [postData, setPostData] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [isComposing, setIsComposing] = useState(false);
  const messagesEndRef = useRef(null);

  // useChatListQuery 훅을 사용하여 초기 채팅 메시지 가져오기
  const Authorization = document.cookie
    .split('; ')
    .find((row) => row.startsWith('Authorization='))
    ?.split('=')[1];
  const decodedToken = decodeURIComponent(Authorization);

  const {
    data: chatList,
    isLoading,
    error,
  } = useChatListQuery(roomId, decodedToken);

  useEffect(() => {
    if (chatList && chatList.chats.length > 0) {
      setAllMessages(
        chatList.chats.map((msg) => ({
          content: msg.content,
          sender: msg.sender.nick_name,
          type:
            msg.sender.nick_name === userInfo.nick_name ? 'sent' : 'received',
          time: msg.sendAt,
          profile_image: msg.sender.profile_image,
        }))
      );
    }
  }, [chatList]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [allMessages]);

  // postData 부분
  useEffect(() => {
    if (!roomId) return;

    const cleanedRoomId = roomId.replace(/'/g, '');

    if (!isNaN(cleanedRoomId) && typeof Number(cleanedRoomId) === 'number') {
      const Authorization = document.cookie
        .split('; ')
        .find((row) => row.startsWith('Authorization='))
        ?.split('=')[1];

      if (Authorization) {
        const decodedToken = decodeURIComponent(Authorization);

        axios
          .get(
            `http://default-api-gateway-serv-577d1-26867287-5499a5423fed.kr.lb.naverncp.com:8761/post/detail/${roomId}`,
            {
              headers: {
                Authorization: decodedToken,
              },
            }
          )
          .then((response) => {
            setPostData(response.data.post);
          })
          .catch((error) => {
            console.error('Error fetching post', error);
          });
      }
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const socket = new SockJS(
      'http://default-chat-service-cc3a4-26867297-49b78d469f83.kr.lb.naverncp.com:50/ws'
    );
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe(`/sub/room${roomId}`, (msg) => {
          try {
            const receivedMessage = JSON.parse(msg.body);

            if (receivedMessage.sender.nick_name !== userInfo.nick_name) {
              setAllMessages((prevMessages) => [
                ...prevMessages,
                { ...receivedMessage, type: 'received' },
              ]);
            }
          } catch (error) {
            console.error('메시지 파싱 오류:', error);
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
  }, [roomId]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const messageBody = {
        sender: userInfo.nick_name,
        content: message,
        type: 'TALK', // TALK or ENTER
        roomId: roomId,
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
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      if (message.trim().length !== 0) {
        sendMessage();
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  if (isLoading || error) return null;

  return (
    <StyledWrapper>
      <div className="wrapper-messages">
        {postData && (
          <div className="wrapeer-chat-info">
            {/* 채팅 상대방 프로필 부분 */}
            <ChatPartnerProfile postData={postData} />
            {/* 간략한 수업 정보 부분 */}
            <ChatClassOverview postData={postData} />
          </div>
        )}

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
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="wrapper-input">
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
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
    margin-bottom: 135px;
    margin-top: 128px;
    overflow-y: auto;
    background-color: skyblue;

    .wrapeer-chat-info {
      position: absolute;
      top: 0;
      width: 100%;
    }

    .wrapper-messages-list {
      margin-top: 10px;
      width: 100%;
    }
  }

  .wrapper-input {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 8px;
    width: calc(100% - 16px);
    height: 115px;
    position: absolute;
    bottom: 10px;
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
