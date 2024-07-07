'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { LikeProduct, DeleteLike } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import Payments from '@compoents/components/payment/payments';
import Chatting from '../chatting/Chatting';

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

  const formattedPrice = postData.price.toLocaleString('ko-KR');

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
    <StyledWrapper>
      <Link href={linkProfile} className="wrapper-profile-info">
        <img
          src={postData.user_profile}
          alt="프로필 이미지"
          className="img-profile"
        />
        <div className="wrapper-name">
          <p className="nickname">{postData.nick_name}</p>
          <p className="postname">{postData.post_name}</p>
        </div>
      </Link>

      <div className="wrapper-bottom">
        <Link href={linkPath} className="wrapper-img-info">
          <img
            src={postData.image_post}
            alt="상품 이미지"
            className="img-post"
          />
          <span className="post_info">{postData.post_info}</span>
        </Link>

        <div className="wrapper-btns">
          <div className="wrapper-price">
            <p>수강비</p>
            <span>{formattedPrice}원</span>
          </div>
          <div className="wrapper-info-btns">
            {liked ? (
              // TODO : accessToken이 없는 상태로는 우선 주석처리후 사용
              // <button className='liked' onClick={handleLikeClick}>
              <button className="btn-like">
                <img
                  src="images/png/icon-heart.png"
                  alt="like_blue"
                  className="likeImg"
                />
              </button>
            ) : (
              // TODO : accessToken이 없는 상태로는 우선 주석처리후 사용
              // <button className='like' onClick={handleLikeClick}>
              <button className="btn-like">
                <img
                  src="images/png/icon-heart.png"
                  alt="like"
                  className="likeImg"
                />
              </button>
            )}
            <Chatting />
            <Payments
              // accessToken={accessToken}
              productId={postData.post_id}
              post={posts}
              nick_name={postData.nick_name}
            />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 288px;
  height: 380px;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);

  .wrapper-profile-info {
    display: flex;
    gap: 12px;
    padding: 12px 12px 0 12px;

    .img-profile {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .wrapper-name {
      display: flex;
      flex-direction: column;
      justify-items: center;

      .nickname {
        font-size: 15px;
        font-weight: bold;
        font-family: 'Pretendard';
        color: #29363d;
      }
      .postname {
        font-size: 12px;
        font-weight: 500;
        font-family: 'Pretendard';
        color: #5a6a72;
      }
    }
  }

  .wrapper-bottom {
    padding: 12px 12px 0 12px;

    .wrapper-img-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .img-post {
        width: 100%;
        height: 196px;
        object-fit: cover;
      }
      span,
      p {
        font-family: 'Pretendard';
      }
      .post_info {
        color: #5a6a72;
        font-size: 12px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .wrapper-btns {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;

      .wrapper-price {
        display: flex;
        gap: 8px;
        > p {
          font-weight: bold;
          color: #29363d;
        }
        > span {
          color: #29363d;
        }

        span,
        p {
          font-family: 'Pretendard';
        }
      }

      .wrapper-info-btns {
        display: flex;
        gap: 9px;

        .btn-like {
          background-color: #ffffff;
          border: none;
          > img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
`;
