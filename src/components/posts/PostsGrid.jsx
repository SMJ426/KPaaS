import styled from 'styled-components';
import PostItem from './post-item';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';
import NoPostItem from './NoPostItem';

export default function PostsGrid({ postData, accessToken }) {
  if (!postData) {
    return <LoadingIndicator />;
  }

  if (postData.length === 0) {
    return <NoPostItem />;
  }

  return (
    <StyledWrapper>
      {postData.map((post, index) => (
        <PostItem
          key={`${post.post_id}-${index}`}
          postData={post}
          posts={{ content: postData }}
          accessToken={accessToken}
        />
      ))}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 18px;

  @media (max-width: 3000px) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (max-width: 2700px) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (max-width: 2400px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 2100px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1800px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
