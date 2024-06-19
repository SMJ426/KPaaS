'use server'

import MainContainers from '@compoents/containers/MainContainers';
import { cookies } from 'next/headers';
import { LogingetPostsFile, getPostsFile } from '@compoents/util/post-util';
import { fetchUserProfile } from '@compoents/util/http';

export default async function Home() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  
  let authorizationValue = '';
  if (Authorization) {
    authorizationValue = Authorization.value || '';
  }

  if (authorizationValue === '' || !Authorization) {
    const postdata = await getPostsFile();
    return (
      <MainContainers postdata={postdata} accessToken={authorizationValue} />
    );
  } else {
    const accessToken = decodeURIComponent(authorizationValue);
    const profileData = await fetchUserProfile(accessToken);
    const postdata = await LogingetPostsFile(accessToken, profileData.nick_name);
    return (
      <MainContainers postdata={postdata} accessToken={accessToken} nick_name={profileData.nick_name} />
    );
  }
}

