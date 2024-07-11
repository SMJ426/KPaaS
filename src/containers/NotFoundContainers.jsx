'use client';

import MiniCategoryComponents from '@compoents/components/minicategory/Minicategory';
import CategoryComponents from '@compoents/components/minicategory/CategoryComponents';
import Link from 'next/link';
import styles from './NotFoundContainers.module.css';

import { useState } from 'react';

export default function NotFoundContainer() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.id);
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryId ? null : categoryId
    );
  };
  return (
    <>
      <div className={styles.pageContainer}>
        <section className={styles.flexSection1}></section>
        <section className={styles.flexSection2}>
          <div className={styles.buttonContainer}>
            <Link href="/newpost">
              <button className={styles.button}>
                <div className={styles.Add}>상품등록</div>
              </button>
            </Link>
          </div>
          <div className={styles.cateSticky}>
            <CategoryComponents handleCategoryChange={handleCategoryChange} />
            <MiniCategoryComponents
              className={styles.cateminibtn}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <h1 className={styles.notfound}>검색 결과가 없습니다.</h1>
        </section>
      </div>
    </>
  );
}
