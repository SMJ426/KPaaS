'use server';

import { cookies } from 'next/headers';
import { fetchUserProfile } from '@compoents/util/http';
import ChatClient from '@compoents/components/chat/chatListPanel/ChatClient';

export default async function ChatPage() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  const userInfo = await fetchUserProfile(Authorization.value);

  return <ChatClient userInfo={userInfo} />;
}
