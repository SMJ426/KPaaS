import styled from 'styled-components';
import PostItem from './post-item';

export default function PostsGrid({ postData, accessToken }) {
  // const { posts, selectedCategory, accessToken } = props;

  if (!postData) {
    return null;
  }

  // let filteredPosts = [];
  // if (selectedCategory && selectedCategory.length > 0) {
  //   filteredPosts = posts.content.filter((post) =>
  //     selectedCategory.includes(post.category_id)
  //   );
  // } else {
  //   filteredPosts = posts.content;
  // }

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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px;
`;
