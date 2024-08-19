import NotFoundPost from '@compoents/containers/NotFoundPost';
import SearchContainer from '@compoents/containers/SearchContainer';
import {
  fetchProductName,
  LoginfetchProductName,
} from '@compoents/util/search-util';
import { fetchUserProfile } from '@compoents/util/http';
import { cookies } from 'next/headers';

async function fetchPostData(accessToken, searchTerm) {
  try {
    if (!accessToken) {
      return await fetchProductName({ pageParam: 0, searchTerm });
    } else {
      const userData = await fetchUserProfile(accessToken);
      return await LoginfetchProductName(
        0,
        searchTerm,
        encodeURI(userData.nick_name)
      );
    }
  } catch (error) {
    console.error('Error fetching post data:', error);
    return null;
  }
}

export default async function SearchPage({ params }) {
  try {
    const cookieStore = cookies();
    const Authorization = cookieStore.get('Authorization');
    const accessToken = Authorization?.value || '';
    const searchTerm = decodeURIComponent(params.searchTerm);

    let userData = { nick_name: '', role: '' };
    if (accessToken) {
      userData = await fetchUserProfile(accessToken);
    }

    const initialPostData = await fetchPostData(accessToken, searchTerm);

    if (!initialPostData || initialPostData.content?.length === 0) {
      return <NotFoundPost />;
    }

    return (
      <SearchContainer
        initialSearchResults={initialPostData}
        accessToken={accessToken}
        nick_name={userData.nick_name}
        role={userData.role}
        searchTerm={searchTerm}
      />
    );
  } catch (error) {
    console.error('Error in SearchPage:', error);
    return <div>An error occurred. Please try again later.</div>;
  }
}
