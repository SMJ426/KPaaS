import PostsGrid from './PostsGrid';
import styled from 'styled-components';

export default function CommuPosts({ postData, accessToken, nick_name }) {
  return (
    <StyledWrapper>
      <h3 className="title-postCard">강사님</h3>
      <PostsGrid postData={postData} accessToken={accessToken} nick_name={nick_name} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin-left: 50px;
  .title-postCard {
    font-size: 30px;
    font-family: 'Pretendard';
    padding-bottom: 10px;
    font-weight: 500;
  }
`;
