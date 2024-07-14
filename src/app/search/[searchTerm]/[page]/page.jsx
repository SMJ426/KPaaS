import SearchContainer from '@compoents/containers/SearchContainer';
import { fetchProductNamePaging } from '@compoents/util/search-util';

export default async function SearchFormPageForm({ params }) {
  const searchTerm = await fetchProductNamePaging(
    decodeURIComponent(params.searchTerm),
    params.page
  );

  const [searchTerms] = await Promise.all([searchTerm]);
  return (
    <>
      <SearchContainer searchTerm={searchTerms} postpage={params.page} />
    </>
  );
}
