'use server';

import BucketForm from '@compoents/components/bucket/BucketForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LikeList } from '@compoents/util/post-util';

export default async function BucketPage({ params }) {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  if (Authorization && Authorization.value) {
    const userLikes = await LikeList(params.nick_name);
    console.log(userLikes);
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
