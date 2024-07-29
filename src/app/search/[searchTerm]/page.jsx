import NotFoundContainer from '@compoents/containers/NotFoundContainers';
import SearchContainer from '@compoents/containers/SearchContainer';
import { fetchProductName } from '@compoents/util/search-util';
import { cookies } from 'next/headers';
import { fetchUserProfile } from '@compoents/util/http';

export default async function SearchPage({ params }) {
  const searchTerm = await fetchProductName(
    decodeURIComponent(params.searchTerm)
  );
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  const authorizationValue = Authorization?.value || '';

  const userData = await fetchUserProfile(authorizationValue);

  const [searchTerms] = await Promise.all([searchTerm]);
  if (searchTerm.content.length === 0) {
    return (
      <>
        <NotFoundContainer />
      </>
    );
  } else {
    return (
      <>
        <SearchContainer postData={searchTerms} accessToken={authorizationValue} nick_name={userData.nick_name}/>
      </>
    );
  }
}
