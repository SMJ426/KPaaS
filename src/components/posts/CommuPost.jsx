import PostDetailGrid from './PostDetailGrid';
import styled from 'styled-components';

export default function CommuPosts({ postData, accessToken }) {
  return (
    <StyledWrapper>
      <PostDetailGrid postData={postData} accessToken={accessToken} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin-left: 50px;
`;
