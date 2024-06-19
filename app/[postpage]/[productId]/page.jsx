'use server';

import PostDetailContainers from '@compoents/containers/ProductDetailContainers';
import { getPostData } from '@compoents/util/post-util';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PostDetailPage({ params }) {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  const postdata = await getPostData(params.productId, Authorization.value);
  if (postdata.state == "잘못된 형식의 요청") {
    redirect('/');
  }
  return (
    <>
      <PostDetailContainers 
      productId={params.productId} 
      postpage={params.postpage}
      post={postdata.product} 
      postList={postdata} 
      accessToken={Authorization.value} 
      />
    </>
  );
}
