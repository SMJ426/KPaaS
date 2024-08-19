import CommuPosts from '../posts/CommuPost';
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductsComponent({ userproducts, accessToken }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_GROUP_SIZE = 5;

  const handlePageChange = (page) => {
    router.push(`/profile/userProduct/${page}`);
  };
  const goToPreviousPageGroup = () => {
    setCurrentPage((prev) => prev - PAGE_GROUP_SIZE);
  };
  const goToNextPageGroup = () => {
    setCurrentPage((prev) => prev + PAGE_GROUP_SIZE);
  };

  return (
    <StyledWrapper>
      <section className="section">
        <CommuPosts postData={userproducts.content} accessToken={accessToken} />
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  .section {
    height: 1800px;
  }
  .pagin {
    background-color: #ffffff;
  }

  @media screen and (max-width: 786px) {
    .section {
      margin-top: 0;
      margin-left: 0;
    }
  }
`;
