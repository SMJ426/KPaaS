// 상품 검색
export async function fetchProductName({ pageParam = 0, searchTerm }) {
  //const response = await fetch('http://KPaas-apigateway-service-1:8888/post/search', {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/search?page=${pageParam}`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_name: searchTerm,
      }),
    }
  );
  if (!response.ok) {
    const error = new Error('연결 오류');
    throw error;
  }

  const search = await response.json();
  return search;
}

// Login like
export async function LoginfetchProductName(pageParam, searchTerm, nick_name) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/search?page=${pageParam}&nick_name=${nick_name}`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_name: searchTerm,
      }),
    }
  );
  if (!response.ok) {
    const error = new Error('연결 오류');
    throw error;
  }

  const search = await response.json();
  return search;
}
