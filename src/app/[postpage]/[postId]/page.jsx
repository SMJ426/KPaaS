'use server';

import PostDetailContainers from '@compoents/containers/PostDetailContainers';
import { fetchUserProfile } from '@compoents/util/http';
import { getPostData } from '@compoents/util/post-util';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PostDetailPage({ params }) {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  const postdata = await getPostData(params.postId, Authorization.value);
  const profile = await fetchUserProfile(Authorization.value);
  if (postdata.state == '잘못된 형식의 요청') {
    redirect('/');
  }
  return (
    <>
      <PostDetailContainers
        postId={params.postId}
        postpage={params.postpage}
        post={postdata.post}
        postList={postdata.postList}
        accessToken={Authorization.value}
        nick_name={profile.nick_name}
      />
    </>
  );
}
