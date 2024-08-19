'use server';

import BucketForm from '@compoents/components/bucket/BucketForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LikeList } from '@compoents/util/post-util';

export default async function BucketPage({ params }) {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  if (Authorization && Authorization.value) {
    const initialUserLikes = await LikeList(params.nick_name, 0); // 첫 번째 페이지만 가져옵니다
    console.log(initialUserLikes);
    return (
      <>
        <BucketForm
          initialLikes={initialUserLikes}
          nick_name={params.nick_name}
          accessToken={Authorization.value}
        />
      </>
    );
  } else {
    redirect('/user/login');
  }
}