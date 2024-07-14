'use server';
import EditpostForm from "@compoents/components/posts/Interaction/Edit-page";
import { getPostData } from "@compoents/util/post-util";
import { cookies } from 'next/headers';

export default async function EditPage({ params }) {
    const cookieStore = cookies();
    const Authorization = cookieStore.get('Authorization');
    const postData = getPostData(params.postId, Authorization.value);
    const [ post ] = await Promise.all([postData]);

    return (
        <EditpostForm post={post}  postId={params.postId} accessToken={Authorization.value} />
    )
}