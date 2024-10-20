import PostGrid from './PostsGrid';
import styled from 'styled-components';

export default function CommuPosts({ postData, accessToken }) {
  return (
    <StyledWrapper>
      <PostGrid postData={postData} accessToken={accessToken} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin-left: 50px;
`;
