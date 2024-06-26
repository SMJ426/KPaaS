'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './post-item.module.css';
import { LikeProduct, DeleteLike } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import Payments from '@compoents/components/payment/payments';
import { TestPostDataSet } from '../../constants/TestPostDataSet';

export default function PostItem(props) {
  const router = useRouter();
  const postData = TestPostDataSet.constent;
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

  const { pageNumber } = props.posts.pageable;
  const accessToken = props.accessToken;
  const [liked, setLiked] = useState(like);

  const linkPath = `/${pageNumber}/${product_id}`;
  const linkProfile = `/profile/${nick_name}`;

  const handleLikeClick = async () => {
    if (!accessToken) {
      router.push('/user/login');
    }
    try {
      if (liked) {
        // 이미 좋아요를 눌렀을 경우
        const response = await DeleteLike(accessToken, product_id);
        if (response.state == 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await DeleteLike(NewaccessToken, product_id);
        }
        setLiked(false);
      } else {
        // 아직 좋아요를 누르지 않은 경우
        const response = await LikeProduct(accessToken, product_id);
        if (response.state == 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await LikeProduct(NewaccessToken, product_id);
        }
        setLiked(true);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error);
    }
  };

  if (state !== 1) {
    return null;
  }

  console.log('12313 postdata : ', postData);

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
        <h2 className={styles.nickName}>{nick_name}</h2>
      </Link>

      <Link
        href={linkPath}
        style={{ textDecoration: 'none' }}
        className={styles.PostLinks}
      >
        <h3>{product_name}</h3>
        <Image
          src={image_product}
          width={240}
          height={260}
          alt="상품 이미지"
          className={styles.productImg}
          priority
        />
        <h1>가격</h1>
        <h4>{price}원</h4>
      </Link>
      <div className={styles.buttons}>
        {liked ? (
          <button className={styles.liked} onClick={handleLikeClick}>
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
          <button className={styles.like} onClick={handleLikeClick}>
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
          accessToken={accessToken}
          productId={product_id}
          post={props.post}
        />
      </div>
    </div>
  );
}
