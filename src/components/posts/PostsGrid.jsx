import styled from 'styled-components';
import PostItem from './post-item';
import LoadingIndicator from '@compoents/components/UI/LoadingIndicator';

export default function PostsGrid({ selectedCategory, postData, accessToken }) {
  if (!postData) {
    return <LoadingIndicator />;
  }

  const filteredPosts = selectedCategory.length === 0
    ? postData
    : postData.filter(post => {
        return selectedCategory.some(category => {
          if (['3001', '3002', '3003'].includes(category)) {
            return post.category_id.toString() === category;
          }
          return post.location && post.location.includes(category);
        });
      });

  if (filteredPosts.length === 0) {
    return <p>선택한 카테고리에 해당하는 게시물이 없습니다.</p>;
  }

  return (
    <StyledWrapper>
      {filteredPosts.map((post, index) => (
        <PostItem
          key={`${post.post_id}-${index}`}
          postData={post}
          posts={{ content: filteredPosts }}
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