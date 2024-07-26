'use server';

import BucketForm from '@compoents/components/bucket/BucketForm';
import { fetchUserProfile } from '@compoents/util/http';
import { LikeList } from '@compoents/util/post-util';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function BucketPage() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  const userInfo = await fetchUserProfile(Authorization.value);
  if (Authorization && Authorization.value) {
    const userLikes = await LikeList(userInfo.nick_name);
    return (
      <>
        <BucketForm
          Likey={userLikes.likePosts}
          accessToken={Authorization.value}
        />
      </>
    );
  } else {
    redirect('/user/login');
  }
}
