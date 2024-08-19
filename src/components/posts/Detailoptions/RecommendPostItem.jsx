'use client';
import ProfileInfo from './RecommendItems/ProfileInfo';
import PostContent from './RecommendItems/PostContent';
import ActionButtons from './RecommendItems/ActionButton';
import styled from 'styled-components';
import RecommendPrice from './RecommendItems/RecommendPrice';

export default function RecommendPostItem({
  post,
  likedBtnSrc,
  handleLikeClick,
  accessToken,
}) {
  return (
    <StyledWrapper>
      <div className="postItem">
        <ProfileInfo
          userProfile={post.user_profile}
          nickName={post.nick_name}
          postName={post.post_name}
        />
        <div className="wrapper-bottom">
          <PostContent
            postId={post.post_id}
            imagePost={post.image_post}
            postInfo={post.post_info}
          />
          <div className="wrapper-btns">
            <RecommendPrice price={post.price} />
            <ActionButtons
              likedBtnSrc={likedBtnSrc}
              handleLikeClick={handleLikeClick}
              accessToken={accessToken}
              postId={post.post_id}
              post={post}
            />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  .postItem {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 290px;
    height: 380px;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
  }

  .wrapper-bottom {
    padding: 12px 12px 0 12px;
  }

  .wrapper-btns {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
  }
`;
