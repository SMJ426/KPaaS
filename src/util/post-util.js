export async function sendpostData(formData, accessToken) {
  try {
    //const response = await fetch('http://KPaas-apigateway-service-1:8888/post', {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        Authorization: `${accessToken}`,
      },
      body: formData,
    });

    if (response.status !== 200) {
      throw new Error('상품을 게시하는데 문제가 발생했습니다.');
    } else {
      const data = await response.json();
      <h2>상품 게시 완료!</h2>;
      return data;
    }
  } catch (error) {
    throw new Error(error.message || '상품을 게시하는데 문제가 발생했습니다.');
  }
}

export async function getPostsFile() {
  // const response = await fetch('http://KPaas-apigateway-service-1:8888/post/page', {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/page`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data === null) {
    const api = [];
    return api;
  } else {
    return data;
  }
}

export async function LogingetPostsFile(accessToken, nick_name) {
  //const response = await fetch(`http://KPaas-apigateway-service-1:8888/post/page?nick_name=${nick_name}`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/page?nick_name=${nick_name}`,
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
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
}

export async function getPostsFiles(page, accessToken) {
  //const response = await fetch(`http://KPaas-apigateway-service-1:8888/post/page?page=${page}`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/page?page=${page}`,
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
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
}

export async function getPostData(postId, accessToken) {
  // const response = await fetch(`http://KPaas-apigateway-service-1:8888/post/detail/${postid}`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/detail/${postId}`,
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
}

export async function PutPostData(postId, postData, accessToken) {
  // const response = await fetch(`http://KPaas-apigateway-service-1:8888/post/${postid}`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`,
    {
      cache: 'no-store',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  return data;
}

export async function DeletePost(postid, accessToken) {
  // const response = await fetch(`http://KPaas-apigateway-service-1:8888/post/${postid}`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${postid}`,
    {
      cache: 'no-store',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('상품을 삭제하는데 문제가 발생했습니다.');
  } else {
    const data = await response.json();
    console.log('삭제 완료');
    return data;
  }
}

// like 요청

export async function Likepost(accessToken, post_id) {
  try {
    //  const response = await fetch(`http://KPaas-apigateway-service-1:8888/post/like/${post_id}`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/like/${post_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('좋아요 요청이 실패했습니다.');
    } else {
      console.log('좋아요 성공');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
    throw error;
  }
}

// 사용자 좋아요 목록
export async function LikeList(nick_name) {
  try {
    //  const response = await fetch('http://KPaas-apigateway-service-1:8888/post/like', {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/profile/like/${nick_name}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      }
    );
    if (!response.ok) {
      console.log('Error!');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('요청을 보내는 중 오류가 발생했습니다.', error);
    throw error;
  }
}

export async function DeleteLike(accessToken, postid) {
  try {
    //  const response = await fetch(`http://KPaas-apigateway-service-1:8888/post/like/${postid}`, {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/like/${postid}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      }
    );
    if (response.ok) {
      console.log('삭제 성공!');
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('요청을 보내는 중 오류가 발생했습니다.', error);
    throw error;
  }
}
