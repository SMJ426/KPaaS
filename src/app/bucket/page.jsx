'use server';

import { fetchUserProfile } from '@compoents/util/http';
import { LikeList } from '@compoents/util/post-util';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import BucketFormWrapper from '@compoents/components/bucket/BucketFormWrapper';

export default async function BucketPage() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  const userInfo = await fetchUserProfile(Authorization.value);
  if (Authorization && Authorization.value) {
    const initialUserLikes = await LikeList(userInfo.nick_name);
    return (
      <>
        <BucketFormWrapper
          initialLikes={initialUserLikes}
          nick_name={userInfo.nick_name}
          accessToken={Authorization.value}
        />
      </>
    );
  } else {
    redirect('/user/login');
  }
}
