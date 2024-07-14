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
import NotFoundContainer from '@compoents/containers/NotFoundContainers';

export default async function otherProfilePage({ params }) {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');

  if (Authorization && Authorization.value) {
    const userInfo = await fetchOtherUserProfile(
      params.nick_name,
      Authorization.value
    );
    if (userInfo.message === 'No value present') {
      return <NotFoundContainer />;
    }

    const followerList = await fetchFollowUser(params.nick_name);
    const followingList = await fetchFollowingUser(params.nick_name);
    const userproducts = await getSelling(params.nick_name);
    return (
      <OtherProfileform
        userInfo={userInfo.memberDto}
        nick_name={params.nick_name}
        accessToken={Authorization.value}
        followerList={followerList}
        followingList={followingList}
        userproducts={userproducts}
        isFollowing={userInfo.follow}
      />
    );
  } else {
    redirect('/user/login');
  }
}
