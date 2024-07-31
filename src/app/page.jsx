'use server';

import MainContainers from '@compoents/containers/MainContainers';
import { cookies } from 'next/headers';
import { getPostsFile } from '@compoents/util/post-util';
import { fetchUserProfile } from '@compoents/util/http';

async function getAuthorizationToken() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  return Authorization ? Authorization.value || '' : '';
}

async function fetchPostData(authorizationValue) {
  if (authorizationValue === '') {
    return await getPostsFile();
  } else {
    const accessToken = decodeURIComponent(authorizationValue);

    return await getPostsFile(accessToken);
  }
}

async function fetchUserData(authorizationValue) {
  if (authorizationValue !== '') {
    const accessToken = decodeURIComponent(authorizationValue);
    const profileData = await fetchUserProfile(accessToken);
    return {
      accessToken,
      nick_name: profileData.nick_name,
      role: profileData.role,
    };
  }
  return { accessToken: '', nick_name: '' };
}

export default async function Home() {
  const authorizationValue = await getAuthorizationToken();

  // Test용 데이터 사용
  //const postData = TestPostDataSet;
  const postdata = await fetchPostData(authorizationValue);
  const userData = await fetchUserData(authorizationValue);

  return (
    <MainContainers
      postData={postdata}
      accessToken={authorizationValue}
      nick_name={userData.nick_name}
      role={userData.role}
    />
  );
}
