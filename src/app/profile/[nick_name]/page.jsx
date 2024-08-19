'use server';
import OtherProfileform from '@compoents/components/profile/OtherProfileform';
import { cookies } from 'next/headers';
import {
  fetchOtherUserProfile,
  fetchFollowUser,
  fetchFollowingUser,
  getSelling,
} from '@compoents/util/http';
import { redirect } from 'next/navigation';
import NotFoundUser from '@compoents/containers/NotFoundUser';
import MainNavigation from '@compoents/components/layout/main-navigation';

export default async function otherProfilePage({ params }) {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');

  if (Authorization && Authorization.value) {
    const userInfo = await fetchOtherUserProfile(
      params.nick_name,
      Authorization.value
    );
    if (userInfo.message === 'No value present') {
      return <NotFoundUser />;
    }

    const followerList = await fetchFollowUser(params.nick_name);
    const followingList = await fetchFollowingUser(params.nick_name);
    const initialProducts = await getSelling(params.nick_name, 0);
    return (
      <>
      <MainNavigation accessToken={Authorization?.value} />
      <OtherProfileform
        userInfo={userInfo.memberDto}
        nick_name={params.nick_name}
        accessToken={Authorization.value}
        followerList={followerList}
        followingList={followingList}
        initialProducts={initialProducts}
        isFollowing={userInfo.follow}
      />
      </>
    );
  } else {
    redirect('/user/login');
  }
}