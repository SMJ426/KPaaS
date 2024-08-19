// 로그인 fetch

export async function Loginfetch(email, password) {
  try {
    // const response = await fetch("http://KPaas-apigateway-service-1:8888/member/login", {
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
      const { accessToken } = data.jwtDto;
      localStorage.setItem('Authorization', `Bearer ${accessToken}`);
    } else if (response.status === 403) {
      throw new Error('로그인 실패: 아이디 혹은 비밀번호를 다시 확인해주세요.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('로그인 요청에 실패했습니다.');
  }
}

export async function Logout(accessToken) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/logout`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function KakaoLogout() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/kakao/logout`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}

// 회원가입 fetch
export async function signup(formData) {
  // const response = await fetch("http://KPaas-apigateway-service-1:8888/member/signup", {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/member/signup`,
    {
      method: 'POST',
      body: formData,
    }
  );
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    console.error(response.status);
    throw new Error('API 요청에 실패했습니다.');
  }
}

// 닉네임 중복 체크
export async function checkNickname(nickname) {
  // const response = await fetch(`http://KPaas-member-service-1:8888/nick_name?nick_name=${nickname}`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/nick_name?nick_name=${nickname}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data;
}

// 이메일 중복 체크
export async function checkEmail(email) {
  // const response = await fetch(`http://KPaas-member-service-1:8888/nick_name?nick_name=${nickname}`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/email?email=${email}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function fetchUserProfile(accessToken) {
  try {
    // const response = await fetch("http://KPaas-apigateway-service-1:8888/member/profile", {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/member/profile`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      '사용자 프로필 정보를 가져오는 중 오류가 발생했습니다.',
      error
    );
    throw error;
  }
}

export async function fetchUserEmail(nick_name) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/member/email?nick_name=${nick_name}`,
      {
        cache: 'no-store',
      }
    );
    const data = await response.json();
    console.log(data);
    return data.email;
  } catch (error) {
    console.error(
      '사용자 이메일 정보를 가져오는 중 오류가 발생했습니다.',
      error
    );
    throw error;
  }
}
