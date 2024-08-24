'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LikeList } from '@compoents/util/post-util';
import BucketFormWrapper from '@compoents/components/bucket/BucketFormWrapper';

export default async function BucketPage({ params }) {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');

  if (!Authorization || !Authorization.value) {
    redirect('/user/login');
  }

  const initialUserLikes = await LikeList(params.nick_name, 0);

  return (
    <BucketFormWrapper
      initialLikes={initialUserLikes}
      nick_name={params.nick_name}
      accessToken={Authorization.value}
    />
  );
}