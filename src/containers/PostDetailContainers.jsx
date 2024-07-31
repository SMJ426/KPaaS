'use client';
import styled from 'styled-components';
import { useState } from 'react';
import { Likepost, DeleteLike } from '@compoents/util/post-util';
import { RefreshAccessToken } from '@compoents/util/http';
import PostDropdown from '@compoents/components/posts/Detailoptions/PostDropdown';
import Recommendations from '@compoents/components/posts/Detailoptions/RecommendComponents';
import PostDetails from '@compoents/components/posts/Detailoptions/DetailPostcomponents';


export default function PostDetailContainers({
  postId,
  postpage,
  post,
  postList,
  accessToken,
  nick_name,
}) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        // 이미 좋아요를 눌렀을 경우
        const response = await DeleteLike(accessToken, postId);
        if (response.state == 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await DeleteLike(NewaccessToken, postId);
        }
        setLiked(false);
      } else {
        // 아직 좋아요를 누르지 않은 경우
        const response = await Likepost(accessToken, postId);
        if (response.state == 'Jwt Expired') {
          const NewaccessToken = await RefreshAccessToken();
          await Likepost(NewaccessToken, postData.post_id);
        }
        setLiked(true);
      }
    } catch (error) {
      console.error('좋아요 요청을 보내는 중 오류가 발생했습니다.', error);
    }
  };

  const categoryMap = {
    3001: '가정방문',
    3002: '수영장',
    3003: '헬스장',
  };

  const formattedPrice = post.price.toLocaleString('ko-KR');

  const linkProfile = `/profile/${post.nickName}`;
  const likedBtnSrc = liked
    ? '/images/png/icon-heart-fill.png'
    : '/images/png/icon-heart.png';

  return (
    <StyledWrapper>
      <div className="container">
        {nick_name === post.nickName && (
          <PostDropdown
            postpage={postpage}
            postId={postId}
            accessToken={accessToken}
          />
        )}
        <PostDetails
          post={post}
          categoryMap={categoryMap}
          formattedPrice={formattedPrice}
          accessToken={accessToken}
          postId={postId}
          likedBtnSrc={likedBtnSrc}
          handleLikeClick={handleLikeClick}
        />
        <Recommendations
          postList={postList}
          accessToken={accessToken}
          postpage={postpage}
          likedBtnSrc={likedBtnSrc}
          handleLikeClick={handleLikeClick}
        />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    margin-top: 60px;
  }

  .mainContent {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  .productImage {
  }

  .productDetails {
    width: 45%;
    margin-left: 50px;
  }

  .productName {
    font-size: 29px;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 15px;
  }

  .productPrice {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .productInfo {
    list-style-type: none;
    padding: 0;
  }

  .productInfo li {
    margin-bottom: 10px;
    color: #737a8d;
  }

  .buttons {
    display: flex;
    margin-top: 30px;
    justify-content: end;
  }

  .buyButton {
    padding: 10px 25px;
    background-color: #496af3;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }

  .btnlike {
    background-color: #ffffff;
    border: none;
    margin-left: 20px;
  }
  .likeimg {
    width: 20px;
    height: 20px;
  }

  .nickNames {
    color: var(--gray-800, #737a8d);
    font-family: 'Pretendard Variable';
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .prdName {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: var(--black, #191a1c);
    text-overflow: ellipsis;
    font-family: 'Pretendard Variable';
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    margin-top: 35px;
  }

  .verticalLine {
    border-top: 1px solid #e2e5ef;
    background: #f4f5f9;
    width: 100%;
    height: 1px;
    margin-top: 50px;
    padding: 0px 10px;
  }

  .price {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: var(--primary-primary, #496af3);
    text-overflow: ellipsis;
    font-family: 'Pretendard Variable';
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    margin-top: 30px;
  }

  
`;