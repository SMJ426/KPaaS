import PostsGrid from './PostsGrid';
import styled from 'styled-components';

export default function CommuPosts({ postData }) {
  return (
    <StyledWrapper>
      <PostsGrid postData={postData} accessToken={postData.accessToken} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin-top: 150px;
  background-color: red;
  margin-left: 349px;
  /* width: 70%; */
`;
