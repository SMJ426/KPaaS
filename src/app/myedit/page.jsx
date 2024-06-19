'use server';
import MyEditComponents from "@compoents/components/profile/EditProfile";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function MyEditPage() {
    const cookieStore = cookies()
    const Authorization = cookieStore.get('Authorization');
    if (Authorization && Authorization.value) {
    return (
        <>
            <MyEditComponents accessToken={Authorization.value} />
        </>
    )
}   else {
        redirect('/user/login');
    }
}