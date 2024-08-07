'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function ChatConversationPanel({ userInfo }) {
  // WebSocket 클라이언트 인스턴스를 저장하는 상태
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // 이 아래 부턴 저의 이해를 돕기 위해 개인적인 주석도 포함되어있습니다.
  // 물론, 기능 구현 되면 제거할 예정입니당
  useEffect(() => {
    // WebSocket 연결 설정하는 부분
    const socket = new SockJS(
      'http://default-chat-service-7c2a3-25892552-1d82f05544d5.kr.lb.naverncp.com:50/ws'
    );
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('WebSocket 연결 성공 입니다!!!!!');
        // 이건 우선은 넣어 놨는데 추후에 추가될 예정

        // 채팅방1에 메시지가 도착하면 메시지를 받아서 화면에 출력
        client.subscribe('/sub/room1', (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          console.log('구독한 메시지 수신:', receivedMessage);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        console.log('/sub/room1에 구독 성공'); // 구독 성공 로그
      },

      // error 확인을 위해 header 와 body를 각각 로깅함
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

  useEffect(() => {
    console.log('123123 Messages updated:', messages);
  }, [messages]);

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const messageBody = {
        sender: userInfo.nick_name,
        content: message,
        type: 'TALK', // TALK or ENTER
        roomId: '1',
      };
      console.log('전송중 >>', messageBody);
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify(messageBody),
      });
      setMessages((prevMessages) => [...prevMessages, messageBody]); // 메시지 목록 업데이트
      setMessage('');
    } else {
      console.error('STOMP가 연결 안됐음');
    }
  };

  console.log('789789 messages>> ', messages);
  return (
    <StyledWrapper>
      <div className="wrapper-messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
          // <p key={index}>{typeof msg === 'string' ? msg : ''}</p>
        ))}
      </div>
      <div className="wrapper-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
  height: 100vh;
  width: 70%;
  /* background-color: greenyellow; */

  .wrapper-messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
  .wrapper-input {
    display: flex;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ccc;

    position: absolute;
    bottom: 0;
    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
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
