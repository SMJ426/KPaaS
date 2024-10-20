'use client';
import styled from 'styled-components';
import RecommendPostItem from './RecommendPostItem';

export default function Recommendations({
  postList,
  accessToken,
  likedPosts,
  handleLikeClick,
}) {
  return (
    <StyledWrapper>
      <h2 className="recommendtitle">추천 강의</h2>
      <div className="recommendationGrid">
        {postList &&
          postList.length > 0 &&
          postList.map((post) => (
            <RecommendPostItem
              key={post.post_id}
              post={post}
              likedBtnSrc={
                likedPosts[post.post_id]
                  ? '/images/png/icon-heart-fill.png'
                  : '/images/png/icon-heart.png'
              }
              handleLikeClick={() => handleLikeClick(post.post_id)}
              accessToken={accessToken}
            />
          ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  margin-top: 60px;

  .recommendtitle {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .recommendationGrid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 24px;

    @media (max-width: 1750px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 1450px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1150px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 850px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 550px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
