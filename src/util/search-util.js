// 상품 검색
export async function fetchProductName({
  pageParam = 0,
  searchTerm,
  categories = [],
  locations = [],
}) {
  const queryParams = new URLSearchParams({ page: pageParam });
  if (categories.length > 0)
    queryParams.append('category_id', categories.join(','));
  if (locations.length > 0) queryParams.append('location', locations.join(','));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/search?${queryParams}`,
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
export async function LoginfetchProductName(
  pageParam,
  searchTerm,
  nick_name,
  categories = [],
  locations = []
) {
  const queryParams = new URLSearchParams({ page: pageParam, nick_name });
  if (categories.length > 0)
    queryParams.append('category_id', categories.join(','));
  if (locations.length > 0) queryParams.append('location', locations.join(','));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/search?${queryParams}`,
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