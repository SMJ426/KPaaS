'use client';
import React, { useState } from "react";
import Image from "next/image";
import styles from "./LikeLists.module.css";
import { LikeProduct, DeleteLike } from "@compoents/util/post-util";
import Payment from "../payment/payment";
import { RefreshAccessToken } from "@compoents/util/http";


export default function LikeListComponent({ like, accessToken }) {
  const [liked, setLiked] = useState(true);


  const handleLikeClick = async (productId) => {
    try {
      if (liked) {
        const response = await DeleteLike(accessToken, productId);
        if (response.state === 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await DeleteLike(NewaccessToken, productId);
        }
        setLiked(false);
      } else {
        const response = await LikeProduct(accessToken, productId);
        if (response.state === 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await LikeProduct(NewaccessToken, productId);
        }
        setLiked(true);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <>
      <div key={like.productId} className={styles.postItem}>
        <div className={styles.profile}>
          <Image src={like.userProfile} alt="프로필 이미지" width={49} height={49} className={styles.profileImage} priority />
          <h2 className={styles.nickName}>{like.nickName}</h2>
        </div>
        <div className={styles.flexes}>
          <h3>{like.productName}</h3>
          <Image src={like.imageProduct} alt="상품 사진" width={240} height={260} className={styles.productImg} />
          <h1>가격</h1>
          <h4>{like.price}원</h4>
          <div className={styles.buttons}>
          {liked ? (
          <button className={styles.liked} onClick={() => handleLikeClick(like.productId)}>
            좋아요 <Image src={'/svgs/Favorite_blue.svg'} width={22} height={20} alt='like_blue' className={styles.likeImg}/> 
          </button>
        ) : (
          <button className={styles.like} onClick={() => handleLikeClick(like.productId)}>
            좋아요 <Image src={'/svgs/Favorite.svg'} width={22} height={20} alt='like' className={styles.likeImg}/> 
          </button>
        )}
            <Payment
              accessToken={accessToken}
              productId={like.productId}
              post={like}
            />
          </div>
        </div>
      </div>
    </>
  );
};