'use server';

import MainContainers from '@compoents/containers/MainContainers';
import { cookies } from 'next/headers';
import { getPostsFile, LogingetPostsFile } from '@compoents/util/post-util';
import { fetchUserProfile } from '@compoents/util/http';

async function getAuthorizationToken() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  return Authorization ? Authorization.value || '' : '';
}

async function fetchUserData(authorizationValue) {
  if (authorizationValue !== '') {
    const accessToken = decodeURIComponent(authorizationValue);
    const profileData = await fetchUserProfile(authorizationValue);
    return {
      accessToken,
      nick_name: profileData.nick_name,
      role: profileData.role,
    };
  }
  return { accessToken: '', nick_name: '' };
}

async function fetchPostData(authorizationValue) {
  if (authorizationValue === '') {
    return await getPostsFile({ pageParam: 0 });
  } else {
    const userData = await fetchUserData(authorizationValue);
    return await LogingetPostsFile(0, encodeURI(userData.nick_name));
  }
}

export default async function Home() {
  const authorizationValue = await getAuthorizationToken();

  const initialPostData = await fetchPostData(authorizationValue);
  const userData = await fetchUserData(authorizationValue);
  return (
    <MainContainers
      initialPostData={initialPostData}
      accessToken={authorizationValue}
      nick_name={userData.nick_name}
      role={userData.role}
    />
  );
}
