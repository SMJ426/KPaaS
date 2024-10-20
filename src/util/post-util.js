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

export async function getPostsFile({
  pageParam = 0,
  categories = [],
  locations = [],
}) {
  const queryParams = new URLSearchParams({ page: pageParam });
  if (categories.length > 0)
    queryParams.append('category_id', categories.join(','));
  if (locations.length > 0) queryParams.append('location', locations.join(','));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/page?${queryParams}`,
    {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const data = await response.json();
  return data || { content: [], last: true };
}

export async function LogingetPostsFile(
  pageParam,
  nick_name,
  categories = [],
  locations = []
) {
  const queryParams = new URLSearchParams({ page: pageParam, nick_name });
  if (categories.length > 0)
    queryParams.append('category_id', categories.join(','));
  if (locations.length > 0) queryParams.append('location', locations.join(','));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/page?${queryParams}`,
    {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const data = await response.json();
  return data || { content: [], last: true };
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

export async function PutPostData(formData, postId, accessToken) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`,
    {
      cache: 'no-store',
      method: 'PUT',
      headers: {
        Authorization: `${accessToken}`,
      },
      body: formData,
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
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// 사용자 좋아요 목록
export async function LikeList(nick_name, pageParam = 0) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/profile/like/${nick_name}?page=${pageParam}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
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
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}
