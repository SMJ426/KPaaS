'use client';
import styled from 'styled-components';
import RecommendPostItem from './RecommendPostItem';

export default function Recommendations({
  postList,
  accessToken,
  postpage,
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
              key={post.postId}
              post={post}
              postpage={postpage}
              likedBtnSrc={
                likedPosts[post.postId]
                  ? '/images/png/icon-heart-fill.png'
                  : '/images/png/icon-heart.png'
              }
              handleLikeClick={() => handleLikeClick(post.postId)}
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
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  button {
    cursor: pointer;
  }

  @media screen and (max-width: 2000px) {
    .recommendationGrid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media screen and (max-width: 1625px) {
    .recommendationGrid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 1200px) {
    .recommendationGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 900px) {
    .recommendationGrid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
