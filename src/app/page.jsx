'use server';

import MainContainers from '@compoents/containers/MainContainers';
import { cookies } from 'next/headers';
import { LogingetPostsFile, getPostsFile } from '@compoents/util/post-util';
import { fetchUserProfile } from '@compoents/util/http';
import { TestPostDataSet } from '../constants/TestPostDataSet';

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
    const profileData = await fetchUserProfile(accessToken);
    return await LogingetPostsFile(accessToken, profileData.nick_name);
  }
}

async function fetchUserData(authorizationValue) {
  if (authorizationValue !== '') {
    const accessToken = decodeURIComponent(authorizationValue);
    const profileData = await fetchUserProfile(accessToken);
    return { accessToken, nick_name: profileData.nick_name };
  }
  return { accessToken: '', nick_name: '' };
}

export default async function Home() {
  const authorizationValue = await getAuthorizationToken();

  // Test용 데이터 사용
  const postData = TestPostDataSet;
  // const postdata = await fetchPostData(authorizationValue);

  const userData = await fetchUserData(authorizationValue);

  return (
    <MainContainers
      postData={postData}
      accessToken={userData.accessToken}
      nick_name={userData.nick_name}
    />
  );
}

// 임시로 빈 데이터를 사용해서 UI를 확인할 수 있도록 합니다.
// const postdata = [];
// const accessToken = '';
// const nick_name = '';

//   return (
//     <MainContainers
//       postdata={postdata}
//       accessToken={accessToken}
//       nick_name={nick_name}
//     />
//   );
// }
