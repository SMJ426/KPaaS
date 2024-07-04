import CommuPosts from '../posts/CommuPost';
import styles from './ProductsComponent.module.css';
import Pagination from '../pagination/Paginations';
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
    <>
      <section className={styles.section}>
        <CommuPosts posts={userproducts} accessToken={accessToken} />
      </section>
      <Pagination
        currentPage={currentPage}
        posts={userproducts}
        PAGE_GROUP_SIZE={PAGE_GROUP_SIZE}
        handlePageChange={handlePageChange}
        goToPreviousPageGroup={goToPreviousPageGroup}
        goToNextPageGroup={goToNextPageGroup}
        className={styles.pagin}
      />
    </>
  );
}
