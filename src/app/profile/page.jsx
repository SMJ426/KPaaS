// app/profile/page.jsx
'use server';
import UserProfile from '@compoents/components/profile/Profile';
import { cookies } from 'next/headers';
import { fetchUserProfile, getSelling } from '@compoents/util/http';
import { fetchFollowUser, fetchFollowingUser } from '@compoents/util/http';
import MainNavigation from '@compoents/components/layout/main-navigation';

export default async function ProfilePage() {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');

  const userInfo = await fetchUserProfile(Authorization.value);
  const followerList = await fetchFollowUser(userInfo.nick_name);
  const followingList = await fetchFollowingUser(userInfo.nick_name);
  if (userInfo.state == 'Jwt Expired') {
    return (
      <>
        <MainNavigation accessToken={Authorization?.value} />
        <UserProfile
          userInfo={userInfo}
          followerList={followerList}
          followingList={followingList}
          userproducts={[]}
          accessToken={Authorization.value}
        />
      </>
    );
  } else {
    const userproducts = await getSelling(userInfo.nick_name);

    return (
      <>
        <MainNavigation accessToken={Authorization?.value} />
        <UserProfile
          userInfo={userInfo}
          followerList={followerList}
          followingList={followingList}
          userproducts={userproducts}
          accessToken={Authorization.value}
        />
      </>
    );
  }
}
