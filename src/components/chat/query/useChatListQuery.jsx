import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchChatList = async ({ queryKey }) => {
  const [_, roomId, token] = queryKey; // queryKey에서 roomId와 token을 구조 분해 할당합니다.
  const response = await axios.get(
    `http://default-api-gateway-05ed6-25524816-d29a0f7fe317.kr.lb.naverncp.com:8761/chatroom/enter/${roomId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  return response.data;
};

export const useChatListQuery = (roomId, token) => {
  return useQuery({
    queryKey: ['chatList', roomId, token],
    queryFn: fetchChatList,
    enabled: !!roomId && !!token, // roomId와 token이 존재할 때만 쿼리 실행
  });
};