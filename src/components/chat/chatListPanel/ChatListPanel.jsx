import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function ChatListPanel() {
  // WebSocket 클라이언트 인스턴스를 저장하는 상태
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // 이 아래 부턴 저의 이해를 돕기 위해 개인적인 주석도 포함되어있습니다.
  // 물론, 기능 구현 되면 제거할 예정입니당
  useEffect(() => {
    // WebSocket 연결 설정하는 부분
    const socket = new SockJS(
      'http://default-chat-service-b2f3c-25862159-fc922caa53fb.kr.lb.naverncp.com:50/ws'
    );
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('WebSocket 연결 성공 입니다!!!!!');
        // 이건 우선은 넣어 놨는데 추후에 추가될 예정
        fetchChatRooms();

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

  // 채팅 방 목록을 가져오는 API
  // 물론 이 요청은 위에 useEffect 를 보면 웹소켓 연결이 성공적으로 이뤄진후 요청됨
  const fetchChatRooms = async () => {
    // try {
    //   const response = await fetch(
    //     'http://default-api-gateway-05ed6-25524816-d29a0f7fe317.kr.lb.naverncp.com:8761/chat/rooms'
    //   );
    //   const rooms = await response.json();
    //   setChatRooms(rooms);
    // } catch (error) {
    //   console.error('Error fetching chat rooms:', error);
    // }
    console.log('ws 연결은 성공! 그리고 바로 채팅 목록도 요청합니다!!!!');
  };

  const sendMessage = () => {
    if (stompClient && stompClient.connected) {
      const messageBody = {
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

  return (
    <StyledWrapper>
      <h2 className="userName">유저 이름</h2>
      {/* {chatRooms.map((room, index) => (
        <ChattingListRenderer key={index}
          listData={room} />
      ))} */}
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{typeof msg === 'string' ? msg : ''}</p>
        ))}
      </div>
      <div>
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
  width: 30%;
  height: 100vh;
  overflow-y: auto;
  background-color: skyblue;

  .userName {
    margin-bottom: 30px;
  }
`;
