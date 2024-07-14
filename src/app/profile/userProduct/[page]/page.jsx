'use server';
import UserProfile from '@compoents/components/profile/Profile';
import { cookies } from 'next/headers';
import { fetchUserProfile, PagegetSelling } from '@compoents/util/http';
import { fetchFollowUser, fetchFollowingUser } from '@compoents/util/http';

export default async function Profilepagin({ params }) {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');

  const userInfo = await fetchUserProfile(Authorization.value);
  const followerList = await fetchFollowUser(userInfo.nick_name);
  const followingList = await fetchFollowingUser(userInfo.nick_name);
  if (userInfo.state == 'Jwt Expired') {
    return (
      <>
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
    const userproducts = await PagegetSelling(userInfo.nick_name, params.page);

    return (
      <>
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
