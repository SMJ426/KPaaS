'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LikeList } from '@compoents/util/post-util';
import LikeListComponent from './LikeLists';

export default function LikegridComponent({ nick_name, accessToken }) {
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    const fetchUserLikeposts = async () => {
      try {
        if (!accessToken) {
          throw new Error('로그인이 필요합니다.');
        }
        const data = await LikeList(nick_name);
        setUserLikes(data.likePosts);
      } catch (error) {
        console.error(
          '사용자의 좋아하는 상품을 가져오는 중 오류가 발생했습니다.',
          error
        );
      }
    };

    fetchUserLikeposts();
  }, [accessToken, nick_name]);

  return (
    <StyledWrapper>
      <section className="section">
        <ul className="postsGrid">
          {userLikes.map((like) => (
            <LikeListComponent
              key={like.postId}
              nick_name={nick_name}
              like={like}
              accessToken={accessToken}
            />
          ))}
        </ul>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.header`
  .section {
    margin-top: 100px;
    margin-left: 150px;
    width: 100%;
    margin-bottom: 5%;
    height: 1800px;
  }

  .postsGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 24px;
  }

  @media screen and (max-width: 768px) {
    .section {
      margin-top: 0;
      margin-left: 5%;
      width: 95%;
      height: 100%;
    }

    .postsGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 1200px) {
    .postsGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 480px) {
    .postsGrid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
