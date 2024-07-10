import styled from 'styled-components';
import PostItem from './post-item';

export default function PostsGrid({ postData, accessToken }) {
  if (!postData) {
    return null;
  }

  const postDataArr = postData.content;

  return (
    <StyledWrapper>
      {postDataArr.map((post) => (
        <PostItem
          key={post.post_id}
          postData={post}
          posts={postData}
          accessToken={accessToken}
        />
      ))}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;

  @media (max-width: 2000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1625px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
