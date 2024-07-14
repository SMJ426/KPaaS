// 상품 검색
export async function fetchProductName(searchTerm) {
  //const response = await fetch('http://KPaas-apigateway-service-1:8888/post/search', {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/search`,
    {
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

// 상품 검색
export async function fetchProductNamePaging(searchTerm, page) {
  //const response = await fetch(`http://KPaas-apigateway-service-1:8888/post/search?page=${page}`, {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/search?page=${page}`,
    {
      cache: 'no-store',
      method: 'POST',
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
