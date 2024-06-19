'use server';
import EditProductForm from "@compoents/components/posts/Interaction/Edit-page";
import { getPostData } from "@compoents/util/post-util";
import { cookies } from 'next/headers';

export default async function EditPage({ params }) {
    const cookieStore = cookies();
    const Authorization = cookieStore.get('Authorization');
    const postData = getPostData(params.productId, Authorization.value);
    const [ post ] = await Promise.all([postData]);

    return (
        <EditProductForm post={post}  productId={params.productId} accessToken={Authorization.value} />
    )
}