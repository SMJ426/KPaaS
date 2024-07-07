'use server';
import MyEditComponents from "@compoents/components/profile/EditProfile";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

import { fetchUserProfile } from '@compoents/util/http';

export default async function MyEditPage() {
    const cookieStore = cookies()
    const Authorization = cookieStore.get('Authorization');
    const userInfo = await fetchUserProfile(Authorization.value);
    if (Authorization && Authorization.value) {
    return (
        <>
            <MyEditComponents 
            userInfo={userInfo}
            accessToken={Authorization.value} 
            />
        </>
    )
}   else {
        redirect('/user/login');
    }
}