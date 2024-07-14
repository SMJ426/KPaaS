import NotFoundContainer from '@compoents/containers/NotFoundContainers';
import SearchContainer from '@compoents/containers/SearchContainer';
import { fetchProductName } from '@compoents/util/search-util';

export default async function SearchPage({ params }) {
  const searchTerm = await fetchProductName(
    decodeURIComponent(params.searchTerm)
  );

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
        <SearchContainer searchTerm={searchTerms} />
      </>
    );
  }
}
