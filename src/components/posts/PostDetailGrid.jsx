import styled from 'styled-components';
import PostItem from './post-item';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';
import NoPostItem from './NoPostItem';

export default function PostDetailGrid({ postData, accessToken }) {
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
  width: 100%;
  overflow-x: hidden;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 24px;

  @media (max-width: 2000px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1630px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1340px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1010px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
