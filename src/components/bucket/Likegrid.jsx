'use client';
import React, { useState, useEffect } from "react";
import styles from "./Likegrid.module.css";
import { LikeList } from "@compoents/util/post-util";
import LikeListComponent from "./LikeLists";


export default function LikegridComponent({ nick_name, accessToken }) {
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    const fetchUserLikeProducts = async () => {
      try {
        if (!accessToken) {
          throw new Error('로그인이 필요합니다.');
        }
        const data = await LikeList(nick_name);
        setUserLikes(data.likeProducts);
      } catch (error) {
        console.error('사용자의 좋아하는 상품을 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchUserLikeProducts();
  }, [accessToken, nick_name]);

  return (
    <>
      <section className={styles.section1}>
      </section>
      <section className={styles.section2}>
        <ul className={styles.postsGrid}>
          {userLikes.map((like) => (
            <LikeListComponent key={like.productId} nick_name={nick_name} like={like} accessToken={accessToken}/>
          ))}
        </ul>
      </section>
    </>
  );
};