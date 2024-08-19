'use server';

import { cookies } from 'next/headers';

// ${process.env.NEXT_PUBLIC_API_URL}
// ${process.env.NEXT_PUBLIC_SERVER_URL}
export async function Loginfetchs(email, password) {
  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/login`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/member/login`,
      {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      const { accessToken, refreshToken } = data.jwtDto;
      cookies().set('Authorization', `Bearer ${accessToken}`, { path: '/' });
      cookies().set('refreshToken', `${refreshToken}`, { path: '/' });
    } else if (response.status === 404) {
      throw new Error('존재하지 않는 아이디 입니다.');
    } else if (response.status === 403) {
      throw new Error('로그인 실패: 아이디 혹은 비밀번호를 다시 확인해주세요.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('로그인 요청에 실패했습니다.');
  }
}

export async function RefreshAccessToken() {
  //refreshToken
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');
  try {
    //const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/refresh`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/member/refresh`,
      {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refresh_token: refreshToken.value,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }
    const data = await response.json();
    const newAccessToken = `Bearer ${data.access_token}`;
    cookieStore.delete('Authorization');
    cookies().set('Authorization', `Bearer ${data.access_token}`, {
      path: '/',
    });
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

export async function EditProfile(formData, accessToken) {
  //  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/profile`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/profile`,
    {
      method: 'PUT',
      headers: {
        Authorization: `${accessToken}`,
      },
      body: formData,
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    console.error(response.status);
    throw new Error('API 요청에 실패했습니다.');
  }
}

// 멤버 프로필 api

export async function fetchUserProfile(accesstoken) {
  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/profile`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/member/profile`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `${accesstoken}`,
        },
      }
    );
    const data  = await response.json(); 
    return data;
  } catch (error) {
    console.error(
      '사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.',
      error
    );
    throw error;
  }
}

// 상대방 프로필 api

export async function fetchOtherUserProfile(nick_name, accessToken) {
  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/profile/other/${nick_name}`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/member/profile/other/${nick_name}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      '상대방 프로필 정보를 가져오는 중 오류가 발생했습니다.',
      error
    );
    throw error;
  }
}

// 팔로우 요청 api

export async function followUser(accessToken, email) {
  try {
    //const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/follow`, {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow`, {
      // 본문에 이메일 넣어서?
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      console.log('팔로우 성공!');
    }
  } catch (error) {
    console.error('팔로우 요청을 보내는 중 오류가 발생했습니다.', error);
    throw error;
  }
}

// followList 가져오기
export async function fetchFollowUser(nick_name) {
  try {
    //  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/follow/follower/${nick_name}`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/follow/follower/${nick_name}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data.followers;
  } catch (error) {
    console.error(
      '사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.',
      error
    );
    throw error;
  }
}
// following List
export async function fetchFollowingUser(nick_name) {
  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/follow/following/${nick_name}`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/follow/following/${nick_name}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data.followings;
  } catch (error) {
    console.error(
      '사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.',
      error
    );
    throw error;
  }
}

// mypage
export async function getSelling(nick_name) {
  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/mypage?nick_name=${nick_name}`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/mypage?nick_name=${nick_name}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('사용자 판매 물품 error', error);
    throw error;
  }
}

// mypage
export async function PagegetSelling(nick_name, page) {
  try {
    //  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/mypage?nick_name=${nick_name}&page=${page}`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/mypage?nick_name=${nick_name}&page=${page}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (data === null) {
      const api = [];
      return api;
    } else {
      return data;
    }
  } catch (error) {
    console.error('사용자 판매 물품 error', error);
    throw error;
  }
}
