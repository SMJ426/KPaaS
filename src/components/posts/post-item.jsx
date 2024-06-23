'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './post-item.module.css';
import { LikeProduct, DeleteLike } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import Payments from '@compoents/components/payment/payments';

export default function PostItem({ postData, posts }) {
  const router = useRouter();

  // const {
  //   product_name,
  //   price,
  //   product_id,
  //   nick_name,
  //   image_product,
  //   userProfile,
  //   state,
  //   like,
  // } = props.post;

  const { pageNumber } = posts.pageable;

  // TODO : accessToken이 없는 상태로는 우선 주석처리후 사용
  // const accessToken = accessToken;
  // const [liked, setLiked] = useState(like);

  const linkPath = `/${pageNumber}/${postData.post_id}`;
  const linkProfile = `/profile/${postData.nick_name}`;
  const liked = 'false';

  // TODO : accessToken이 없는 상태로는 우선 주석처리후 사용

  // const handleLikeClick = async () => {
  //   if (!accessToken) {
  //     router.push('/user/login');
  //   }
  //   try {
  //     if (liked) {
  //       // 이미 좋아요를 눌렀을 경우
  //       const response = await DeleteLike(accessToken, product_id);
  //       if (response.state == 'Jwt Expired') {
  //         const NewaccessToken = await RefreshAccessToken();
  //         await DeleteLike(NewaccessToken, product_id);
  //       }
  //       setLiked(false);
  //     } else {
  //       // 아직 좋아요를 누르지 않은 경우
  //       const response = await LikeProduct(accessToken, product_id);
  //       if (response.state == 'Jwt Expired') {
  //         const NewaccessToken = await RefreshAccessToken();
  //         await LikeProduct(NewaccessToken, product_id);
  //       }
  //       setLiked(true);
  //     }
  //   } catch (error) {
  //     console.error('좋아요 처리 중 오류가 발생했습니다.', error);
  //   }
  // };

  // if (state !== 1) {
  //   return null;
  // }

  return (
    <div className={styles.postItem}>
      <Link
        href={linkProfile}
        style={{ textDecoration: 'none' }}
        className={styles.profile}
      >
        <Image
          src={postData.user_profile}
          alt="프로필 이미지"
          width={49}
          height={49}
          className={styles.profileImage}
          priority
        />
        <h2 className={styles.nickName}>{postData.nick_name}</h2>
      </Link>

      <Link
        href={linkPath}
        style={{ textDecoration: 'none' }}
        className={styles.PostLinks}
      >
        <h3>{postData.post_name}</h3>
        <Image
          src={postData.image_post}
          width={240}
          height={260}
          alt="상품 이미지"
          className={styles.productImg}
          priority
        />
        <h1>가격</h1>
        <h4>{postData.price}원</h4>
      </Link>
      <div className={styles.buttons}>
        {liked ? (
          // TODO : accessToken이 없는 상태로는 우선 주석처리후 사용
          // <button className={styles.liked} onClick={handleLikeClick}>
          <button className={styles.liked}>
            좋아요{' '}
            <Image
              src={'/svgs/Favorite_blue.svg'}
              width={22}
              height={20}
              alt="like_blue"
              className={styles.likeImg}
            />
          </button>
        ) : (
          // TODO : accessToken이 없는 상태로는 우선 주석처리후 사용
          // <button className={styles.like} onClick={handleLikeClick}>
          <button className={styles.like}>
            좋아요{' '}
            <Image
              src={'/svgs/Favorite.svg'}
              width={22}
              height={20}
              alt="like"
              className={styles.likeImg}
            />
          </button>
        )}
        <Payments
          // accessToken={accessToken}
          productId={postData.post_id}
          post={posts}
          nick_name={postData.nick_name}
        />
      </div>
    </div>
  );
}
