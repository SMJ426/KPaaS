'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Likepost, DeleteLike } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import Chatting from '../chatting/Chatting';
import { useDropdown } from '../payment/payDropdown';
import ChoosePayModal from '../payment/ChoosePay';

export default function LikeListComponent({ like, accessToken }) {
  const [liked, setLiked] = useState(true);

  const { showDropdown, handleOpenDropdown, dropdownRef } = useDropdown();

  const linkProfile = `/profile/${like.nickName}`;
  const formattedPrice = like.price.toLocaleString('ko-KR');
  const likedBtnSrc = liked
    ? '/images/png/icon-heart-fill.png'
    : '/images/png/icon-heart.png';
  const handleLikeClick = async (postId) => {
    try {
      if (liked) {
        const response = await DeleteLike(accessToken, postId);
        if (response.state === 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await DeleteLike(NewaccessToken, postId);
        }
        setLiked(false);
      } else {
        const response = await Likepost(accessToken, postId);
        if (response.state === 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await Likepost(NewaccessToken, postId);
        }
        setLiked(true);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <StyledWrapper>
      <Link className="wrapper-profile-info" href={linkProfile}>
        <img
          src={like.userProfile}
          alt="프로필 이미지"
          className="img-profile"
        />
        <div className="wrapper-name">
          <p className="nickname">{like.nickName}</p>
          <p className="postname">{like.postName}</p>
        </div>
      </Link>
      <div className="wrapper-bottom">
        <div className="wrapper-img-info">
          <img src={like.imagePost} alt="상품 사진" className="img-post" />
          <span className="post_info">{like.postInfo}</span>
        </div>

        <div className="wrapper-btns">
          <div className="wrapper-price">
            <p>수강비</p>
            <span>{formattedPrice}원</span>
          </div>
          {/* 좋아요 버튼 */}
          <div className="wrapper-info-btns">
            <button className="btn-like" onClick={handleLikeClick}>
              <img src={likedBtnSrc} alt="좋아요 버튼" />
            </button>
            <Chatting />
            <div className="dropdown-container" ref={dropdownRef}>
              <button onClick={handleOpenDropdown} className="btn-choose">
                <img src="/images/svg/icon-shopping-cart.svg" alt="구매하기" />
              </button>
              {showDropdown && (
                <ChoosePayModal
                  accessToken={accessToken}
                  postId={like.postId}
                  post={like.post}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 288px;
  height: 380px;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
  button {
    cursor: pointer;
  }

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
        .dropdown-container {
          position: relative;
          .btn-choose {
            display: flex;
            justify-content: center;
            align-items: center;

            background-color: #ffffff;
            border: none;
            font-family: 'Pretendard Variable';

            > img {
              width: 20px;
              height: 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;
